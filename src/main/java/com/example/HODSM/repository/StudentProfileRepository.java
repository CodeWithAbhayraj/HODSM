package com.example.HODSM.repository;

import com.example.HODSM.entity.Student;
import com.example.HODSM.entity.StudentProfile;
import com.example.HODSM.enums.VerificationStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {

    Optional<StudentProfile> findByStudent(Student student);

    Optional<StudentProfile> findByPrn(String prn);

    Optional<StudentProfile> findByRollNo(String rollNo);

    List<StudentProfile> findByStatus(VerificationStatus status);


    boolean existsByPrn(String prn);

    boolean existsByRollNo(String rollNo);

    List<StudentProfile> findByDepartment(String department);

}