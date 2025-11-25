package com.main.controllers;

import com.main.models.UserModel;
import com.main.security.UserDetails;
import com.main.services.AttendanceService;
import com.main.services.EmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/dashboard")
public class DashboardController {
    private final AttendanceService attendanceService;
    private final EmployeesService employeesService;

    @Autowired
    public DashboardController(EmployeesService employeesService, AttendanceService attendanceService) {
        this.employeesService = employeesService;
        this.attendanceService = attendanceService;
    }

    @GetMapping()
    public String home(Model model, @AuthenticationPrincipal UserDetails user) {
        UserModel userLoged = user.getUserModel();
        model.addAttribute("count", employeesService.countEmployees());
        model.addAttribute("assistance", attendanceService.findAllRegisters());
        model.addAttribute("attendanceWell", attendanceService.getCountAttendaceWell());
        model.addAttribute("attendanceMid", attendanceService.getCountAttendaceMid());
        model.addAttribute("attendanceBad", attendanceService.getCountAttendaceBad());
        model.addAttribute("userName", userLoged.getEmployee().getNames());
        return "dashboard";
    }
}
