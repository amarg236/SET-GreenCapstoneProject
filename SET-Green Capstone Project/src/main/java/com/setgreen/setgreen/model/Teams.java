package com.setgreen.setgreen.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;


import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Brendon
 *	Data structure for teams
 *	Uses tmName = name of team, tmClass = teams classification, internalName = internal name of team 
 */
@Entity
public class Teams {
	@JsonIgnore
	@NotEmpty(message = "Must have a team name")
	@Column(length = 50)
	private String tmName; //Good (display) name
	
	@JsonIgnore
	@NotEmpty(message = "Must have a team classification")
	@Column(length = 50)
	private String tmClass; //Type of team (varsity, jr, ext)
	
	@Id
	@JsonIgnore
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@JsonIgnore
	@Column(length=50)
	private String internalName;//internal name for teams for dumping to XML
}
