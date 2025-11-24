package com.main.repositories;

import com.main.models.AttendanceModel;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<AttendanceModel, Integer> {
    @Override
    <S extends AttendanceModel> S save(S employee);

    Optional<AttendanceModel> findByEmployees_IdEmployee(int idEmployee);

    Optional<AttendanceModel> findByEmployees_Dni(String dniEmployee);

    @Transactional
    @Modifying
    @Query(value = "UPDATE attendances a SET a.departure_date = :departureDate WHERE a.id_employee = :idEmployee", nativeQuery = true)
    void saveDepartureDate(@Param("departureDate") LocalDateTime departureDate, @Param("idEmployee") int idEmployee);
}
