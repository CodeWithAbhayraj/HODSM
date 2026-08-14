package com.example.HODSM.dto.request;

import jakarta.validation.constraints.*;
import com.example.HODSM.enums.Department;
import org.springframework.web.multipart.MultipartFile;
import lombok.Data;

import java.time.LocalDate;
import java.time.Year;

@Data
public class StudentProfileRequestDTO {

    @NotBlank(message = "PRN is required")
    @Pattern(regexp = "^\\d{10}$", message = "PRN must be exactly 10 digits")
    private String prn;

    @NotBlank(message = "Roll Number is required")
    private String rollNo;

    @NotNull(message = "Department is required")
    private Department department;

    @NotNull(message = "Semester is required")
    @Min(value = 1, message = "Semester must be at least 1")
    @Max(value = 8, message = "Semester cannot be greater than 8")
    private Integer semester;

    @NotNull(message = "Admission Year is required")
    @Min(value = 2000, message = "Invalid Admission Year")
    @Max(value = 2100, message = "Invalid Admission Year")
    private Integer admissionYear;

    @NotNull(message = "Date of Birth is required")
    @Past(message = "DOB must be in the past")
    private LocalDate dob;

    @NotBlank(message = "Gender is required")
    private String gender;

    @NotBlank(message = "Address is required.")
    @Size(min = 10, max = 200,
            message = "Address must contain between 10 and 200 characters.")
    private String address;

    private MultipartFile photo;


    @Pattern(regexp = "^\\d{12}$", message = "Aadhaar Number must be exactly 12 digits.")
    private String aadhaar;

//    @Size(max = 20, message = "College ID cannot exceed 20 characters")
//    private String collegeId;


    // Dynamic Validation
    @AssertTrue(message = "Admission Year must be current year or previous 2 years only")
    public boolean isAdmissionYearValid() {

        if (admissionYear == null) {
            return true;
        }

        int currentYear = Year.now().getValue();

        return admissionYear >= currentYear - 2
                && admissionYear <= currentYear;
    }

}

