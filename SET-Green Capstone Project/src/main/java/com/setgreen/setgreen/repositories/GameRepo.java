package com.setgreen.setgreen.repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.Game;

@Repository
public interface GameRepo extends CrudRepository<Game, Long>{
    @Modifying
    @Query("UPDATE Game g set verified = (:tf) WHERE g.time = (:time) AND g.location = (:location)")
    public void updateVerify(@Param("time") String time, @Param("location") String location, @Param("tf") boolean tf);
}