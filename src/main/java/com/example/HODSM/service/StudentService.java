package com.example.HODSM.service;

import com.example.HODSM.dto.request.StudentLoginRequestDTO;
import com.example.HODSM.dto.request.StudentRegisterRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.StudentResponseDTO;

public interface StudentService {

    StudentResponseDTO registerStudent(StudentRegisterRequestDTO requestDTO);

    StudentResponseDTO loginStudent(StudentLoginRequestDTO requestDTO);

    StudentResponseDTO getStudentById(Long studentId);

    ApiResponseDTO deleteStudent(Long studentId);

}