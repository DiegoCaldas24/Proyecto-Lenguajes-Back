package com.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ReportsController {
    @GetMapping("/reports")
    public String reports(){
        return "reports.html";
    }
}
