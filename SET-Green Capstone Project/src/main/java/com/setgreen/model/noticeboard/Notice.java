package com.setgreen.model.noticeboard;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Entity
public class Notice {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	private String title;
	@Column(length=512)
	private String description;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date create_At;
	@JsonFormat(pattern = "yyyy-MM-dd")
	private Date update_At;
	private String author;
	private String imageurl;

	public Notice() {}; //required for pre-persist/update
	
	@PrePersist
	protected void onCreate(){
		this.create_At = new Date();
	}


	@PreUpdate
	protected void onUpdate(){
		this.update_At = new Date();
	}
}
