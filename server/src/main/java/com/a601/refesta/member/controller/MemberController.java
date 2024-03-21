package com.a601.refesta.member.controller;

import com.a601.refesta.common.jwt.TokenProvider;
import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.member.data.MemberProfileRes;
import com.a601.refesta.member.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/members")
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;
    private final TokenProvider tokenProvider;

    @GetMapping()
    public SuccessResponse<MemberProfileRes> getProfile(HttpServletRequest request) {
        int memberId = tokenProvider.getMemberIdByToken(request);
        MemberProfileRes memberProfileRes=memberService.getProfile(memberId);
        return new SuccessResponse<>(memberProfileRes);
    }


}
