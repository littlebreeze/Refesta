package com.a601.refesta.login.controller;

import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.login.data.GoogleOAuthTokenRes;
import com.a601.refesta.login.data.GoogleUserInfoRes;
import com.a601.refesta.login.data.OauthTokenRes;
import com.a601.refesta.login.service.LoginService;
import com.a601.refesta.member.domain.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;

    @GetMapping()
    public SuccessResponse<OauthTokenRes> getAccessTokenJsonData(@RequestParam String code) { // Data를 리턴해주는 컨트롤러 함수
        //코드로 토큰받기
        GoogleOAuthTokenRes oauthTokenData = loginService.getTokenbyCode(code);
        //토큰으로 사용자 정보 받기
        GoogleUserInfoRes googleUserInfoRes = loginService.getUserInfoByToken(oauthTokenData.getAccess_token());
        
        //사용자 우리 유저인지 체크하고 아니라면 회원가입
        Member member = loginService.registrationCheck(googleUserInfoRes);


        OauthTokenRes oauthTokenRes = new OauthTokenRes();
        return new SuccessResponse<>(oauthTokenRes);
    }


}
