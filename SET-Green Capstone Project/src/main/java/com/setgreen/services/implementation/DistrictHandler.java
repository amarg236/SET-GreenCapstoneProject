package com.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.model.District;
import com.setgreen.model.ResponseBody;
import com.setgreen.repositories.DistrictRepo;

/**
 * @author Brendon LeBaron
 *
 */
@Service
public class DistrictHandler {
	@Autowired
	DistrictRepo dr;
	public ResponseBody<District> saveDistrict(District d){//TODO: District uniqueness
		try {
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
	public ResponseBody<Iterable<District>> getAll() {
		try {
			return new ResponseBody<Iterable<District>>(HttpStatus.ACCEPTED.value(), "Found districts", dr.findAll());
		}
		catch(Exception e) {
			return new ResponseBody<Iterable<District>>(500, "Error looking up districts", null);
		}
	}
}
