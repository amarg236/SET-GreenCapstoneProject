package com.setgreen.repositories.scheduling;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.model.scheduling.BadDay;

@Repository
public interface BadDayRepo extends CrudRepository<BadDay, Long> {

	Iterable<BadDay> findByTm_Id(Long id);

}
