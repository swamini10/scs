package com.campusresolve.service;

import com.campusresolve.dto.DashboardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusresolve.entity.ComplaintStatus;
import com.campusresolve.repository.ComplaintRepository;

@Service
public class AdminService {

    @Autowired
    private ComplaintRepository complaintRepository;

    // Total Complaints
    public long getTotalComplaints() {
        return complaintRepository.count();
    }

    // Pending Complaints
    public long getPendingComplaints() {
        return complaintRepository.countByStatus(ComplaintStatus.PENDING);
    }

    // In Progress Complaints
    public long getInProgressComplaints() {
        return complaintRepository.countByStatus(ComplaintStatus.IN_PROGRESS);
    }

    // Resolved Complaints
    public long getResolvedComplaints() {
        return complaintRepository.countByStatus(ComplaintStatus.RESOLVED);
    }

    public DashboardResponse getDashboard() {

        DashboardResponse response = new DashboardResponse();

        response.setTotalComplaints(complaintRepository.count());
        response.setPendingComplaints(
                complaintRepository.countByStatus(ComplaintStatus.PENDING));
        response.setInProgressComplaints(
                complaintRepository.countByStatus(ComplaintStatus.IN_PROGRESS));
        response.setResolvedComplaints(
                complaintRepository.countByStatus(ComplaintStatus.RESOLVED));

        return response;
    }

}
