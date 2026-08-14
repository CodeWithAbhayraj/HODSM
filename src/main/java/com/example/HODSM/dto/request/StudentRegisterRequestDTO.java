package com.example.HODSM.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StudentRegisterRequestDTO {

    @NotBlank(message = "Full Name is required")
    @Size(min = 5, max = 50, message = "Full Name must be between 5 and 50 characters")
    @Pattern(
            regexp = "^[A-Za-z ]+$",
            message = "Full Name can contain only letters and spaces"
    )
    private String fullName;

    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    private String email;

    @NotBlank(message = "Mobile Number is required")
    @Pattern(
            regexp = "^[6-9][0-9]{9}$",
            message = "Mobile Number must be exactly 10 digits"
    )
    private String mobile;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 15,
            message = "Password must be between 8 and 15 characters")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=!]).{8,15}$",
            message = "Password must contain uppercase, lowercase, number and special character"
    )
    private String password;

}