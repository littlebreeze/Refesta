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
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PreferGenreRepository preferGenreRepository;
    private final GenreRepository genreRepository;
    private final S3Util s3Util;

    public Member getMember(String googleId) {
        Member member = memberRepository.findByGoogleId(googleId);
        if (member == null) {
            throw new CustomException(ErrorCode.MEMBER_NOT_FOUND_ERROR);
        }
        return member;
    }

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

    public void createPreferGenre(int memberId, PreferGenreReq genres) {
        Member member = getMember(memberId);
        if (genres.getPreferGenres() != null && !genres.getPreferGenres().isEmpty()) {
            for (Integer genreId : genres.getPreferGenres()) {
                PreferGenre preferGenre =
                        PreferGenre.builder()
                                .genre(genreRepository.findById(genreId).orElseThrow())
                                .member(member)
                                .build();
                preferGenreRepository.save(preferGenre);
            }
        }

        //추천 데이터 업데이트 요청
        RestTemplate rt = new RestTemplate();
        MultiValueMap<String, Integer> parameters = new LinkedMultiValueMap<>();
        parameters.add("userId", memberId);

        ResponseEntity<String> response = rt.postForEntity(
                "http://localhost:5000/recommend",
                parameters,
                String.class
        );
        System.out.println(response.getBody());

    }
}
