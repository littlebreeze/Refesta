package com.a601.refesta.login.controller;

import com.a601.refesta.common.response.SuccessResponse;
import com.a601.refesta.login.data.OauthTokenRes;
import com.a601.refesta.login.service.LoginService;
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
        OauthTokenRes oauthTokenRes = loginService.getAccessTokenJsonData(code);
        return new SuccessResponse<>(oauthTokenRes);
    }


}
