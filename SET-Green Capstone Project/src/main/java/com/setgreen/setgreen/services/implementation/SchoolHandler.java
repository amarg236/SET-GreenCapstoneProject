package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.School;
import com.setgreen.setgreen.repositories.DistrictRepo;
import com.setgreen.setgreen.repositories.SchoolRepo;
@Service
public class SchoolHandler {
	
	@Autowired
	SchoolRepo sr;
	@Autowired
	DistrictRepo dr;
	
	/**adds a school
	 * @return responsebody with status of request
	 */
	public ResponseBody addSchool(School s) {
		try {
			sr.save(s);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "School Added!", s);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.CONFLICT.value(), "Did not save school!"+e.getLocalizedMessage(), s);
		}
	}
	
	/**removes a school
	 * @return responsebody with status of request
	 */
	public ResponseBody deleteSchool(School s) {
		try {
			sr.delete(s);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "School Removed!", s);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.CONFLICT.value(), "Did not remove school!", s);
		}
	}
}
