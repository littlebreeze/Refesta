package com.a601.refesta.artist.service;

import com.a601.refesta.artist.data.ArtistInfoRes;
import com.a601.refesta.artist.domain.Artist;
import com.a601.refesta.artist.repository.ArtistRepository;
import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.member.domain.join.ArtistLike;
import com.a601.refesta.member.repository.ArtistLikeRepository;
import com.a601.refesta.member.service.MemberService;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.a601.refesta.artist.domain.QArtist.artist;
import static com.a601.refesta.artist.domain.join.QArtistGenre.artistGenre;
import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.festival.domain.join.QFestivalLineup.festivalLineup;
import static com.a601.refesta.genre.domain.QGenre.genre;
import static com.a601.refesta.member.domain.join.QArtistLike.artistLike;

@Service
@RequiredArgsConstructor
public class ArtistService {

    private final MemberService memberService;

    private final ArtistRepository artistRepository;
    private final ArtistLikeRepository artistLikeRepository;

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 아티스트 정보 조회
     *
     * @param artistId
     * @return ArtistInfoRes - 이름, 사진, 좋아요 여부, 장르, 참가 페스티벌(아이디, 이름, 포스터)
     */
    public ArtistInfoRes getArtistInfo(int artistId) {
        //이름, 사진, 좋아요 여부
        ArtistInfoRes artistInfo = jpaQueryFactory
                .select(Projections.constructor(ArtistInfoRes.class,
                        artist.name, artist.pictureUrl, artistLike.isLiked))
                .from(artist)
                .leftJoin(artistLike).on(artist.id.eq(artistLike.artist.id))
                .where(artist.id.eq(artistId))
                .fetchOne();

        //장르 리스트(0~3개)
        List<String> genreList = jpaQueryFactory
                .select(genre.name)
                .from(artistGenre)
                .innerJoin(genre).on(artistGenre.genre.id.eq(genre.id))
                .where(artistGenre.artist.id.eq(artistId))
                .fetch();

        //참가 페스티벌 리스트
        List<ArtistInfoRes.Performance> performanceList = jpaQueryFactory
                .select(Projections.constructor(ArtistInfoRes.Performance.class,
                        festival.id, festival.name, festival.posterUrl))
                .from(festivalLineup)
                .innerJoin(festival).on(festivalLineup.festival.id.eq(festival.id))
                .where(festivalLineup.artist.id.eq(artistId))
                .orderBy(festival.id.desc())
                .fetch();

        artistInfo.setGenreAndPerformance(genreList, performanceList);
        return artistInfo;
    }

    /**
     * 아티스트 좋아요 업데이트
     *
     * @param memberId     - 구글 식별 ID
     * @param artistIdList
     */
    public void updateArtistLike(String memberId, List<Integer> artistIdList) {
        for (int artistId : artistIdList) {
            Optional<ArtistLike> optFindLike = artistLikeRepository.findByMember_GoogleIdAndArtist_Id(memberId, artistId);

            //DB에 없으면 추가
            if (optFindLike.isEmpty()) {
                artistLikeRepository.save(ArtistLike.builder()
                        .member(memberService.getMember(memberId))
                        .artist(getArtist(artistId))
                        .isLiked(true)
                        .build()
                );

                continue;
            }

            //DB에 있으면 좋아요 상태 업데이트 후 저장
            ArtistLike findLike = optFindLike.get();
            findLike.updateStatus();

            artistLikeRepository.save(findLike);
        }
    }

    public Artist getArtist(int artistId) {
        return artistRepository.findById(artistId)
                .orElseThrow(() -> new CustomException(ErrorCode.ARTIST_NOT_FOUND_ERROR));
    }
}
