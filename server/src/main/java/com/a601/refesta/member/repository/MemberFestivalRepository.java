package com.a601.refesta.member.repository;

import com.a601.refesta.member.domain.join.MemberFestival;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberFestivalRepository extends JpaRepository<MemberFestival, Integer> {

    List<MemberFestival> findAllByMember_Id(Integer memberId);
}
