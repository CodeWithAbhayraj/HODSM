package com.example.HODSM.dto.response;

import com.example.HODSM.enums.VerificationStatus;
import com.example.HODSM.enums.Department;
import lombok.Data;

import java.time.LocalDate;

@Data
public class StudentProfileResponseDTO {

    private Long id;

    private String fullName;

    private String email;

    private String mobile;

    private String prn;

    private String rollNo;

    private Department department;

    private Integer semester;

    private Integer admissionYear;

    private LocalDate dob;

    private String gender;

    private String address;

    private String photo;

    private String aadhaar;

    private String collegeId;

    private VerificationStatus status;

//    private String remarks;

}