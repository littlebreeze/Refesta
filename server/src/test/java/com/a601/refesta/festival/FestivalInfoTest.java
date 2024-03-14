package com.a601.refesta.festival;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.festival.service.FestivalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

public class FestivalInfoTest {

    @Mock
    private FestivalRepository festivalRepository;
    @Mock
    private FestivalDetailRepository festivalDetailRepository;
    @InjectMocks
    private FestivalService festivalService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getFestivalInfo_ended() {
        //given
        Festival endedFestival = new Festival(1,
                "endedFestival", "ssafy", LocalDate.now(), "posterUrl", true);

        when(festivalRepository.findById(1)).thenReturn(Optional.of(endedFestival));

        //when
        FestivalInfoRes endedInfo = festivalService.getFestivalInfo(1);

        //then
        assertNotNull(endedInfo);
        assertEquals((Integer) 0, endedInfo.getPrice());
        assertEquals(null, endedInfo.getInfoImgUrl());
    }

    @Test
    void getFestivalInfo_scheduled() {
        Festival scheduledFestival = new Festival(1,
                "scheduledFestival", "ssafy", LocalDate.now(), "posterUrl", false);
        FestivalDetail scheduledDetail = new FestivalDetail(1,
                scheduledFestival, 10000, "infoImgUrl");

        when(festivalRepository.findById(1)).thenReturn(Optional.of(scheduledFestival));
        when(festivalDetailRepository.findByFestival_Id(1)).thenReturn(Optional.of(scheduledDetail));

        FestivalInfoRes scheduledInfo = festivalService.getFestivalInfo(1);

        assertNotNull(scheduledInfo);
        assertEquals(10000, scheduledInfo.getPrice());
        assertEquals("infoImgUrl", scheduledInfo.getInfoImgUrl());
    }

    @Test
    void getFestivalInfo_Error() {
        //예정된 행사인데, id에 해당하는 페스티벌 상세 정보가 존재하지 않는 경우
        Festival testFestival = new Festival(1,
                "testFestival", "ssafy", LocalDate.now(), "posterUrl", false);

        when(festivalRepository.findById(1)).thenReturn(Optional.of(testFestival));
        when(festivalDetailRepository.findByFestival_Id(1)).thenReturn(Optional.empty());

        CustomException exception = assertThrows(CustomException.class, () -> festivalService.getFestivalInfo(1));

        assertEquals(ErrorCode.FESTIVAL_DETAIL_NOT_FOUND_ERROR, exception.getErrorCode());
    }
}
