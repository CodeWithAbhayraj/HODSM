package com.example.HODSM.controller;

import com.example.HODSM.dto.request.StudentLoginRequestDTO;
import com.example.HODSM.dto.request.StudentRegisterRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.StudentResponseDTO;
import com.example.HODSM.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @PostMapping("/register")
    public ResponseEntity<StudentResponseDTO> registerStudent(
            @Valid @RequestBody StudentRegisterRequestDTO requestDTO) {

        return new ResponseEntity<>(
                studentService.registerStudent(requestDTO),
                HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<StudentResponseDTO> loginStudent(
            @Valid @RequestBody StudentLoginRequestDTO requestDTO) {

        return ResponseEntity.ok(studentService.loginStudent(requestDTO));
    }

    @GetMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> getStudentById(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(studentService.getStudentById(studentId));
    }

    @DeleteMapping("/{studentId}")
    public ResponseEntity<ApiResponseDTO> deleteStudent(
            @PathVariable Long studentId) {

        return ResponseEntity.ok(studentService.deleteStudent(studentId));
    }

}