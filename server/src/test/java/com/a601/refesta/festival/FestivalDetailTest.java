package com.a601.refesta.festival;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalDetailRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.festival.service.FestivalService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class FestivalDetailTest {

    @Mock
    FestivalDetailRepository festivalDetailRepository;
    @Mock
    FestivalRepository festivalRepository;
    @InjectMocks
    FestivalService festivalService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getFestivalDetail() {
        int festivalId = 1;
        Festival testFestival = mock(Festival.class);
        FestivalDetail testDetail = new FestivalDetail(festivalId, testFestival, "infoImgUrl");

        when(festivalDetailRepository.findByFestival_Id(festivalId)).thenReturn(Optional.of(testDetail));

        FestivalDetailRes festivalDetail = festivalService.getFestivalDetail(festivalId);

        assertNotNull(festivalDetail);
        assertEquals("infoImgUrl", festivalDetail.getInfoImgUrl());
    }

    @Test
    void getFestivalDetail_FES002() {
        //예정된 페스티벌의 상세 정보가 DB에 저장되지 않은 경우
        int festivalId = 1;
        Festival testFestival = new Festival(festivalId,
                "testFestival", "ssafy", LocalDate.now(), "posterUrl", 0, false);

        when(festivalRepository.findById(festivalId)).thenReturn(Optional.of(testFestival));
        when(festivalDetailRepository.findByFestival_Id(festivalId)).thenReturn(Optional.empty());

        CustomException exception = assertThrows(CustomException.class,
                () -> festivalService.getFestivalDetail(festivalId));

        assertEquals(ErrorCode.FESTIVAL_DETAIL_NOT_FOUND_ERROR, exception.getErrorCode());
    }

    @Test
    void getFestivalDetail_FES003() {
        //종료된 페스티벌의 상세 정보 조회 요청이 들어온 경우
        int festivalId = 1;
        Festival testFestival = new Festival(festivalId,
                "testFestival", "ssafy", LocalDate.now(), "posterUrl", 0, true);

        when(festivalRepository.findById(festivalId)).thenReturn(Optional.of(testFestival));

        CustomException exception = assertThrows(CustomException.class,
                () -> festivalService.getFestivalDetail(festivalId));

        assertEquals(ErrorCode.FESTIVAL_ALREADY_ENDED_ERROR, exception.getErrorCode());
    }
}
