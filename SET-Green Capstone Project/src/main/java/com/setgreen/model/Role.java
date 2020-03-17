package com.setgreen.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;

import lombok.Data;

@Data
@Entity
public class Role {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    @ManyToOne(cascade = CascadeType.ALL)
    private School school;
    @ManyToOne(cascade = CascadeType.ALL)
    private User user;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleName role;

    public Role() {
    }

    public Role(RoleName name) {
        this.role = name;
    }
}
