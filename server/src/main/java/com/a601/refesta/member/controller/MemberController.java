package com.a601.refesta.member.controller;

import com.a601.refesta.common.jwt.TokenProvider;
import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.member.data.MemberProfileRes;
import com.a601.refesta.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final TokenProvider tokenProvider;

    @GetMapping
    public SuccessResponse<MemberProfileRes> getProfile(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        MemberProfileRes memberProfileRes = memberService.getProfile(memberId);
        return new SuccessResponse<>(memberProfileRes);
    }

    @PostMapping
    public SuccessResponse<Integer> editProfile(HttpServletRequest request, @RequestParam(value = "file", required = false) MultipartFile file, @RequestParam("nickname") String nickname) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        memberService.updateProfile(memberId, nickname, file);
        return new SuccessResponse<>(HttpStatus.SC_OK);
    }


}
