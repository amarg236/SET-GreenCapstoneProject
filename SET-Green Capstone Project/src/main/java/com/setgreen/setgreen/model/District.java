package com.setgreen.setgreen.model;

import javax.persistence.Entity;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Entity
@Data
public class District {
    @Id
    private String districtName;
}
