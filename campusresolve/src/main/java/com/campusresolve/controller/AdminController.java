package com.campusresolve.controller;

import com.campusresolve.dto.DashboardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campusresolve.service.AdminService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Total Complaints
    @GetMapping("/total")
    public long getTotalComplaints() {
        return adminService.getTotalComplaints();
    }

    // Pending Complaints
    @GetMapping("/pending")
    public long getPendingComplaints() {
        return adminService.getPendingComplaints();
    }

    // In Progress Complaints
    @GetMapping("/in-progress")
    public long getInProgressComplaints() {
        return adminService.getInProgressComplaints();
    }

    // Resolved Complaints
    @GetMapping("/resolved")
    public long getResolvedComplaints() {
        return adminService.getResolvedComplaints();
    }

    // Dashboard
    @GetMapping("/dashboard")
    public DashboardResponse getDashboard() {
        return adminService.getDashboard();

    }

}