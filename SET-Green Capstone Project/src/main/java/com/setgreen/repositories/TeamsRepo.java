package com.setgreen.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.model.Teams;

@Repository
public interface TeamsRepo extends CrudRepository<Teams, Long> {

	Teams findByInternalName(String awayteam);

	Iterable<Teams> findBySchool_District_Id(Long id);

	Iterable<Teams> findBySchool_Id(Long id);

}
