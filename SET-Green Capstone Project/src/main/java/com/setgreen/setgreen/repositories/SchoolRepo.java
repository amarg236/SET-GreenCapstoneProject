package com.setgreen.setgreen.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.setgreen.setgreen.model.School;

@Repository
public interface SchoolRepo extends CrudRepository<School, Long>{
	
}