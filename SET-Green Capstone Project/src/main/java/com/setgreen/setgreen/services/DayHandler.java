package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.District;
import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.Teams;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.EventDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;

public interface DayHandler {

	ResponseBody<IdealDay> saveIdealDay(IdealDay d);

	ResponseBody<Iterable<IdealDay>> findIdealDays(Teams t);
	
	ResponseBody<Iterable<IdealDay>> findIdealDays();
	
	ResponseBody<IdealDay> deleteIdealDay(IdealDay d);
	
	ResponseBody<BadDay> deleteBadDay(BadDay d);

	ResponseBody<BadDay> saveBadDay(BadDay d);

	ResponseBody<Iterable<BadDay>> findBadDays(Teams t);
	
	ResponseBody<Iterable<BadDay>> findBadDays();
	
	ResponseBody<Iterable<EventDay>> findEventDays();
	
	//ResponseBody<Iterable<EventDay>> findEventDays(District d); //XXX we should add districts to event days
	
	ResponseBody<EventDay> saveEventDay(EventDay d);
	
	ResponseBody<EventDay> deleteEventDay(EventDay d);
}
