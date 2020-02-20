package com.setgreen.setgreen.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotEmpty;


import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * @author Brendon
 *	Data structure for teams
 *	Uses tmName = name of team, tmClass = teams classification, internalName = internal name of team 
 */
@Data
@Entity
public class Teams implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -877221888835515046L;

	@NotEmpty(message = "Must have a team name")
	@Column(length = 50)
	private String tmName; //Good (display) name
	
	@NotEmpty(message = "Must have a team classification")
	@Column(length = 50)
	private String tmClass; //Type of team (varsity, jr, ext)
	
	@Id
	@JsonIgnore
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(length=50)
	private String internalName;//internal name for teams for dumping to XML
	
	public Teams() {}
	
	public Teams(long tid, String tclass, String tname, String tiname) {
		id=tid;
		tmClass=tclass;
		tmName=tname;
		internalName=tiname;
	}
}