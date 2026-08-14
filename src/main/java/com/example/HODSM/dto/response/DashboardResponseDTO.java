package com.example.HODSM.dto.response;

import lombok.Data;

@Data
public class DashboardResponseDTO {

    private Long totalStudents;

    private Long pendingStudents;

    private Long approvedStudents;

    private Long rejectedStudents;

}