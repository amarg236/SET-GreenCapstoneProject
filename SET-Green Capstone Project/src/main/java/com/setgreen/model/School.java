package com.setgreen.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import lombok.Data;
/**
 * @author Brendon LeBaron
 *	School entity, has: Long Id, District districtName, String name, String address
 */
@Data
@Entity
public class School {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@OneToMany()
	private Set<Teams> teams;
	@OneToMany()
	private Set<Role> roles;
	@ManyToOne()
	private District district;
	private String name;
	private String address;
}
