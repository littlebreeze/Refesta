package com.a601.refesta.festival;

import com.a601.refesta.festival.domain.Festival;
import com.a601.refesta.member.repository.FestivalLikeRepository;
import com.a601.refesta.festival.repository.FestivalRepository;
import com.a601.refesta.festival.service.FestivalService;
import com.a601.refesta.member.domain.Member;
import com.a601.refesta.member.domain.join.FestivalLike;
import com.a601.refesta.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class FestivalLikeTest {

    @Mock
    private FestivalRepository festivalRepository;
    @Mock
    private FestivalLikeRepository festivalLikeRepository;
    @Mock
    private MemberService memberService;
    @InjectMocks
    private FestivalService festivalService;
    @Captor
    private ArgumentCaptor<FestivalLike> festivalLikeCaptor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void updateFestivalLike_Create() {
        String memberId = "testMember";
        List<Integer> festivalIdList = new ArrayList<>();
        festivalIdList.add(1);
        int festivalId = festivalIdList.get(0);

        when(festivalLikeRepository.findByMember_GoogleIdAndFestival_Id(memberId, festivalId))
                .thenReturn(Optional.empty());

        Member testMember = mock(Member.class);
        Festival testFestival = mock(Festival.class);

        when(memberService.getMember(memberId)).thenReturn(testMember);
        when(festivalRepository.findById(festivalId)).thenReturn(Optional.of(testFestival));

        //when
        festivalService.updateFestivalLike(memberId, festivalIdList);

        //then(DB에 없으면 새로 생성, isLiked 디폴트 값은 true)
        verify(festivalLikeRepository).save(festivalLikeCaptor.capture());
        FestivalLike createdLike = festivalLikeCaptor.getValue();
        assertTrue(createdLike.isLiked());
    }

    @Test
    void updateFestivalLike_Update() {
        String memberId = "testMember";
        List<Integer> festivalIdList = new ArrayList<>();
        festivalIdList.add(1);
        int festivalId = festivalIdList.get(0);

        Member testMember = mock(Member.class);
        Festival testFestival = mock(Festival.class);
        FestivalLike testLike = new FestivalLike(1, testMember, testFestival, true);

        when(festivalLikeRepository.findByMember_GoogleIdAndFestival_Id(memberId, festivalId))
                .thenReturn(Optional.of(testLike));

        //when
        festivalService.updateFestivalLike(memberId, festivalIdList);

        //then(DB에 있으면 좋아요 상태 업데이트)
        assertFalse(testLike.isLiked());
    }
}
