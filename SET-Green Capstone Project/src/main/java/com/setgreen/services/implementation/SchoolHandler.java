package com.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.model.District;
import com.setgreen.model.ResponseBody;
import com.setgreen.model.School;
import com.setgreen.repositories.DistrictRepo;
import com.setgreen.repositories.SchoolRepo;
@Service
public class SchoolHandler {
	
	@Autowired
	SchoolRepo sr;
	@Autowired
	DistrictRepo dr;
	
	/**
	 * @return All schools in the database
	 */
	public ResponseBody<Iterable<School>> getAllSchools(){
		return new ResponseBody<Iterable<School>>(HttpStatus.ACCEPTED.value(), "Schools Found", sr.findAll());
	}
	
	/**
	 * @param d district to search
	 * @return Response body with all schools in a district
	 */
	public ResponseBody<Iterable<School>> getAllSchoolsInDistrict(District d){
		return new ResponseBody<Iterable<School>>(HttpStatus.ACCEPTED.value(), "Schools Found", sr.findByDistrict_Id(d.getId()));
	}
	
	/**adds a school
	 * @return responsebody with status of request
	 */
	public ResponseBody<School> addSchool(School s) {
		try {
			sr.save(s);
			return new ResponseBody<School>(HttpStatus.ACCEPTED.value(), "School Added!", s);
		}
		catch(Exception e) {
			return new ResponseBody<School>(HttpStatus.CONFLICT.value(), "Did not save school!"+e.getLocalizedMessage(), s);
		}
	}
	
	/**removes a school
	 * @return responsebody with status of request
	 */
	public ResponseBody<School> deleteSchool(School s) {
		try {
			sr.delete(s);
			return new ResponseBody<School>(HttpStatus.ACCEPTED.value(), "School Removed!", s);
		}
		catch(Exception e) {
			return new ResponseBody<School>(HttpStatus.CONFLICT.value(), "Did not remove school!", s);
		}
	}
}
