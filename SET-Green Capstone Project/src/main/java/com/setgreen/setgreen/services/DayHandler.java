package com.setgreen.setgreen.services;

import com.setgreen.setgreen.model.ResponseBody;
import com.setgreen.setgreen.model.scheduling.BadDay;
import com.setgreen.setgreen.model.scheduling.IdealDay;

public interface DayHandler {

	ResponseBody saveIdealDay(IdealDay d);

	ResponseBody deleteBadDay(BadDay d);

	ResponseBody saveBadDay(BadDay d);

	ResponseBody deleteIdealDay(IdealDay d);

}
