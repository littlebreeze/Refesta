package com.a601.refesta.festival.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalDetailRes;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.data.FestivalReviewRes;
import com.a601.refesta.festival.data.FestivalSetlistRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.member.domain.join.FestivalLike;
import com.a601.refesta.member.repository.FestivalLikeRepository;
import com.a601.refesta.member.service.MemberService;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.a601.refesta.artist.domain.QArtist.artist;
import static com.a601.refesta.artist.domain.join.QArtistSong.artistSong;
import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.festival.domain.join.QFestivalLineup.festivalLineup;
import static com.a601.refesta.festival.domain.join.QFestivalSetlist.festivalSetlist;
import static com.a601.refesta.member.domain.QMember.member;
import static com.a601.refesta.member.domain.join.QFestivalLike.festivalLike;
import static com.a601.refesta.review.domain.QReview.review;
import static com.a601.refesta.song.domain.QSong.song;

@Service
@RequiredArgsConstructor
public class FestivalService {

    private final MemberService memberService;

    private final FestivalRepository festivalRepository;
    private final FestivalDetailRepository festivalDetailRepository;
    private final FestivalLikeRepository festivalLikeRepository;

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 페스티벌(공통) 정보 조회
     *
     * @param festivalId
     * @return FestivalInfoRes - 이름, 날짜, 장소, 포스터 URL, 가격
     */
    public FestivalInfoRes getFestivalInfo(int festivalId) {
        //기본 정보 저장
        return jpaQueryFactory
                .select(Projections.constructor(FestivalInfoRes.class,
                        festival.name, festival.date, festival.location, festival.posterUrl, festival.price, festival.isEnded,
                        festivalLike.isLiked))
                .from(festival)
                .leftJoin(festivalLike)
                .on(festival.id.eq(festivalLike.festival.id))
                .where(festival.id.eq(festivalId))
                .fetchOne();
    }

    /**
     * 페스티벌(공통) 좋아요 업데이트
     *
     * @param memberId       - 구글 식별 ID
     * @param festivalIdList
     */
    public void updateFestivalLike(String memberId, List<Integer> festivalIdList) {
        for (int festivalId : festivalIdList) {
            Optional<FestivalLike> optFindLike = festivalLikeRepository
                    .findByMember_GoogleIdAndFestival_Id(memberId, festivalId);

            //DB에 없으면 추가
            if (optFindLike.isEmpty()) {
                festivalLikeRepository.save(FestivalLike.builder()
                        .member(memberService.getMember(memberId))
                        .festival(getFestival(festivalId))
                        .isLiked(true)
                        .build()
                );

                continue;
            }

            //DB에 있으면 좋아요 상태 업데이트 후 저장
            FestivalLike findLike = optFindLike.get();
            findLike.updateStatus();

            festivalLikeRepository.save(findLike);
        }
    }

    /**
     * 페스티벌(예정) 상세 정보 조회
     *
     * @param festivalId
     * @return FestivalDetailRes - 상세 정보 URL
     */
    public FestivalDetailRes getFestivalDetail(int festivalId) {
        checkIsScheduled(festivalId);

        FestivalDetail findDetail = festivalDetailRepository.findByFestival_Id(festivalId)
                .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_DETAIL_NOT_FOUND_ERROR));

        return FestivalDetailRes.builder()
                .infoImgUrl(findDetail.getInfoImgUrl())
                .build();
    }

    /**
     * 페스티벌(종료) 후기 조회
     *
     * @param festivalId
     * @return List<FestivalReviewRes> - 작성자 닉네임, 작성자 프로필, 첨부파일 Url, 미디어타입, 내용
     */
    public List<FestivalReviewRes> getFestivalReview(int festivalId) {
        checkIsEnded(festivalId);

        List<FestivalReviewRes> festivalReview = jpaQueryFactory
                .select(Projections.constructor(FestivalReviewRes.class, member.nickname, member.profileUrl,
                        review.attachmentUrl, review.mediaType, review.contents))
                .from(review)
                .innerJoin(member)
                .on(review.member.id.eq(member.id))
                .where(review.festival.id.eq(festivalId))
                .orderBy(review.id.desc())
                .fetch();

        return festivalReview;
    }

    /**
     * 페스티벌(종료) 셋리스트 조회
     *
     * @param festivalId
     * @return FestivalSetlistRes - 아티스트(아이디, 이름, 사진 Url) 리스트, 노래(제목, 사진 Url, 음원 Url, 가수 이름) 리스트
     */
    public FestivalSetlistRes getFestivalSetlist(int festivalId) {
        checkIsEnded(festivalId);

        List<FestivalSetlistRes.ArtistInfo> artistInfoList = jpaQueryFactory
                .select(Projections.constructor(FestivalSetlistRes.ArtistInfo.class,
                        artist.id, artist.pictureUrl, artist.name))
                .from(festivalLineup)
                .innerJoin(artist)
                .on(festivalLineup.artist.id.eq(artist.id))
                .where(festivalLineup.festival.id.eq(festivalId))
                .fetch();

        List<FestivalSetlistRes.SongInfo> songInfoList = jpaQueryFactory
                .select(Projections.constructor(FestivalSetlistRes.SongInfo.class,
                        song.title, song.audioUrl, song.imageUrl, artist.name))
                .from(festivalSetlist)
                .innerJoin(festivalLineup)
                .on(festivalSetlist.festival.id.eq(festivalLineup.festival.id))
                .innerJoin(artistSong)
                .on(festivalLineup.artist.id.eq(artistSong.artist.id))
                .innerJoin(song)
                .on(artistSong.song.id.eq(song.id))
                .innerJoin(artist)
                .on(artistSong.artist.id.eq(artist.id))
                .where(festivalSetlist.festival.id.eq(festivalId))
                .orderBy(festivalSetlist.id.asc())
                .fetch();

        return FestivalSetlistRes.builder()
                .artistInfoList(artistInfoList)
                .songInfoList(songInfoList)
                .build();
    }


    public void checkIsEnded(int festivalId) {
        Festival findFestival = getFestival(festivalId);
        if (!findFestival.isEnded()) {
            throw new CustomException(ErrorCode.FESTIVAL_IS_NOT_ENDED_ERROR);
        }
    }

    public void checkIsScheduled(int festivalId) {
        Festival findFestival = getFestival(festivalId);
        if (findFestival.isEnded()) {
            throw new CustomException(ErrorCode.FESTIVAL_ALREADY_ENDED_ERROR);
        }
    }

    public Festival getFestival(int festivalId) {
        return festivalRepository.findById(festivalId)
                .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_NOT_FOUND_ERROR));
    }
}
