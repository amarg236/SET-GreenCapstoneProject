package com.setgreen.setgreen.repositories;

import com.setgreen.setgreen.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepo extends JpaRepository<Game,Long> {

}
