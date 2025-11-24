package com.main.controllers;

import com.main.models.EmployeesModel;
import com.main.services.DepartmentService;
import com.main.services.EmployeesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping("/employees")
public class EmployeesController {

    private final EmployeesService employeesService;
    private final DepartmentService departmentService;

    @Autowired
    public EmployeesController(EmployeesService employeesService,DepartmentService departmentService){
        this.employeesService = employeesService;
        this.departmentService = departmentService;
    }

    @GetMapping()
    public String employees(Model model){
        // Envia toda la data de los empleados
        model.addAttribute("employees",employeesService.getAllEmployess());
        // Envia solo un objeto de tipo employee para que se use posteriormente en el form
        model.addAttribute("employee", new EmployeesModel());
        // Envia toda la data de los departamentos para que se usen dentro del form
        model.addAttribute("departments", departmentService.getAllDepartments());

        return "employees";
    }

    @PostMapping("/save")
    public String saveEmployee(
            @ModelAttribute("employee") EmployeesModel employeesModel,
            RedirectAttributes redirectAttributes){
        try{
            employeesService.saveEmployee(employeesModel);
            redirectAttributes.addFlashAttribute("message", "Se realizo correctamente la accion");
        }catch (Exception e){
            redirectAttributes.addFlashAttribute("message", "Error en la accion");
        }
        return "redirect:/employees";
    }

    @GetMapping("/employee/{idEmployee}")
    @ResponseBody
    public EmployeesModel getEmployee(
            @PathVariable int idEmployee){
        return employeesService.getEmployee(idEmployee).orElse(null);
    }
}
