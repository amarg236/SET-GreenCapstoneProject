package com.setgreen.setgreen.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

/**
 * @author Brendon LeBaron
 *	The Game object.
 */
@Data
@Entity
//@IdClass(Teams.class)
public class Game implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4946784525722445495L;
	String hometeam;
	String homedistrict;
	String awayteam;//TODO verifiy this, most likely using setter methods.
	String awaydistrict;
	/*
	@ManyToOne(optional=false)
	Teams hometeam;
	
	@ManyToOne(optional=false)
	Teams awayteam;
	@JsonIgnore
	String internalName;
	@JsonIgnore
	String tmName;
	@JsonIgnore
	String tmClass;
	@JsonIgnore
	Long id;*/
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
	String location;
	String time;
	int duration;
	@JsonIgnore
	boolean approved;
}
