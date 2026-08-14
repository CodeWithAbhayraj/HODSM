package com.example.HODSM.dto.response;

import lombok.Data;

@Data
public class StudentResponseDTO {

    private Long id;

    private String fullName;

    private String email;

    private String mobile;

    // JWT Token
    private String token;
}