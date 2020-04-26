package com.setgreen.repositories;

import java.util.Collection;
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
    public void updateVerify(@Param("id") Long id, @Param("tf") boolean tf);

    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d) AND g.rejected = FALSE")
	public List<Game> findInDistrictAll(@Param("d") String d);
    
    @Query("SELECT g FROM Game g WHERE (g.hometeam = (:n) OR g.awayteam = (:n)) AND g.rejected = FALSE")
	public List<Game> findByTeamAll(@Param("n") String n);
    
    @Query("SELECT g FROM Game g WHERE (g.hometeam = (:n) OR g.awayteam = (:n)) AND g.approved = TRUE AND g.rejected = FALSE")
	public List<Game> findByTeamVerified(@Param("n") String n);
    
    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d) AND g.approved = TRUE AND g.rejected = FALSE")
    public List<Game> findInDistrictVerified(@Param("d") String d);

    @Query("SELECT g FROM Game g WHERE g.homedistrict = (:d) OR g.awaydistrict = (:d) AND g.awayAccepted = TRUE AND g.rejected = FALSE")
    public List<Game> findInDistrictAccepted(@Param("d") String d);
    
    @Modifying
    @Query("UPDATE Game g set awayAccepted = (:tf) WHERE g.id = (:id) AND awayAccepted != TRUE")
	public void updateAccept(@Param("id") Long id, @Param("tf") boolean tf);

    @Modifying
    @Query("UPDATE Game g set uAcceptor = (:u) WHERE g.id = (:id)")
	public void updateUAcceptor(@Param("id") Long id, @Param("u") String u);

    @Modifying
    @Query("UPDATE Game g set uApprover = (:u) WHERE g.id = (:id)")
	public void updateUApprover(@Param("id") Long id, @Param("u") String u);

    
    @Query("SELECT g FROM Game g WHERE g.approved = TRUE")
	public List<Game> findAllVerifiedAndRejectedFalse();
    
    public List<Game> findAllByAwayAcceptedTrueAndRejectedFalse();

	public List<Game> findByApprovedFalseAndRejectedFalse();
	
	@Query("SELECT g FROM Game g WHERE (g.hometeamId = (:hId) OR g.awayteamId = (:aId)) AND g.approved = (:isAprvd) AND g.rejected = (:isRjctd)")
	public List<Game> getByGameExample(@Param("hId") Long homeId, @Param("aId") Long awayId, @Param("isAprvd") boolean apprvd, @Param("isRjctd") boolean rjctd);
	
	@Modifying
    @Query("UPDATE Game g set rejected = TRUE, awayNotification = (:tf), homeNotification = TRUE WHERE g.id = (:id) AND awayAccepted != TRUE")
	public void updateRejected(@Param("id") Long id, @Param("tf") boolean tf);

	public List<Game> findByHometeamIdOrAwayteamIdAndRejected(long id, long id2, boolean tf);

	@Modifying
    @Query("UPDATE Game g set awayNotification = (:tf) WHERE g.id = (:id)")
	public void updateAwayteamNotification(@Param("id") long id, @Param("tf") boolean tf);
	@Modifying
    @Query("UPDATE Game g set homeNotification = (:tf) WHERE g.id = (:id)")
	public void updateHometeamNotification(@Param("id") long id, @Param("tf") boolean tf);

	public List<Game> findByHometeamIdAndAwayAcceptedTrue(long id);

	public List<Game> findByAwayteamIdAndAwayAcceptedTrue(long id);

	public List<Game> findByHometeamIdAndAwayAcceptedFalse(long id);

	public List<Game> findByAwayteamIdAndAwayAcceptedFalse(long id);

	public List<Game> findByHometeamIdAndApprovedFalse(long id);

	public List<Game> findByAwayteamIdAndApprovedFalse(long id);

	public List<Game> findByApprovedFalse();
	
	@Query("SELECT g FROM Game g WHERE (g.hometeamId = (:i) OR g.awayteamId = (:i))")
	public List<Game> findByTeamIdAll(@Param("i") long id);
	@Query("SELECT g FROM Game g WHERE (g.hometeamId = (:i) OR g.awayteamId = (:i)) AND approved=(:b)")
	public Collection<? extends Game> findTeamIdAndApproved(@Param("i") long id, @Param("b") boolean b);
	@Query("SELECT g FROM Game g WHERE (g.hometeamId = (:i) OR g.awayteamId = (:i)) AND awayAccepted=(:b)")
	public Collection<? extends Game> findByTeamIdAndVerified(@Param("i") long id, @Param("b") boolean b);
	@Query("SELECT g FROM Game g WHERE g.hometeamId = (:hId) OR g.awayteamId = (:hId) OR g.hometeamId = (:aId) OR g.awayteamId = (:aId)")
	public List<Game> getByTeamIds(@Param("hId") Long homeId, @Param("aId") Long awayId);
}