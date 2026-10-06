package com.example.HODSM.serviceimpl;

import com.example.HODSM.dto.request.StudentLoginRequestDTO;
import com.example.HODSM.dto.request.StudentRegisterRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.StudentResponseDTO;
import com.example.HODSM.entity.Student;
import com.example.HODSM.enums.Role;
import com.example.HODSM.exception.DuplicateResourceException;
import com.example.HODSM.exception.ResourceNotFoundException;
import com.example.HODSM.repository.StudentRepository;
import com.example.HODSM.security.CustomUserDetailsService;
import com.example.HODSM.security.JwtService;
import com.example.HODSM.service.StudentService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class StudentServiceImpl implements StudentService {

    private final JwtService jwtService;
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;

    public StudentServiceImpl(
            StudentRepository studentRepository,
            ModelMapper modelMapper,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            CustomUserDetailsService customUserDetailsService) {

        this.studentRepository = studentRepository;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    public StudentResponseDTO registerStudent(StudentRegisterRequestDTO requestDTO) {

        // Trim Input
        requestDTO.setFullName(requestDTO.getFullName().trim());
        requestDTO.setEmail(requestDTO.getEmail().trim());
        requestDTO.setMobile(requestDTO.getMobile().trim());

        // Duplicate Full Name
        if (studentRepository.existsByFullName(requestDTO.getFullName())) {
            throw new DuplicateResourceException("Full Name already exists.");
        }

        // Duplicate Email
        if (studentRepository.existsByEmail(requestDTO.getEmail())) {
            throw new DuplicateResourceException("Email already exists.");
        }

        // Duplicate Mobile
        if (studentRepository.existsByMobile(requestDTO.getMobile())) {
            throw new DuplicateResourceException("Mobile Number already exists.");
        }

        Student student = modelMapper.map(requestDTO, Student.class);

        student.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
        student.setRole(Role.STUDENT);
        student.setEnabled(true);
        student.setCreatedAt(LocalDateTime.now());

        Student savedStudent = studentRepository.save(student);

        return modelMapper.map(savedStudent, StudentResponseDTO.class);
    }

    @Override
    public StudentResponseDTO loginStudent(StudentLoginRequestDTO requestDTO) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDTO.getEmail(),
                        requestDTO.getPassword()
                )
        );

        Student student = studentRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student Not Found"));

        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(student.getEmail());

        String token = jwtService.generateToken(userDetails);

        StudentResponseDTO response =
                modelMapper.map(student, StudentResponseDTO.class);

        response.setToken(token);

        return response;
    }

    @Override
    public StudentResponseDTO getStudentById(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with ID : " + studentId));

        return modelMapper.map(student, StudentResponseDTO.class);
    }

    @Override
    public ApiResponseDTO deleteStudent(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found with ID : " + studentId));

        studentRepository.delete(student);

        return new ApiResponseDTO(
                true,
                "Student deleted successfully.",
                null
        );

    }
}