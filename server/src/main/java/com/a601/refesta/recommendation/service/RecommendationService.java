package com.a601.refesta.recommendation.service;

import com.a601.refesta.artist.domain.Artist;
import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.recommendation.data.ArtistRecommendationRes;
import com.a601.refesta.recommendation.data.FestivalRecommendationRes;
import com.a601.refesta.recommendation.domain.MemberArtist;
import com.a601.refesta.recommendation.domain.MemberFestival;
import com.a601.refesta.recommendation.repository.MemberArtistRepository;
import com.a601.refesta.recommendation.repository.MemberFestivalRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import static com.a601.refesta.artist.domain.QArtist.artist;
import static com.a601.refesta.festival.domain.join.QFestivalLineup.festivalLineup;
import static com.a601.refesta.recommendation.domain.QMemberArtist.memberArtist;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final MemberFestivalRepository memberFestivalRepository;
    private final MemberArtistRepository memberArtistRepository;

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 사용자 추천 페스티벌, 셋리스트 조회
     *
     * @param memberId
     * @return RecommendedFestivalRes - 예정 페스티벌 리스트(아이디, 이름, 날짜, 포스터 Url), 종료 페스티벌 리스트(+ 라인업)
     */
    public FestivalRecommendationRes getFestivalRecommendation(int memberId) {
        List<MemberFestival> findRecommendation = memberFestivalRepository.findAllByMember_Id(memberId);
        if (findRecommendation.isEmpty()) {
            throw new CustomException(ErrorCode.RECOMMENDATION_NOT_READY_ERROR);
        }

        List<FestivalRecommendationRes.ScheduledFestival> scheduledFestivalList = new ArrayList<>();
        List<FestivalRecommendationRes.EndedFestival> endedFestivalList = new ArrayList<>();
        for (MemberFestival memberFestival : findRecommendation) {
            Festival findFestival = memberFestival.getFestival();

            //예정 페스티벌 저장(8개)
            if (!findFestival.isEnded() && scheduledFestivalList.size() < 8) {
                scheduledFestivalList.add(new FestivalRecommendationRes.ScheduledFestival(
                        findFestival.getId(), findFestival.getName(), findFestival.getDate(), findFestival.getPosterUrl()));
            }

            //종료 페스티벌 저장(8개)
            else if (findFestival.isEnded() && endedFestivalList.size() < 8) {
                //페스티벌 라인업에서 추천 아티스트 조회(4명)
                List<String> findLineup = jpaQueryFactory.select(artist.name)
                        .from(memberArtist)
                        .innerJoin(festivalLineup).on(festivalLineup.artist.id.eq(memberArtist.artist.id)
                                .and(festivalLineup.festival.id.eq(findFestival.getId())))
                        .innerJoin(artist).on(artist.id.eq(memberArtist.artist.id))
                        .where(memberArtist.member.id.eq(memberId))
                        .limit(4)
                        .fetch();

                //라인업 StringBuilder로 변환
                StringBuilder lineup = new StringBuilder();
                for (String artistName : findLineup) {
                    lineup.append(artistName).append(",");
                }
                lineup.deleteCharAt(lineup.length() - 1);

                //정보 저장
                endedFestivalList.add(new FestivalRecommendationRes.EndedFestival(findFestival.getId(), findFestival.getName(),
                        findFestival.getDate(), findFestival.getPosterUrl(), lineup.toString()));
            }

            //페스티벌 예정, 종료 8개씩 찾고 종료
            if (scheduledFestivalList.size() == 8 && endedFestivalList.size() == 8) {
                break;
            }
        }

        return FestivalRecommendationRes.builder()
                .scheduledFestivalList(scheduledFestivalList)
                .endedFestivalList(endedFestivalList)
                .build();
    }

    /**
     * 사용자 추천 아티스트 조회
     *
     * @param memberId
     * @param pageNo
     * @return
     */
    public ArtistRecommendationRes getArtistRecommendation(int memberId, int pageNo) {
        Pageable pageable = PageRequest.of(pageNo, 8);
        List<MemberArtist> findRecommendation = memberArtistRepository.findAllByMember_Id(memberId, pageable);

        if (findRecommendation.isEmpty()) {
            throw new CustomException(ErrorCode.RECOMMENDATION_NOT_READY_ERROR);
        }

        List<ArtistRecommendationRes.ArtistInfo> artistInfoList = new ArrayList<>();
        for (MemberArtist memberArtist : findRecommendation) {
            Artist findArtist = memberArtist.getArtist();

            artistInfoList.add(new ArtistRecommendationRes.ArtistInfo
                    (findArtist.getId(), findArtist.getName(), findArtist.getPictureUrl()));
        }

        return ArtistRecommendationRes.builder()
                .artistInfoList(artistInfoList)
                .build();
    }
}
