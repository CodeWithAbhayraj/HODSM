package com.example.HODSM.controller;

import com.example.HODSM.dto.request.StudentProfileRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.StudentProfileResponseDTO;
import com.example.HODSM.service.StudentProfileService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/profile")
public class StudentProfileController {

    private final StudentProfileService studentProfileService;

    public StudentProfileController(StudentProfileService studentProfileService) {
        this.studentProfileService = studentProfileService;
    }

    @PostMapping(value = "/{studentId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<StudentProfileResponseDTO> createProfile(
            @PathVariable Long studentId,
            @ModelAttribute StudentProfileRequestDTO requestDTO
    )
            throws IOException {
        return ResponseEntity.ok(
                studentProfileService.createProfile(studentId, requestDTO)
        );
    }

    @PutMapping(value = "/{studentId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<StudentProfileResponseDTO> updateProfile(
            @PathVariable Long studentId,
            @ModelAttribute StudentProfileRequestDTO requestDTO
    )
            throws IOException
        {
        return ResponseEntity.ok(
                studentProfileService.updateProfile(studentId, requestDTO)
        );
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentProfileResponseDTO> getProfile(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                studentProfileService.getProfile(studentId));
    }

    @PostMapping("/submit/{studentId}")
    public ResponseEntity<ApiResponseDTO> submitProfile(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(
                studentProfileService.submitForVerification(studentId));
    }

}