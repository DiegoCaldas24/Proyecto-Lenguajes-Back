package com.main.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Builder
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "attendances")
public class AttendanceModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idAttendance;

    @ManyToOne
    @JoinColumn(name = "id_employee")
    private EmployeesModel employees;

    @Column(name = "entry_date")
    private LocalDateTime entryDate;

    @Column(name = "departure_date")
    private LocalDateTime departureDate;

    @Column(name = "status")
    private String status;

}
