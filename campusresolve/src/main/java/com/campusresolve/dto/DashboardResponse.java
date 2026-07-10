package com.campusresolve.dto;

import lombok.*;

@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
public class DashboardResponse {

    private long totalComplaints;

    private long pendingComplaints;

    private long inProgressComplaints;

    private long resolvedComplaints;

}