package com.tst;

import org.springframework.data.repository.CrudRepository;
import com.tst.SqlTest; //Importing our object to be stored
//This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
//CRUD refers Create, Read, Update, Delete
public interface SqlRepository extends CrudRepository<SqlTest, Integer>{

}
