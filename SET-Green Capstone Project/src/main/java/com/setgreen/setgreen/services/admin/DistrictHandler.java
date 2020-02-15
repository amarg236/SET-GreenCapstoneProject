package com.setgreen.setgreen.services.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.repositories.DistrictRepo;

/**
 * @author Brendon LeBaron
 *
 */
public class DistrictHandler {
	@Autowired
	DistrictRepo dr;
	public ResponseBody saveDistrict(District d){
		try {
			dr.save(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Created new District", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.CONFLICT.value(), "Could not create district!", d);
		}
	}
	public ResponseBody deleteDistrict(District d) {
		try {
			dr.delete(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Removed District", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.CONFLICT.value(), "Could not delete district!", d);
		}
	}
}
