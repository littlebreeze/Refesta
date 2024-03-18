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
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class FestivalInfoTest {

    @Mock
    private FestivalRepository festivalRepository;
    @InjectMocks
    private FestivalService festivalService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getFestivalInfo() {
        Festival testFestival = new Festival(1, "testFestival",
                "ssafy", LocalDate.now(), "posterUrl", 10000, false);

        when(festivalRepository.findById(1)).thenReturn(Optional.of(testFestival));

        //when
        FestivalInfoRes festivalInfo = festivalService.getFestivalInfo(1);

        //then(예정된 페스티벌 정보, 상세 정보 이미지 O)
        assertNotNull(festivalInfo);
        assertEquals(10000, festivalInfo.getPrice());
        assertFalse(festivalInfo.isEnded());
    }
}
