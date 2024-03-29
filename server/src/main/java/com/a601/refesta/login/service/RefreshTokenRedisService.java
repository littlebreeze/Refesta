package com.a601.refesta.login.service;

import com.a601.refesta.login.repository.RefreshTokenRedisRepository;
import com.a601.refesta.member.domain.RefreshTokenRedis;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class RefreshTokenRedisService {

    private final RefreshTokenRedisRepository refreshTokenRedisRepository;

    @Transactional
    public void saveTokenInfo(Integer memberId, String refreshToken, LocalDateTime expireDate, Boolean isExpired) {
        refreshTokenRedisRepository.save(new RefreshTokenRedis(String.valueOf(memberId), refreshToken, expireDate, isExpired));
    }
    //로그아웃 처리 추가
}
