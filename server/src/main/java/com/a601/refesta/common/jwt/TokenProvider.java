package com.a601.refesta.common.jwt;

import com.a601.refesta.login.data.OauthTokenRes;
import com.a601.refesta.member.domain.Member;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.sql.Timestamp;
import java.util.Date;

import static java.time.LocalDateTime.now;

@Component
public class TokenProvider {
    private static final String AUTHORITIES_KEY = "auth";
    private static final String BEARER_TYPE = "bearer";
    private static final int ACCESS_TOKEN_EXPIRE_TIME = 1000 * 60 * 30; // 30분
    private static final int REFRESH_TOKEN_EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7; // 7일
    private static final String AUD = "https://j10a601.p.ssafy.io/";
    private static final String ISS = "https://j10a601.p.ssafy.io/";
    private final Key key;

    public TokenProvider(@Value("${spring.security.oauth2.jwt.secret}") String secret) {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public OauthTokenRes generateTokenDto(Member member) {

        long now = (new Date()).getTime();
        //ACCESSTOKEN 생성
        String accessToken = Jwts.builder()
                .claim(AUTHORITIES_KEY, "USER")
                .signWith(key, SignatureAlgorithm.ES512)
                .setAudience(AUD) //식별가능해야한다.
                .setSubject(String.valueOf(member.getGoogleId()))
                .setIssuer(ISS)
                .setIssuedAt(Timestamp.valueOf(now()))
                .setExpiration(new Date(now + ACCESS_TOKEN_EXPIRE_TIME))
                .compact();

        //REFRESHTOKEN 생성
        String refreshToken = Jwts.builder()
                .signWith(key,SignatureAlgorithm.ES512)
                .setAudience(AUD)
                .setSubject(String.valueOf(member.getGoogleId()))
                .setIssuer(ISS)
                .setIssuedAt(Timestamp.valueOf(now()))
                .setExpiration(new Date(now + REFRESH_TOKEN_EXPIRE_TIME))
                .compact();


        return OauthTokenRes.builder()
                .memberId(member.getId())
                .tokenType(BEARER_TYPE)
                .accessToken(accessToken)
                .expiresIn(ACCESS_TOKEN_EXPIRE_TIME-1)
                .refreshToken(refreshToken)
                .refreshTokenExpiresIn(REFRESH_TOKEN_EXPIRE_TIME)
                .build();
    }
}
