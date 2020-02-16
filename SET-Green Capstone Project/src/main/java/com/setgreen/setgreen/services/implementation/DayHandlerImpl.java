package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;
import com.setgreen.setgreen.repositories.scheduling.BadDayRepo;
import com.setgreen.setgreen.repositories.scheduling.EventDayRepo;
import com.setgreen.setgreen.repositories.scheduling.IdealDayRepo;
import com.setgreen.setgreen.services.DayHandler;

@Service
public class DayHandlerImpl implements DayHandler{
	@Autowired
	BadDayRepo bdr;
	@Autowired
	IdealDayRepo idr;
	@Autowired
	EventDayRepo edr;
	
	public ResponseBody saveBadDay(BadDay d) {
		try {
			bdr.save(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Saved Day", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.EXPECTATION_FAILED.value(), "Could not save day", d);
		}
	}
	
	public ResponseBody deleteBadDay(BadDay d) {
		try {
			bdr.delete(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Deleted Day", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.EXPECTATION_FAILED.value(), "Could not delete day", d);
		}
	}
	
	public ResponseBody saveIdealDay(IdealDay d) {
		try {
			idr.save(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Saved Day", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.EXPECTATION_FAILED.value(), "Could not save day", d);
		}
	}
	
	public ResponseBody deleteIdealDay(IdealDay d) {
		try {
			idr.delete(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Deleted Day", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.EXPECTATION_FAILED.value(), "Could not delete day", d);
		}
	}
	
	public ResponseBody saveEventDay(EventDay d) {
		try {
			edr.save(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Saved Day", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.EXPECTATION_FAILED.value(), "Could not save day", d);
		}
	}
	
	public ResponseBody deleteEventDay(EventDay d) {
		try {
			edr.delete(d);
			return new ResponseBody(HttpStatus.ACCEPTED.value(), "Deleted Day", d);
		}
		catch(Exception e) {
			return new ResponseBody(HttpStatus.EXPECTATION_FAILED.value(), "Could not delete day", d);
		}
	}
}
