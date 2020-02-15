package com.setgreen.setgreen.model.scheduling;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotEmpty;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.setgreen.setgreen.model.Teams;

/**
 * @author Brendon
 *Days that are good for a team
 */
@Entity
@IdClass(Teams.class)
public class IdealDay{
	@Id
	@JsonIgnore
	@NotEmpty(message = "Must have date")
	private String dte;
	@Id
	@ManyToOne()
	Teams tm;
	String internalName;
	String tmName;
	String tmClass;
	Long id;
}
