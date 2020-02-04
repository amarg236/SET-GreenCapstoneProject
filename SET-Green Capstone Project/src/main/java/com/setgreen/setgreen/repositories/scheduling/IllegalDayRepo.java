package com.setgreen.setgreen.repositories.scheduling;

import org.springframework.data.repository.CrudRepository;

import com.setgreen.setgreen.model.scheduling.IllegalDay;

public interface IllegalDayRepo extends CrudRepository<IllegalDay, Long>{

}
