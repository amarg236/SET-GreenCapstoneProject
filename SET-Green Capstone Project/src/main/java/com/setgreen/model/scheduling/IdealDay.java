package com.setgreen.model.scheduling;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.setgreen.model.Teams;

import lombok.Data;

/**
 * @author Brendon
 *Days that are good for a team
 */
@Data
@Entity
public class IdealDay{

	private Date dte;
	@ManyToOne
	private Teams tm;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
}
