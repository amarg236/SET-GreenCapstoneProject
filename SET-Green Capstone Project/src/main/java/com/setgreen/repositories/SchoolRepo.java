package com.setgreen.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.model.School;

@Repository
public interface SchoolRepo extends CrudRepository<School, Long>{

	Iterable<School> findByDistrict_Id(Long id);
	
}