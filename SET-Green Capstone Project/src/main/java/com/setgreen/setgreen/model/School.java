package com.setgreen.setgreen.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;

import lombok.Data;
@Data
@Entity
@IdClass(District.class)
public class School implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = -6812103661282005921L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

	@ManyToOne(optional=false)
	private District districtName;
	@Id
	private String name;
	private String address;
}
