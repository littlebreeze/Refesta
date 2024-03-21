package com.a601.refesta.member.repository;

import com.a601.refesta.member.domain.join.MemberArtist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberArtistRepository extends JpaRepository<MemberArtist, Integer> {

    List<MemberArtist> findAllByMember_Id(Integer memberId, Pageable pageable);
}
