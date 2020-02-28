package com.setgreen.setgreen.services.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.repositories.DistrictRepo;

/**
 * @author Brendon LeBaron
 *
 */
@Service
public class DistrictHandler {
	@Autowired
	DistrictRepo dr;
	public ResponseBody<District> saveDistrict(District d){
		try {
			System.out.println(dr.toString());
			dr.save(d);
			return new ResponseBody<District>(HttpStatus.ACCEPTED.value(), "Created new District", d);
		}
		catch(Exception e) {
			return new ResponseBody<District>(HttpStatus.CONFLICT.value(), "Could not create district: "+e, d);
		}
	}
	public ResponseBody<District> deleteDistrict(District d) {
		try {
			dr.delete(d);
			return new ResponseBody<District>(HttpStatus.ACCEPTED.value(), "Removed District", d);
		}
		catch(Exception e) {
			return new ResponseBody<District>(HttpStatus.CONFLICT.value(), "Could not delete district!", d);
		}
	}
}
