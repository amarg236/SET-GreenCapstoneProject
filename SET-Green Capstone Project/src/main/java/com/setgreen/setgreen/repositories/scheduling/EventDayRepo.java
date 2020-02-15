package com.setgreen.setgreen.repositories.scheduling;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.scheduling.EventDay;

@Repository
public interface EventDayRepo extends CrudRepository<EventDay, Long>{

}
