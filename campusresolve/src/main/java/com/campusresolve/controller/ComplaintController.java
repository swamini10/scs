package com.campusresolve.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.campusresolve.dto.ComplaintRequest;
import com.campusresolve.entity.Complaint;
import com.campusresolve.entity.ComplaintStatus;
import com.campusresolve.service.ComplaintService;

@RestController
@RequestMapping("/api/complaints")
@CrossOrigin(origins = "*")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Raise Complaint
    @PostMapping("/{userId}")
    public Complaint raiseComplaint(@PathVariable Long userId,
                                    @RequestBody ComplaintRequest request) {

        return complaintService.raiseComplaint(userId, request);
    }

    // Get Complaint By Id
    @GetMapping("/{id}")
    public Complaint getComplaintById(@PathVariable Long id) {

        return complaintService.getComplaintById(id);
    }

    // Student - My Complaints
    @GetMapping("/user/{userId}")
    public List<Complaint> getMyComplaints(@PathVariable Long userId) {

        return complaintService.getMyComplaints(userId);
    }

    // Admin - All Complaints
    @GetMapping
    public List<Complaint> getAllComplaints() {

        return complaintService.getAllComplaints();
    }

    // Admin - Update Complaint Status
    @PutMapping("/{id}")
    public Complaint updateStatus(@PathVariable Long id,
                                  @RequestParam ComplaintStatus status) {

        return complaintService.updateStatus(id, status);
    }
}