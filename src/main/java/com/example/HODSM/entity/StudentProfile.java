package com.example.HODSM.entity;

import com.example.HODSM.enums.VerificationStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import com.example.HODSM.enums.Department;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    @Column(nullable = false, unique = true)
    private String prn;

    @Column(nullable = false, unique = true)
    private String rollNo;

    @Enumerated(EnumType.STRING)

    private Department department;

    @Column(nullable = false)
    private Integer semester;

    @Column(nullable = false)
    private Integer admissionYear;

    @Column(nullable = false)
    private LocalDate dob;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false, length = 500)
    private String address;

    private String photo;

    private String aadhaar;

    private String collegeId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VerificationStatus status;

    private String remarks;

    private LocalDateTime submittedAt;

    private LocalDateTime verifiedAt;
}