// spring security

package com.example.HODSM.security;

import com.example.HODSM.entity.Admin;
import com.example.HODSM.entity.Student;
import com.example.HODSM.repository.AdminRepository;
import com.example.HODSM.repository.StudentRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final StudentRepository studentRepository;
    private final AdminRepository adminRepository;

    public CustomUserDetailsService(StudentRepository studentRepository,
                                    AdminRepository adminRepository) {


        this.studentRepository = studentRepository;
        this.adminRepository = adminRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // ===========================
        // Check Student
        // ===========================

        Student student = studentRepository.findByEmail(email).orElse(null);

        if (student != null) {


            return User.builder()
                    .username(student.getEmail())
                    .password(student.getPassword())
                    .authorities(
                            List.of(
                                    new SimpleGrantedAuthority(
                                            "ROLE_" + student.getRole().name()
                                    )
                            )
                    )
                    .disabled(!student.isEnabled())
                    .build();
        }

        // ===========================
        // Check Admin
        // ===========================

        Admin admin = adminRepository.findByEmail(email).orElse(null);

        if (admin != null) {

            return User.builder()
                    .username(admin.getEmail())
                    .password(admin.getPassword())
                    .authorities(
                            List.of(
                                    new SimpleGrantedAuthority("ROLE_ADMIN")
                            )
                    )
                    .build();
        }

        throw new UsernameNotFoundException(
                "User not found with email : " + email
        );

    }
}