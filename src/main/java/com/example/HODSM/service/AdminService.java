package com.example.HODSM.service;

import com.example.HODSM.dto.request.AdminLoginRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.DashboardResponseDTO;
import com.example.HODSM.dto.response.StudentProfileResponseDTO;

import java.util.List;

public interface AdminService {

    ApiResponseDTO login(AdminLoginRequestDTO requestDTO);

    DashboardResponseDTO getDashboard();

    List<StudentProfileResponseDTO> getPendingRequests();

    StudentProfileResponseDTO getStudentProfile(Long profileId);

    ApiResponseDTO approveStudent(Long profileId);

    ApiResponseDTO rejectStudent(Long profileId);

    List<StudentProfileResponseDTO> searchStudent(String keyword);

}