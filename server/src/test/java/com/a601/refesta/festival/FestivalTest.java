package com.a601.refesta.festival;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.data.FestivalInfoRes;
import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.domain.FestivalDetail;
import com.a601.refesta.festival.repository.FestivalDetailRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.festival.service.FestivalService;
import com.a601.refesta.member.domain.join.FestivalLike;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FestivalTest {

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
    void getFestival() {
        int festivalId = 1;
        Festival testFestival = mock(Festival.class);

        when(festivalRepository.findById(festivalId)).thenReturn(Optional.of(testFestival));

        Festival result = festivalService.getFestival(festivalId);

        assertNotNull(result);
    }

    @Test
    void getFestival_FES001() {
        //id에 해당하는 페스티벌이 존재하지 않는 경우
        int festivalId = 1;
        when(festivalRepository.findById(festivalId)).thenReturn(Optional.empty());

        CustomException exception = assertThrows(CustomException.class,
                () -> festivalService.getFestivalInfo(festivalId));

        assertEquals(ErrorCode.FESTIVAL_NOT_FOUND_ERROR, exception.getErrorCode());
    }
}
