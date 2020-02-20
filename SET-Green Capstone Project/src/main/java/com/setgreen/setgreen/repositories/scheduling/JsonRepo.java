package com.setgreen.setgreen.repositories.scheduling;

import com.setgreen.setgreen.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JsonRepo extends JpaRepository<Game, Long> {
//    Game findAllByAwayAcceptedAndApproved();
    List<Game> findAllByAwayAcceptedTrue();

}
