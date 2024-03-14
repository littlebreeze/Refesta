package com.a601.refesta.festival.repository;

import com.a601.refesta.festival.domain.Festival;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FestivalRepository extends JpaRepository<Festival, Integer> {
}
