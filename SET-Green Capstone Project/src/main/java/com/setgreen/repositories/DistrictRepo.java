package com.setgreen.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.setgreen.model.District;
@Repository
public interface DistrictRepo extends CrudRepository<District, Long>{
	@Query("SELECT d FROM District d WHERE d.districtName=(:dname)")
	public District findByName(@Param("dname") String dname);
}
