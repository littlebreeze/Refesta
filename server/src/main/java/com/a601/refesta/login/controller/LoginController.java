package com.a601.refesta.login.controller;

import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.login.data.OauthTokenRes;
import com.a601.refesta.login.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@RequiredArgsConstructor
public class LoginController {

    private final LoginService loginService;
    @PostMapping("/oauth2/code/google")
    public SuccessResponse<OauthTokenRes> getAccessTokenJsonData(@RequestBody String code) { // Data를 리턴해주는 컨트롤러 함수
        OauthTokenRes oauthTokenRes = loginService.getAccessTokenJsonData(code);
        return new SuccessResponse<>(oauthTokenRes);
    }

    @PostMapping("/oauth/token") //accessToken 만료 시 refreshToken으로 토큰 재발급
    public SuccessResponse<OauthTokenRes> regenerateToken(@RequestBody String refreshTokenReq) {
        OauthTokenRes oauthTokenRes = loginService.regenerateToken(refreshTokenReq);
        return new SuccessResponse<>(oauthTokenRes);
    }
}
