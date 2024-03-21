package com.a601.refesta.login.repository;

import com.a601.refesta.member.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {

    @Query("select rt from RefreshToken as rt where rt.isExpired = false ")
    Optional<RefreshToken> findByToken(String refreshToken);

    @Query("select rt from RefreshToken as rt where rt.isExpired = false ")
    List<RefreshToken> findAllByToken();
}
