package com.a601.refesta.member.repository;

import com.a601.refesta.member.domain.join.MemberSong;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberSongRepository extends JpaRepository<MemberSong, Long> {

    Optional<MemberSong> findByMember_IdAndSong_Id(int memberId, int songId);
}
