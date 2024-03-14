package com.a601.refesta.login.service;

import com.a601.refesta.common.jwt.TokenProvider;
import com.a601.refesta.login.data.GoogleOAuthTokenRes;
import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final TokenProvider tokenProvider;

    private final String GRANT_TYPE = "authorization_code";

    @Value("${spring.security.oauth2.provider.google.client-id}")
    private String CLIENT_ID;

    private final String REDIRECT_URI = "http://j10a601.p.ssafy.io/login";

    private final String TOKEN_URL = "https://oauth2.googleapis.com/token";

    @Value("${spring.security.oauth2.provider.google.client-secret}")
    private String CLIENT_SECRET;

    public GoogleOAuthTokenRes getTokenbyCode(String code) {

        // POST 방식으로 key=value 데이터를 요청 (구글 쪽으로)
        // 이 때 필요한 라이브러리가 RestTemplate, 얘를 쓰면 http 요청을 편하게 할 수 있다.
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", GRANT_TYPE);
        params.add("client_id", CLIENT_ID);
        params.add("client_secret", CLIENT_SECRET);
        params.add("code", code);
        params.add("redirect_uri", REDIRECT_URI);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // googleTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> googleTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                TOKEN_URL,
                HttpMethod.POST,
                googleTokenRequest,
                String.class
        );
        Gson gson = new Gson();

        return gson.fromJson(response.getBody(), GoogleOAuthTokenRes.class);

    }

}
