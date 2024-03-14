package com.a601.refesta.festival;

import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.festival.repository.FestivalLikeRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.festival.service.FestivalService;
import com.a601.refesta.member.domain.Member;
import com.a601.refesta.member.domain.join.FestivalLike;
import com.a601.refesta.member.repository.MemberRepository;
import com.a601.refesta.member.service.MemberService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class FestivalLikeTest {

    @Mock
    private FestivalRepository festivalRepository;
    @Mock
    private FestivalLikeRepository festivalLikeRepository;
    @Mock
    private MemberService memberService;

    @InjectMocks
    private FestivalService festivalService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void updateFestivalLike_First() {
        String memberId = "testMember";
        int festivalId = 1;

        //최초 요청시엔 DB에 존재 X
        when(festivalLikeRepository.findByFestival_IdAndMember_Id(memberId, festivalId))
                .thenReturn(Optional.empty());

        Member testMember = mock(Member.class);
        Festival testFestival = mock(Festival.class);

        when(memberService.getMember(memberId)).thenReturn(testMember);
        when(festivalService.getFestival(festivalId)).thenReturn(testFestival);

        ArgumentCaptor<FestivalLike> festivalLikeCaptor = ArgumentCaptor.forClass(FestivalLike.class);

        //when
        festivalService.updateFestivalLike(memberId, festivalId);

        //then
        FestivalLike capturedFestivalLike = festivalLikeCaptor.getValue();
        assertTrue(capturedFestivalLike.isLiked());
    }

}
