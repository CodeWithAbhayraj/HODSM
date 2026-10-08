package com.example.HODSM.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI departmentVerificationAPI() {

        final String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()

                // JWT Security
                .addSecurityItem(
                        new SecurityRequirement().addList(securitySchemeName)
                )
                .components(
                        new Components()
                                .addSecuritySchemes(
                                        securitySchemeName,
                                        new SecurityScheme()
                                                .name(securitySchemeName)
                                                .type(SecurityScheme.Type.HTTP)
                                                .scheme("bearer")
                                                .bearerFormat("JWT")
                                )
                )

                // API Information
                .info(
                        new Info()
                                .title("Department Verification System API")
                                .description("REST API for Department Student Verification System")
                                .version("1.0")

                                .contact(
                                        new Contact()
                                                .name("Kamlesh Kharade")
                                                .email("kamlesh@gmail.com")
                                )

                                .license(
                                        new License()
                                                .name("Apache 2.0")
                                )
                )

                .externalDocs(
                        new ExternalDocumentation()
                                .description("Project Documentation")
                );
    }
}