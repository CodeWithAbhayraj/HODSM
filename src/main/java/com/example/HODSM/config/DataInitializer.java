package com.example.HODSM.config;

import com.example.HODSM.entity.Admin;
import com.example.HODSM.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Value("${app.admin.name}")
    private String adminName;

    @Value("${app.admin.email}")
    private String adminEmail;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    CommandLineRunner initAdmin(AdminRepository adminRepository,
                                PasswordEncoder passwordEncoder) {

        return args -> {

            if (adminRepository.findByEmail(adminEmail).isEmpty()) {

                Admin admin = Admin.builder()
                        .fullName(adminName)
                        .email(adminEmail)
                        .password(passwordEncoder.encode(adminPassword))
                        .build();

                adminRepository.save(admin);

                System.out.println("=========================================");
                System.out.println(" Default Admin Created Successfully");
                System.out.println("=========================================");
                System.out.println(" Name     : " + adminName);
                System.out.println(" Email    : " + adminEmail);
                System.out.println(" Password : " + adminPassword);
                System.out.println("=========================================");

            } else {

                System.out.println("=========================================");
                System.out.println(" Admin Already Exists");
                System.out.println("=========================================");
            }
        };
    }
}