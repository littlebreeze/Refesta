package com.a601.refesta.member.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Builder
@RedisHash(value = "refreshTokenRedis", timeToLive = 60 * 60 * 24 * 7)//레디스 데이터 유효기간 :7일
public class RefreshTokenRedis {

    @Id
    private String id;

    @Indexed
    private String refreshToken;

    private LocalDateTime expireDate;

    private Boolean isExpired;

    public boolean isValid(LocalDateTime now) {
        if (isExpired) return false;
        return expireDate.isAfter(now);
    }

    public void setExpired() {
        this.isExpired = true;
    }

}
