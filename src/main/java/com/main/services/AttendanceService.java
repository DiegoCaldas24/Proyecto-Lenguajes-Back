package com.main.services;

import com.main.models.AttendanceModel;
import com.main.models.EmployeesModel;
import com.main.repositories.AttendanceRepository;
import com.main.repositories.EmployeesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AttendanceService{

    private final AttendanceRepository attendanceRepository;
    private final EmployeesRepository employeesRepository;

    @Autowired
    public AttendanceService(AttendanceRepository attendanceRepository, EmployeesRepository employeesRepository) {
        this.attendanceRepository = attendanceRepository;
        this.employeesRepository = employeesRepository;
    }

    public boolean saveAttendance(String dniEmployee) {
        try{
            AttendanceModel employee =  attendanceRepository.findByEmployees_Dni(dniEmployee).orElse(null);
            if(employee == null){
                AttendanceModel attendanceModel = new AttendanceModel();
                attendanceModel.setEmployees(employeesRepository.findByDni(dniEmployee).get());
                attendanceModel.setEntryDate(LocalDateTime.now());
                attendanceRepository.save(attendanceModel);
                return true;
            }else{
                employee.setDepartureDate(LocalDateTime.now());
                attendanceRepository.save(employee);
                return true;
            }
        }catch(Exception e){
            return false;
        }
    }

    public Optional<AttendanceModel> findByIdEmployee(int dniEmployee) {
        return attendanceRepository.findByEmployees_IdEmployee(dniEmployee);
    }
}