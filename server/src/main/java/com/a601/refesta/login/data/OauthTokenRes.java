package com.a601.refesta.login.data;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OauthTokenRes {
    private Integer memberId;

    private String tokenType;

    private String accessToken;

    private Integer expiresIn;

    private String refreshToken;

    private Integer refreshTokenExpiresIn;

    private boolean signUp;

    public void isSignUp(boolean signUp) {
        this.signUp = signUp;
    }
    //여기에 user프로필사진이랑 이름 변수로 같이 보내기 or isSignUp이 true면 api 요청 한개 더 보내기(프로필사진이랑 이름 받는)
}
