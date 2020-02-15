package com.setgreen.setgreen.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;

/**
 * @author Brendon LeBaron
 *	The Game object.
 */
@Data
@Entity
@IdClass(Teams.class)
public class Game implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4946784525722445495L;
	
	@ManyToOne(optional=false)

	Teams hometeam;
	
	@ManyToOne(optional=false)
	Teams awayteam;
	String internalName;
	String tmName;
	String tmClass;
	Long id;
	@Id
	String location;
	@Id
	String time;
	int duration;
	boolean approved;
}
