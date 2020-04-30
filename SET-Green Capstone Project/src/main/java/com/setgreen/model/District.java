package com.setgreen.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

/**
 * @author Brendon LeBaron
 *	District entity: has String districtName
 */
@Data
@Entity
public class District implements Serializable{
	private static final long serialVersionUID = 26637590832680761L;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String districtName;
}
