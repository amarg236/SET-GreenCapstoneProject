package com.setgreen.setgreen.model.scheduling;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;
import com.fasterxml.jackson.annotation.JsonIgnore;

public abstract class EventDay {
	@JsonIgnore
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	Long id;
	@JsonIgnore
	@NotEmpty(message = "Must have date")
	private String dte;
	@JsonIgnore
	private String reason;
}
