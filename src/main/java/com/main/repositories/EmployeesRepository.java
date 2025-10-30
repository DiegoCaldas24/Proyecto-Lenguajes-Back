package com.main.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.main.models.EmployeesModel;


@Repository
public interface EmployeesRepository extends JpaRepository<EmployeesModel, Long> {
    
}
