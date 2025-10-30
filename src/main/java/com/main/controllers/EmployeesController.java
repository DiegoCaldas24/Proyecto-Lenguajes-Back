package com.main.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.models.EmployeesModel;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class EmployeesController {

    @GetMapping("/")
    public String home() {
        return "Welcome to the Employees API";
    }

    @GetMapping("/employees")
    public String getEmployees() {
        return "Employees endpoint";
    }

    @GetMapping("/dataEmployees")
    @CrossOrigin(origins = "http://localhost:5173/empleados")
    public List<EmployeesModel> getDataEmployees() {
        List<EmployeesModel> employees = new ArrayList<>();
        employees.add(
            EmployeesModel.builder()
            .id(1L)
            .fullname("John Doe")
            .position("Developer")
            .departament("IT")
            .isActive(true)
            .email("")
            .build()
            );
        employees.add(
            EmployeesModel.builder()
            .id(2L)
            .fullname("Jane Smith")
            .position("Manager")
            .departament("HR")
            .isActive(true)
            .email("")
            .build()
        );
        return employees;
    }
}
