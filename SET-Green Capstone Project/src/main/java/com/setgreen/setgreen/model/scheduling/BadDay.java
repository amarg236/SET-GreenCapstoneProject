package com.setgreen.setgreen.model.scheduling;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.setgreen.setgreen.model.Teams;

import lombok.Data;
@Data
@Entity
public class BadDay{
	private Date dte;
	@ManyToOne
	private Teams tm;
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	Long id;
}
