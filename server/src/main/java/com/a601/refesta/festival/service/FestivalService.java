package com.a601.refesta.festival.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.a601.refesta.festival.domain.QFestival.festival;
import static com.a601.refesta.festival.domain.QFestivalDetail.festivalDetail;

@Service
@RequiredArgsConstructor
public class FestivalService {

    private final FestivalRepository festivalRepository;
    private final FestivalDetailRepository festivalDetailRepository;
    private final JPAQueryFactory jpaQueryFactory;

    /**
     * 페스티벌 정보 조회
     * @param festivalId
     * @return FestivalInfoRes - 이름, 날짜, 장소, 포스터, (가격), (상세 정보)
     */
    public FestivalInfoRes getFestivalInfo(int festivalId) {
        Festival findFestival = getFestival(festivalId);

        FestivalInfoRes festivalInfo = FestivalInfoRes.builder()
                .name(findFestival.getName())
                .date(findFestival.getDate())
                .location(findFestival.getLocation())
                .posterUrl(findFestival.getPosterUrl())
                .build();

        if (!findFestival.isEnded()) {
            FestivalDetail findDetail = festivalDetailRepository.findByFestival_Id(festivalId)
                    .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_DETAIL_NOT_FOUND_ERROR));

            festivalInfo.setDetailInfo(findDetail.getPrice(), findDetail.getInfoImgUrl());
        }

        return festivalInfo;
    }

    public Festival getFestival(int festivalId) {
        return  festivalRepository.findById(festivalId)
                .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_NOT_FOUND_ERROR));
    }
}
