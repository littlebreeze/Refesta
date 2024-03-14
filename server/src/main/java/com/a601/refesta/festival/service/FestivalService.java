package com.a601.refesta.festival.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalLikeRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.member.domain.join.FestivalLike;
import com.a601.refesta.member.service.MemberService;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.festival.domain.QFestivalDetail.festivalDetail;

@Service
@RequiredArgsConstructor
public class FestivalService {

    private final MemberService memberService;

    private final FestivalRepository festivalRepository;
    private final FestivalDetailRepository festivalDetailRepository;
    private final FestivalLikeRepository festivalLikeRepository;

    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 페스티벌 정보 조회
     * @param festivalId
     * @return FestivalInfoRes - 이름, 날짜, 장소, 포스터, (가격), (상세 정보)
     */
    public FestivalInfoRes getFestivalInfo(int festivalId) {
        Festival findFestival = getFestival(festivalId);

        //기본 정보 저장
        FestivalInfoRes festivalInfo = FestivalInfoRes.builder()
                .name(findFestival.getName())
                .date(findFestival.getDate())
                .location(findFestival.getLocation())
                .posterUrl(findFestival.getPosterUrl())
                .build();

        //예정된 페스티벌이면, 세부 정보 추가
        if (!findFestival.isEnded()) {
            FestivalDetail findDetail = festivalDetailRepository.findByFestival_Id(festivalId)
                    .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_DETAIL_NOT_FOUND_ERROR));

            festivalInfo.setDetailInfo(findDetail.getPrice(), findDetail.getInfoImgUrl());
        }

        return festivalInfo;
    }

    /**
     * 페스티벌 좋아요 업데이트
     * @param memberId - 구글 식별 ID
     * @param festivalId
     */
    public void updateFestivalLike(String memberId, int festivalId) {
        Optional<FestivalLike> optFindLike = festivalLikeRepository.findByFestival_IdAndMember_Id(memberId, festivalId);

        //DB에 없으면 추가
        if(optFindLike.isEmpty()) {
            festivalLikeRepository.save(FestivalLike.builder()
                    .member(memberService.getMember(memberId))
                    .festival(getFestival(festivalId))
                    .isLiked(true)
                    .build()
            );

            return;
        }

        //DB에 있으면 좋아요 상태 업데이트 후 저장
        FestivalLike findLike = optFindLike.get();
        findLike.updateStatus();

        festivalLikeRepository.save(findLike);
    }

    public Festival getFestival(int festivalId) {
        return  festivalRepository.findById(festivalId)
                .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_NOT_FOUND_ERROR));
    }
}
