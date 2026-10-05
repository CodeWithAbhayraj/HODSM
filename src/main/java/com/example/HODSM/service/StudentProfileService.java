package com.example.HODSM.service;

import com.example.HODSM.dto.request.StudentProfileRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.StudentProfileResponseDTO;

import java.io.IOException;

public interface StudentProfileService {

    StudentProfileResponseDTO createProfile(Long studentId,
            StudentProfileRequestDTO requestDTO) throws IOException;

    StudentProfileResponseDTO updateProfile( Long studentId,
            StudentProfileRequestDTO requestDTO) throws IOException;

    StudentProfileResponseDTO getProfile(Long studentId);

    ApiResponseDTO submitForVerification(Long studentId);


}