package com.setgreen.model.scheduling;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
@Data
@Entity
public class EventDay {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	Long id;
	@JsonIgnore
	@NotEmpty(message = "Must have start date")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private Date dte;
	@NotEmpty(message = "Must have end date")
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	private Date endDate;
	@JsonIgnore
	private String reason;
}
