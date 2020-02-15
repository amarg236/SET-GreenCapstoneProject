package com.setgreen.setgreen.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.Game;

@Repository
public interface GameRepo extends CrudRepository<Game, Long>{

}
