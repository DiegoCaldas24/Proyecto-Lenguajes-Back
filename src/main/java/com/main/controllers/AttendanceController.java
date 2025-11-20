package com.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AttendanceController {
    @GetMapping("/registerAttendance")
    public String register(){
        return "attendance.html";
    }
}
