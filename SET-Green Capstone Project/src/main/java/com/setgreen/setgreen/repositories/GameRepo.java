package com.setgreen.setgreen.repositories;

import java.util.Date;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.Game;

@Repository
public interface GameRepo extends CrudRepository<Game, Long>{
    @Modifying
    @Query("UPDATE Game g set approved = (:tf) WHERE g.time = (:time) AND g.location = (:location)")
    public void updateVerify(@Param("time") Date time, @Param("location") String location, @Param("tf") boolean tf);

    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d)")
	public Iterable<Game> findInDistrictAll(@Param("d") String d);
    
    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d) AND g.approved = TRUE")
    public Iterable<Game> findInDistrictVerified(@Param("d") String d);
}