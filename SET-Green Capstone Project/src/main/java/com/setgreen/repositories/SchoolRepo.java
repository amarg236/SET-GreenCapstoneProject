package com.setgreen.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.setgreen.model.School;

@Repository
public interface SchoolRepo extends CrudRepository<School, Long>{

	@Query("SELECT s FROM School s WHERE districtName = (:nm)")
	Iterable<School> findInDistrict(@Param("nm") String nm);
	
}