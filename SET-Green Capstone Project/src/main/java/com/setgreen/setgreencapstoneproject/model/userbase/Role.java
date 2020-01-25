package com.setgreen.setgreencapstoneproject.model.userbase;

import lombok.Data;
import org.hibernate.annotations.NaturalId;

import com.setgreen.setgreencapstoneproject.model.RoleName;

import javax.persistence.*;

@Data
@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
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
