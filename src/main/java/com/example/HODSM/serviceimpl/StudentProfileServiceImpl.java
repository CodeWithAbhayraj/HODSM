package com.example.HODSM.serviceimpl;

import com.example.HODSM.dto.request.StudentProfileRequestDTO;
import com.example.HODSM.dto.response.ApiResponseDTO;
import com.example.HODSM.dto.response.StudentProfileResponseDTO;
import com.example.HODSM.entity.Student;
import com.example.HODSM.entity.StudentProfile;
import com.example.HODSM.enums.VerificationStatus;
import com.example.HODSM.exception.DuplicateResourceException;
import com.example.HODSM.exception.ResourceNotFoundException;
import com.example.HODSM.repository.StudentProfileRepository;
import com.example.HODSM.repository.StudentRepository;
import com.example.HODSM.service.StudentProfileService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Value;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.util.UUID;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Period;

@Service
public class StudentProfileServiceImpl implements StudentProfileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final StudentRepository studentRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final ModelMapper modelMapper;

    public StudentProfileServiceImpl(StudentRepository studentRepository,
                                     StudentProfileRepository studentProfileRepository,
                                     ModelMapper modelMapper) {

        this.studentRepository = studentRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public StudentProfileResponseDTO createProfile(
            Long studentId,
            StudentProfileRequestDTO requestDTO) throws IOException {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found."));

        if (studentProfileRepository.findByStudent(student).isPresent()) {
            throw new DuplicateResourceException("Profile already exists.");
        }

        if (studentProfileRepository.existsByPrn(requestDTO.getPrn())) {
            throw new DuplicateResourceException("PRN already exists.");
        }

        if (studentProfileRepository.existsByRollNo(requestDTO.getRollNo())) {
            throw new DuplicateResourceException("Roll Number already exists.");
        }


        LocalDate dob = requestDTO.getDob();
        int age = Period.between(dob, LocalDate.now()).getYears();
        if (age < 21 || age > 30) {

            throw new IllegalArgumentException(
                    "Age must be between 21 and 30 years.");

        }

        StudentProfile profile = modelMapper.map(requestDTO, StudentProfile.class);

        String photoUrl = savePhoto(requestDTO);

        profile.setPhoto(photoUrl);

        System.out.println("===== DEBUG =====");
        System.out.println("Profile ID : " + profile.getId());
        System.out.println("Student ID : " + student.getId());
        System.out.println("=================");

        profile.setId(null);      // Force new record
        profile.setStudent(student);
        profile.setStatus(VerificationStatus.DRAFT);


        // College ID Fix
        profile.setCollegeId("141");

        StudentProfile savedProfile = studentProfileRepository.save(profile);

        StudentProfileResponseDTO response =
                modelMapper.map(savedProfile, StudentProfileResponseDTO.class);

        response.setFullName(student.getFullName());
        response.setEmail(student.getEmail());
        response.setMobile(student.getMobile());
        response.setAadhaar(maskAadhaar(savedProfile.getAadhaar()));

        return response;
    }

    @Override
    public StudentProfileResponseDTO updateProfile(Long studentId, StudentProfileRequestDTO requestDTO) throws IOException {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found."));

        StudentProfile profile = studentProfileRepository.findByStudent(student)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile not found."));

        if (!profile.getPrn().equals(requestDTO.getPrn())
                && studentProfileRepository.existsByPrn(requestDTO.getPrn())) {

            throw new DuplicateResourceException("PRN already exists.");
        }

        if (!profile.getRollNo().equals(requestDTO.getRollNo())
                && studentProfileRepository.existsByRollNo(requestDTO.getRollNo())) {

            throw new DuplicateResourceException("Roll Number already exists.");
        }


        LocalDate dob = requestDTO.getDob();

        int age = Period.between(dob, LocalDate.now()).getYears();

        if (age < 21 || age > 30) {

            throw new IllegalArgumentException(
                    "Age must be between 21 and 30 years.");

        }

        profile.setPrn(requestDTO.getPrn());
        profile.setRollNo(requestDTO.getRollNo());
        profile.setDepartment(requestDTO.getDepartment());
        profile.setSemester(requestDTO.getSemester());
        profile.setAdmissionYear(requestDTO.getAdmissionYear());
        profile.setDob(requestDTO.getDob());
        profile.setGender(requestDTO.getGender());
        profile.setAddress(requestDTO.getAddress());

        //photo
        if (requestDTO.getPhoto() != null &&
                !requestDTO.getPhoto().isEmpty()) {

            String photoUrl = savePhoto(requestDTO);

            profile.setPhoto(photoUrl);
        }


        profile.setAadhaar(requestDTO.getAadhaar());

        // College ID Fix
        profile.setCollegeId("141");

        StudentProfile updatedProfile = studentProfileRepository.save(profile);

        StudentProfileResponseDTO response =
                modelMapper.map(updatedProfile, StudentProfileResponseDTO.class);

        response.setFullName(student.getFullName());
        response.setEmail(student.getEmail());
        response.setMobile(student.getMobile());
        response.setAadhaar(maskAadhaar(updatedProfile.getAadhaar()));

        return response;
    }

    @Override
    public StudentProfileResponseDTO getProfile(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found."));

        StudentProfile profile = studentProfileRepository.findByStudent(student)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile not found."));

        StudentProfileResponseDTO response =
                modelMapper.map(profile, StudentProfileResponseDTO.class);

        response.setFullName(student.getFullName());
        response.setEmail(student.getEmail());
        response.setMobile(student.getMobile());
        response.setAadhaar(maskAadhaar(profile.getAadhaar()));

        return response;
    }

    @Override
    public ApiResponseDTO submitForVerification(Long studentId) {

        Student student = studentRepository.findById(studentId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Student not found."));

        StudentProfile profile = studentProfileRepository.findByStudent(student)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Profile not found."));

        profile.setStatus(VerificationStatus.PENDING);
        profile.setSubmittedAt(LocalDateTime.now());

        studentProfileRepository.save(profile);

        return new ApiResponseDTO(
                true,
                "Profile submitted successfully for verification.",
                null
        );
    }


    private String maskAadhaar(String aadhaar) {

        if (aadhaar == null || aadhaar.length() != 12) {
            return aadhaar;
        }

        return "********" + aadhaar.substring(8);

    }
    // helper method

    private String savePhoto(StudentProfileRequestDTO requestDTO) throws IOException {

        if (requestDTO.getPhoto() == null || requestDTO.getPhoto().isEmpty()) {
            return null;
        }

        File folder = new File(uploadDir);

        if (!folder.exists()) {
            folder.mkdirs();
        }

        String fileName =
                UUID.randomUUID() + "_" +
                        requestDTO.getPhoto().getOriginalFilename();

        Path path = Paths.get(uploadDir, fileName);

        Files.copy(
                requestDTO.getPhoto().getInputStream(),
                path,
                StandardCopyOption.REPLACE_EXISTING
        );

        return "/uploads/" + fileName;
    }

}