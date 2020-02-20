package com.setgreen.setgreen.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.setgreen.setgreen.model.District;
@Repository
public interface DistrictRepo extends CrudRepository<District, Long>{
	@Query("SELECT d.districtName FROM District d WHERE d.districtName=(:dname)")
	public String findByName(@Param("dname") String dname);
}