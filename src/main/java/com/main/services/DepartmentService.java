package com.main.services;

import com.main.models.DepartmentModel;
import com.main.repositories.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<DepartmentModel> getAllDepartments(){
        return departmentRepository.findAll();
    }
}
