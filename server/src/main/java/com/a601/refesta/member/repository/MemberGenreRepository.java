package com.a601.refesta.member.repository;

import com.a601.refesta.member.domain.join.MemberGenre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberGenreRepository extends JpaRepository<MemberGenre, Integer> {
}
