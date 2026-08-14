package com.example.HODSM.controller;

import com.example.HODSM.dto.request.AdminLoginRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.DashboardResponseDTO;
import com.example.HODSM.dto.response.StudentProfileResponseDTO;
import com.example.HODSM.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponseDTO> login(
            @Valid @RequestBody AdminLoginRequestDTO requestDTO) {

        return ResponseEntity.ok(adminService.login(requestDTO));
    }

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardResponseDTO> dashboard() {

        return ResponseEntity.ok(adminService.getDashboard());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<StudentProfileResponseDTO>> getPendingRequests() {

        return ResponseEntity.ok(adminService.getPendingRequests());
    }

    @GetMapping("/student/{profileId}")
    public ResponseEntity<StudentProfileResponseDTO> getStudentProfile(
            @PathVariable Long profileId) {

        return ResponseEntity.ok(
                adminService.getStudentProfile(profileId));
    }

    @PutMapping("/approve/{profileId}")
    public ResponseEntity<ApiResponseDTO> approveStudent(
            @PathVariable Long profileId) {

        return ResponseEntity.ok(
                adminService.approveStudent(profileId));
    }

    @PutMapping("/reject/{profileId}")
    public ResponseEntity<ApiResponseDTO> rejectStudent(
            @PathVariable Long profileId) {

        return ResponseEntity.ok(
                adminService.rejectStudent(profileId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<StudentProfileResponseDTO>> searchStudent(
            @RequestParam String keyword) {

        return ResponseEntity.ok(
                adminService.searchStudent(keyword));
    }

}