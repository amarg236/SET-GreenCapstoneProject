package com.setgreen.repositories.scheduling;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.model.scheduling.EventDay;

@Repository
public interface EventDayRepo extends JpaRepository<EventDay, Long>{

}
