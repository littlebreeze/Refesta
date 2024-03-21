package com.a601.refesta.member.service;

import com.a601.refesta.common.exception.CustomException;
import com.a601.refesta.common.exception.ErrorCode;
import com.a601.refesta.common.util.S3Util;
import com.a601.refesta.genre.repository.GenreRepository;
import com.a601.refesta.member.data.MemberProfileRes;
import com.a601.refesta.member.data.PreferGenreReq;
import com.a601.refesta.member.domain.Member;
import com.a601.refesta.member.domain.join.PreferGenre;
import com.a601.refesta.member.repository.MemberRepository;
import com.a601.refesta.member.repository.PreferGenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PreferGenreRepository preferGenreRepository;
    private final GenreRepository genreRepository;
    private final S3Util s3Util;

    public Member getMember(int memberId) {
        return memberRepository.findById(memberId).orElseThrow();
    }

    public MemberProfileRes getProfile(int memberId) {
        Member member = getMember(memberId);
        return MemberProfileRes.builder()
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .build();
    }

    public void updateProfile(int memberId, String nickname, MultipartFile file) {
        Member member = getMember(memberId);
        member.setNickname(nickname);
        if (file != null && !file.isEmpty()) {
            member.setProfileUrl(s3Util.uploadFile(file));
        }
        memberRepository.save(member);
    }

    public void getPreferGenre(int memberId, PreferGenreReq genres) {
        Member member = getMember(memberId);
        for (Integer genreId : genres.getPreferGenres()) {
            PreferGenre preferGenre =
                    PreferGenre.builder()
                            .genre(genreRepository.findById(genreId).orElseThrow())
                            .member(member)
                            .build();
            preferGenreRepository.save(preferGenre);
        }
    }
}
