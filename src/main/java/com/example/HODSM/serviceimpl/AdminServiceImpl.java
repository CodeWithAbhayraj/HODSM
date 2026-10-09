package com.example.HODSM.serviceimpl;

import com.example.HODSM.dto.request.AdminLoginRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.DashboardResponseDTO;
import com.example.HODSM.dto.response.StudentProfileResponseDTO;
import com.example.HODSM.entity.Admin;
import com.example.HODSM.entity.StudentProfile;
import com.example.HODSM.enums.VerificationStatus;
import com.example.HODSM.exception.ResourceNotFoundException;
import com.example.HODSM.repository.AdminRepository;
import com.example.HODSM.repository.StudentProfileRepository;
import com.example.HODSM.repository.StudentRepository;
import com.example.HODSM.security.CustomUserDetailsService;
import com.example.HODSM.security.JwtService;
import com.example.HODSM.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {


    private final AdminRepository adminRepository;
    private final StudentRepository studentRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final ModelMapper modelMapper;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final CustomUserDetailsService customUserDetailsService;


    public AdminServiceImpl(
            AdminRepository adminRepository,
            StudentRepository studentRepository,
            StudentProfileRepository studentProfileRepository,
            ModelMapper modelMapper,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            CustomUserDetailsService customUserDetailsService) {

        this.adminRepository = adminRepository;
        this.studentRepository = studentRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.modelMapper = modelMapper;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    public ApiResponseDTO login(AdminLoginRequestDTO requestDTO) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestDTO.getEmail(),
                        requestDTO.getPassword()
                )
        );

        Admin admin = adminRepository.findByEmail(requestDTO.getEmail())
                .orElseThrow(() ->
                        new ResourceNotFoundException("Admin Not Found"));

        UserDetails userDetails =
                customUserDetailsService.loadUserByUsername(admin.getEmail());

        String token = jwtService.generateToken(userDetails);

        ApiResponseDTO response = new ApiResponseDTO();
        response.setSuccess(true);
        response.setMessage("Login Successful");
        response.setToken(token);

        return response;
    }

    @Override
    public DashboardResponseDTO getDashboard() {

        DashboardResponseDTO dashboard = new DashboardResponseDTO();

        dashboard.setTotalStudents(studentRepository.count());

        dashboard.setPendingStudents(
                (long) studentProfileRepository.findByStatus(VerificationStatus.PENDING).size());

        dashboard.setApprovedStudents(
                (long) studentProfileRepository.findByStatus(VerificationStatus.APPROVED).size());

        dashboard.setRejectedStudents(
                (long) studentProfileRepository.findByStatus(VerificationStatus.REJECTED).size());

        return dashboard;
    }

    @Override
    public List<StudentProfileResponseDTO> getPendingRequests() {

        List<StudentProfile> profiles =
                studentProfileRepository.findByStatus(VerificationStatus.PENDING);

        return profiles.stream().map(profile -> {

            StudentProfileResponseDTO dto =
                    modelMapper.map(profile, StudentProfileResponseDTO.class);

            dto.setFullName(profile.getStudent().getFullName());
            dto.setEmail(profile.getStudent().getEmail());
            dto.setMobile(profile.getStudent().getMobile());

            return dto;

        }).collect(Collectors.toList());
    }

    @Override
    public StudentProfileResponseDTO getStudentProfile(Long profileId) {

        StudentProfile profile = studentProfileRepository.findById(profileId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student Profile Not Found"));

        StudentProfileResponseDTO dto =
                modelMapper.map(profile, StudentProfileResponseDTO.class);

        dto.setFullName(profile.getStudent().getFullName());
        dto.setEmail(profile.getStudent().getEmail());
        dto.setMobile(profile.getStudent().getMobile());

        return dto;
    }

    @Override
    public ApiResponseDTO approveStudent(Long profileId) {

        StudentProfile profile = studentProfileRepository.findById(profileId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student Profile Not Found"));

        profile.setStatus(VerificationStatus.APPROVED);
        profile.setVerifiedAt(LocalDateTime.now());

        studentProfileRepository.save(profile);

        return new ApiResponseDTO(
                true,
                "Student Approved Successfully",
                null
        );
    }

    @Override
    public ApiResponseDTO rejectStudent(Long profileId) {

        StudentProfile profile = studentProfileRepository.findById(profileId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student Profile Not Found"));

        profile.setStatus(VerificationStatus.REJECTED);
        profile.setVerifiedAt(LocalDateTime.now());

        studentProfileRepository.save(profile);

        return new ApiResponseDTO(
                true,
                "Student Rejected Successfully",
                null
        );
    }

    @Override
    public List<StudentProfileResponseDTO> searchStudent(String keyword) {

        List<StudentProfile> profiles = studentProfileRepository.findAll();

        return profiles.stream()
                .filter(profile ->
                        profile.getStudent().getFullName().toLowerCase().contains(keyword.toLowerCase())
                                || profile.getPrn().equalsIgnoreCase(keyword)
                                || profile.getRollNo().equalsIgnoreCase(keyword)
                                || profile.getStudent().getEmail().equalsIgnoreCase(keyword)
                )
                .map(profile -> {

                    StudentProfileResponseDTO dto =
                            modelMapper.map(profile, StudentProfileResponseDTO.class);

                    dto.setFullName(profile.getStudent().getFullName());
                    dto.setEmail(profile.getStudent().getEmail());
                    dto.setMobile(profile.getStudent().getMobile());

                    return dto;

                }).collect(Collectors.toList());
    }
}