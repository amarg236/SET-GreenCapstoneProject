package com.setgreen.setgreen.services.implementation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;
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
	
	public ResponseBody<BadDay> saveBadDay(BadDay d) {
		try {
			bdr.save(d);
			return new ResponseBody<BadDay>(HttpStatus.ACCEPTED.value(), "Saved Day", d);
		}
		catch(Exception e) {
			return new ResponseBody<BadDay>(HttpStatus.EXPECTATION_FAILED.value(), "Could not save day: "+ e, d);
		}
	}
	
	public ResponseBody<BadDay> deleteBadDay(BadDay d) {
		try {
			BadDay bd = bdr.findById(d.getId()).get();
			bdr.delete(d);
			return new ResponseBody<BadDay>(HttpStatus.ACCEPTED.value(), "Deleted Day", bd);
		}
		catch(Exception e) {
			return new ResponseBody<BadDay>(HttpStatus.EXPECTATION_FAILED.value(), "Could not delete day", d);
		}
	}
	
	public ResponseBody<IdealDay> saveIdealDay(IdealDay d) {
		try {
			idr.save(d);
			return new ResponseBody<IdealDay>(HttpStatus.ACCEPTED.value(), "Saved Day", d);
		}
		catch(Exception e) {
			return new ResponseBody<IdealDay>(HttpStatus.EXPECTATION_FAILED.value(), "Could not save day"+e, d);
		}
	}
	
	public ResponseBody<IdealDay> deleteIdealDay(IdealDay d) {
		try {
			IdealDay id = idr.findById(d.getId()).get();
			idr.delete(d);
			return new ResponseBody<IdealDay>(HttpStatus.ACCEPTED.value(), "Deleted Day", id);
		}
		catch(Exception e) {
			return new ResponseBody<IdealDay>(HttpStatus.EXPECTATION_FAILED.value(), "Could not delete day", d);
		}
	}
	
	public ResponseBody<EventDay> saveEventDay(EventDay d) {
		try {
			edr.save(d);
			return new ResponseBody<EventDay>(HttpStatus.ACCEPTED.value(), "Saved Day", d);
		}
		catch(Exception e) {
			return new ResponseBody<EventDay>(HttpStatus.EXPECTATION_FAILED.value(), "Could not save day", d);
		}
	}
	
	public ResponseBody<EventDay> deleteEventDay(EventDay d) {
		try {
			EventDay ed = edr.findById(d.getId()).get();
			edr.delete(d);
			return new ResponseBody<EventDay>(HttpStatus.ACCEPTED.value(), "Deleted Day", ed);
		}
		catch(Exception e) {
			return new ResponseBody<EventDay>(HttpStatus.EXPECTATION_FAILED.value(), "Could not delete day", d);
		}
	}

	@Override
	public ResponseBody<Iterable<IdealDay>> findIdealDays(Teams t) {
		return new ResponseBody<Iterable<IdealDay>>(HttpStatus.ACCEPTED.value(), "Ideal Days", idr.findByTm_Id(t.getId()));
	}

	@Override
	public ResponseBody<Iterable<IdealDay>> findIdealDays() {
		return new ResponseBody<Iterable<IdealDay>>(HttpStatus.ACCEPTED.value(), "Ideal Days", idr.findAll());
	}

	@Override
	public ResponseBody<Iterable<BadDay>> findBadDays(Teams t) {
		return new ResponseBody<Iterable<BadDay>>(HttpStatus.ACCEPTED.value(), "Bad Days", bdr.findByTm_Id(t.getId()));
	}

	@Override
	public ResponseBody<Iterable<BadDay>> findBadDays() {
		return new ResponseBody<Iterable<BadDay>>(HttpStatus.ACCEPTED.value(), "Bad Days", bdr.findAll());
	}
	
	@Override
	public ResponseBody<Iterable<EventDay>> findEventDays(){
		return new ResponseBody<Iterable<EventDay>>(HttpStatus.ACCEPTED.value(), "Event Days", edr.findAll());
	}
	
}
