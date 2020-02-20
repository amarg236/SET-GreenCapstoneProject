package com.setgreen.setgreen.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
/**
 * @author Brendon LeBaron
 *	School entity, has: Long Id, District districtName, String name, String address
 */
@Data
@Entity
//@IdClass(District.class) //FIXME FUCKED FORIGN KEY
public class School {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
    private Long id;

	/*@ManyToOne(optional=false)
	@JoinColumn(name="districtName")*/ //FIXME FUCKED FORIGN KEY.
	private String districtName;
	private String name;
	private String address;
}
