package com.campusresolve.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.campusresolve.dto.ComplaintRequest;
import com.campusresolve.entity.Complaint;
import com.campusresolve.entity.ComplaintStatus;
import com.campusresolve.entity.User;
import com.campusresolve.repository.ComplaintRepository;
import com.campusresolve.repository.UserRepository;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private UserRepository userRepository;

    // Raise Complaint
    public Complaint raiseComplaint(Long userId, ComplaintRequest request) {

        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isPresent()) {

            User user = optionalUser.get();

            Complaint complaint = new Complaint();

            complaint.setTitle(request.getTitle());
            complaint.setDescription(request.getDescription());
            complaint.setStatus(ComplaintStatus.PENDING);
            complaint.setCreatedAt(LocalDateTime.now());
            complaint.setUpdatedAt(null);
            complaint.setUser(user);

            return complaintRepository.save(complaint);

        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Get Complaint By Id
    public Complaint getComplaintById(Long id) {

        Optional<Complaint> optionalComplaint = complaintRepository.findById(id);

        if (optionalComplaint.isPresent()) {
            return optionalComplaint.get();
        } else {
            throw new RuntimeException("Complaint not found");
        }
    }

    // Student - My Complaints
    public List<Complaint> getMyComplaints(Long userId) {

        return complaintRepository.findByUserId(userId);
    }

    // Admin - All Complaints
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }

    // Admin - Update Status
    public Complaint updateStatus(Long id, ComplaintStatus status) {

        Optional<Complaint> optionalComplaint = complaintRepository.findById(id);

        if (optionalComplaint.isPresent()) {

            Complaint complaint = optionalComplaint.get();

            complaint.setStatus(status);
            complaint.setUpdatedAt(LocalDateTime.now());

            return complaintRepository.save(complaint);

        } else {
            throw new RuntimeException("Complaint not found");
        }

    }
    // Total Complaints
    public long getTotalComplaints() {

        return complaintRepository.count();

    }

}