package com.a601.refesta.member.repository;

import com.a601.refesta.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Optional<Member> findByGoogleId(String googleId);
}
