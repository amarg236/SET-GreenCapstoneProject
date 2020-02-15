package com.setgreen.setgreen.repositories.scheduling;

import org.springframework.data.repository.CrudRepository;

import com.setgreen.setgreen.model.scheduling.EventDay;

public interface EventDayRepo extends CrudRepository<EventDay, Long>{

}
