package com.example.HODSM.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class AdminLoginRequestDTO {

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

}