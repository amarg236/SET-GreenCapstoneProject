package com.setgreen.setgreen.repositories.scheduling;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.scheduling.BadDay;

@Repository
public interface BadDayRepo extends JpaRepository<BadDay, Long> {

	Iterable<BadDay> findByTm_Id(Long id);

}
