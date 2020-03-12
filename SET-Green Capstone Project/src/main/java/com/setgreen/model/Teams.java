package com.setgreen.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotEmpty;

import com.setgreen.model.scheduling.BadDay;
import com.setgreen.model.scheduling.IdealDay;

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

	@ManyToOne()
	private School school;
	@OneToMany
	private Set<IdealDay> idealDays;
	@OneToMany
	private Set<BadDay> badDays;
	@NotEmpty(message = "Must have a team name")
	@Column(length = 50)
	private String tmName; //Good (display) name
	
	@NotEmpty(message = "Must have a team classification")
	@Column(length = 50)
	private String tmClass; //Type of team (varsity, jr, ext)
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(length=50)
	private String internalName;//internal name for teams for dumping to XML
	
	public Teams() {}

	public Teams(String tmName, String tmClass, long id, String internalName) {
		super();
		this.tmName = tmName;
		this.tmClass = tmClass;
		this.id = id;
		this.internalName = internalName;
	}
	
}
