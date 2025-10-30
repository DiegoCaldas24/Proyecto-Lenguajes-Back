package com.main.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EmployeesModel {
    @Id
    private Long id;
    private String fullname;
    private String position;
    private String departament;
    private boolean isActive;
     private String email;
    private String phone;
    private int salary;
    private String direction;
}
