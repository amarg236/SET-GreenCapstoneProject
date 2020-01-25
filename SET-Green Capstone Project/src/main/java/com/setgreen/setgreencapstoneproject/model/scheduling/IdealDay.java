package com.setgreen.setgreencapstoneproject.model.scheduling;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Brendon
 *Days that are good for a team
 */
@Entity
public class IdealDay{
	@JsonIgnore
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	Long id;
	@JsonIgnore
	@NotEmpty(message = "Must have date")
	private String dte;
	@JoinColumn(name = "id", table = "teams")
	long teamId;
}
