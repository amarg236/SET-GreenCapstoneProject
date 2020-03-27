package com.setgreen.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.setgreen.model.Game;

@Repository
public interface GameRepo extends CrudRepository<Game, Long>{
    @Modifying
    @Query("UPDATE Game g set approved = (:tf) WHERE g.id = (:id)")
    public void updateVerify(@Param("id") long id, @Param("tf") boolean tf);

    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d)")
	public List<Game> findInDistrictAll(@Param("d") String d);
    
    @Query("SELECT g FROM Game g WHERE (g.hometeam = (:n) OR g.awayteam = (:n))")
	public List<Game> findInSchoolAll(@Param("n") String n);
    
    @Query("SELECT g FROM Game g WHERE (g.hometeam = (:n) OR g.awayteam = (:n)) AND g.approved = TRUE")
	public List<Game> findInSchoolVerified(@Param("n") String n);
    
    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d) AND g.approved = TRUE")
    public List<Game> findInDistrictVerified(@Param("d") String d);

    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d) AND g.awayAccepted = TRUE")
    public List<Game> findInDistrictAccepted(@Param("d") String d);
    
    @Modifying
    @Query("UPDATE Game g set awayAccepted = (:tf) WHERE g.id = (:id) AND awayAccepted != TRUE")
	public void updateAccept(@Param("id") Long id, @Param("tf") boolean tf);

    @Modifying
    @Query("UPDATE Game g set uAcceptor = (:u) WHERE g.id = (:id) AND awayAccepted != TRUE")
	public void updateUAcceptor(@Param("id") Long id, @Param("u") String u);

    @Modifying
    @Query("UPDATE Game g set uApprover = (:u) WHERE g.id = (:id) AND awayAccepted != TRUE")
	public void updateUApprover(@Param("id") Long id, @Param("u") String u);

    
    @Query("SELECT g FROM Game g WHERE g.approved = TRUE")
	public List<Game> findAllVerified();
    
    public List<Game> findAllByAwayAcceptedTrue();

	public List<Game> findByApprovedFalse();
}