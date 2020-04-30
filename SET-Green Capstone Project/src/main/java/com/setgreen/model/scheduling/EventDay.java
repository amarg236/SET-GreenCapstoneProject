package com.setgreen.model.scheduling;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
@Data
@Entity
public class EventDay {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	Long id;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private Date dte;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private Date endDate;
	private String reason;
}
