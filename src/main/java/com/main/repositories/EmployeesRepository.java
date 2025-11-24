package com.main.repositories;

import com.main.models.DepartmentModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.main.models.EmployeesModel;

import java.util.List;
import java.util.Optional;


@Repository
public interface EmployeesRepository extends JpaRepository<EmployeesModel, Integer> {
    List<EmployeesModel> findAll();

    Optional<EmployeesModel> findByDni(String dniEmployee);

    <S extends EmployeesModel> S save(S employee);
}
