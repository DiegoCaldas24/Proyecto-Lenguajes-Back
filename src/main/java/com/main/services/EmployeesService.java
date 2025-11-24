package com.main.services;

import com.main.models.EmployeesModel;
import com.main.repositories.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeesService{

    private final EmployeesRepository employeesRepository;

    @Autowired
    public EmployeesService(EmployeesRepository employeesRepository) {
        this.employeesRepository = employeesRepository;
    }

    public List<EmployeesModel> getAllEmployess(){
        return employeesRepository.findAll();
    }

    public void saveEmployee(EmployeesModel employeesModel){
        employeesRepository.save(employeesModel);
    }
}
