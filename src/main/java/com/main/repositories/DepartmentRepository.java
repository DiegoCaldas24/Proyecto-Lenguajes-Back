package com.main.repositories;

import com.main.models.DepartmentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DepartmentRepository extends JpaRepository<DepartmentModel, Integer> {
    List<DepartmentModel> findAll();
}
