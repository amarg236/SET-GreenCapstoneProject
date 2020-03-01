package com.setgreen.setgreen.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

/**
 * @author Brendon LeBaron
 *	The Game object.
 */
@Data
@Entity
public class Game implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4946784525722445495L;
	String hometeam;
	@OneToOne
	District homedistrict;
	String awayteam;//TODO verify this, most likely using setter methods.
	@OneToOne
	District awaydistrict;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
	String location;
	@JsonFormat(pattern = "yyyy-mm-dd hh:mm")
	Date time;
	int duration;
	boolean approved;
	boolean awayAccepted;
}
