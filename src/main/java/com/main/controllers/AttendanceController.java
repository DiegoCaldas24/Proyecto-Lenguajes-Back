package com.main.controllers;

import com.main.models.AttendanceModel;
import com.main.models.EmployeesModel;
import com.main.services.AttendanceService;
import com.main.services.EmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/registerAttendance")
public class AttendanceController {

    private final AttendanceService attendanceService;
    private final EmployeesService employeesService;

    @Autowired
    public AttendanceController(AttendanceService attendanceService, EmployeesService employeesService) {
        this.attendanceService = attendanceService;
        this.employeesService = employeesService;
    }

    @GetMapping
    public String register(){
        return "attendance";
    }

    @PostMapping("/attendance")
    public String saveEntryDate(
            @RequestParam("dni") String dniEmployee,
            RedirectAttributes redirectAttributes){
        if(attendanceService.saveAttendance(dniEmployee)){
            redirectAttributes.addFlashAttribute("message", "Se marco el registro correctamente");
        }else{
            redirectAttributes.addFlashAttribute("message", "Ocurrio un error al regsitrar");
        }
        return "redirect:/registerAttendance";
    }
}
