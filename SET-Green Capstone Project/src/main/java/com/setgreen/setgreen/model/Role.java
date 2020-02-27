package com.setgreen.setgreen.model;

import lombok.Data;
import org.hibernate.annotations.NaturalId;

import javax.persistence.*;

@Data
@Entity
public class Role {

    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    
    
    private String userEmail;//FIXME enforce through code
    
    private String districtName;//FIXME Enforce districts through code
    //@ManyToOne
    //private School school;
//    @ManyToOne(cascade = CascadeType.ALL)
//    private User user;
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private RoleName role;

    public Role() {
    }

    public Role(RoleName name) {
        this.role = name;
    }
}
