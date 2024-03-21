package com.a601.refesta.member.service;

import com.a601.refesta.artist.service.ArtistService;
import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.festival.repository.FestivalLineupRepository;
import com.a601.refesta.festival.service.FestivalService;
import com.a601.refesta.member.domain.Member;
import com.a601.refesta.recommendation.repository.MemberArtistRepository;
import com.a601.refesta.recommendation.repository.MemberFestivalRepository;
import com.a601.refesta.member.repository.MemberRepository;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final FestivalService festivalService;
    private final ArtistService artistService;

    private final MemberRepository memberRepository;
    private final MemberFestivalRepository memberFestivalRepository;
    private final MemberArtistRepository memberArtistRepository;
    private final FestivalLineupRepository festivalLineupRepository;

    private final JPAQueryFactory jpaQueryFactory;

    public Member getMember(String googleId) {
        Member member = memberRepository.findByGoogleId(googleId);
        if (member == null) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND_ERROR);
        }
        return member;
    }
}
