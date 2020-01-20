package com.setgreen.setgreencapstoneproject.model;

import lombok.Data;
import org.hibernate.annotations.NaturalId;


import javax.persistence.*;

@Data
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 20)
    private RoleName role;

    public Role() {
    }

    public Role(RoleName name)
    {
        this.role = name;
    }
}
