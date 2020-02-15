package com.setgreen.setgreen.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.setgreen.setgreen.model.District;
@Repository
public interface DistrictRepo extends CrudRepository<District, Long>{

}
