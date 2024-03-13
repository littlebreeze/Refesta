package com.a601.refesta.festival.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FestivalService {

    private final FestivalRepository festivalRepository;
    private final FestivalDetailRepository festivalDetailRepository;

    /**
     * 페스티벌 정보 조회
     * @param festivalId
     * @return FestivalInfoRes - 이름, 날짜, 장소, 포스터, (가격), (상세정보)
     */
    public FestivalInfoRes getFestivalInfo(int festivalId) {
        Festival findFestival = getFestival(festivalId);

        FestivalInfoRes festivalInfo = FestivalInfoRes.builder()
                .name(findFestival.getName())
                .date(findFestival.getDate())
                .location(findFestival.getLocation())
                .posterUrl(findFestival.getPosterUrl())
                .build();

        //예정된 페스티벌은 가격, 상세 정보 이미지 추가
        if(!findFestival.isEnded()) {
            FestivalDetail findDetail = festivalDetailRepository.findByFestival_Id(festivalId)
                            .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_DETAIL_NOT_FOUND_ERROR));

            festivalInfo.setPrice(findDetail.getPrice());
            festivalInfo.setInfoImgUrl(findDetail.getPictureUrl());
        }

        return festivalInfo;
    }

    //공통 메서드
    public Festival getFestival(Integer festivalId) {
        return festivalRepository.findById(festivalId)
                .orElseThrow(() -> new CustomException(ErrorCode.FESTIVAL_NOT_FOUND_ERROR));
    }
}
