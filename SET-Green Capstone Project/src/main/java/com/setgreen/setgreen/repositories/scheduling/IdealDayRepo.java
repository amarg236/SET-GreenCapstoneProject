package com.setgreen.setgreen.repositories.scheduling;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.model.scheduling.IdealDay;

@Repository
public interface IdealDayRepo extends CrudRepository<IdealDay, Long> {

	Iterable<IdealDay> findByTm_Id(Long id);

}