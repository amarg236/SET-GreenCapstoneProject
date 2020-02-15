package com.setgreen.setgreen.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import javax.persistence.Id;

import lombok.Data;

@Data
@Entity
public class District implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 26637590832680761L;
	//@GeneratedValue(strategy = GenerationType.IDENTITY)
    //private Long id;
	@Id
    private String districtName;
}
