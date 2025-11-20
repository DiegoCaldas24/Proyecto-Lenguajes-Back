package com.main.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.main.models.EmployeesModel;

@Controller
public class EmployeesController {

    @GetMapping("/")
    public String home() {
        return "dashboard.html";
    }
}
