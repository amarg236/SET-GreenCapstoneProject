package com.setgreen.setgreen.model.scheduling;

import java.util.Date;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.setgreen.setgreen.model.Teams;

import lombok.Data;

/**
 * @author Brendon
 *Days that are good for a team
 */
@Data
@Entity
public class IdealDay{

	private Date dte;
	@ManyToMany()
	private Set<Teams> tm;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
}
