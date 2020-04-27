package com.setgreen.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

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
	Long hometeamId;
	Long awayteamId;
	String hometeam;
	@OneToOne
	District homedistrict;
	String awayteam;
	@OneToOne
	District awaydistrict;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
	String location;
	@JsonFormat(pattern = "yyyy-MM-dd HH:mm")
	Date time;
	int duration;
	String uRequester;
	String uAcceptor;
	String uApprover;
	boolean approved;
	boolean awayAccepted;
	boolean rejected;
	boolean homeNotification;
	boolean awayNotification;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date create_At;

    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date update_At;

	//Constructor required for the persist and update annotations to work.
    public Game(){};
    
	@PrePersist
    protected void onCreate(){
        this.create_At = new Date();
    }


    @PreUpdate
    protected void onUpdate(){
        this.update_At = new Date();
    }
}




