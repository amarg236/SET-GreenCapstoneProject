package com.setgreen.setgreen.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.Teams;

@Repository
public interface TeamsRepo extends CrudRepository<Teams, Long> {

	Teams findByTmName(String awayteam);

}
