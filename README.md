# 🎓 CampusResolve – Smart Campus Complaint Management System

CampusResolve is a full-stack web application that simplifies the process of reporting, tracking, and managing campus complaints. It provides a secure platform where students can submit complaints and monitor their status, while administrators can efficiently review, manage, and resolve them.

---


## 🚀 Features

### 👨‍🎓 Student Module

* Secure Registration & Login
* JWT Authentication
* Raise New Complaints
* View Complaint History
* Track Complaint Status
* Responsive Dashboard

### 👨‍💼 Admin Module

* Secure Admin Login
* Dashboard with Complaint Statistics
* View All Complaints
* Search Complaints by Student Name
* Filter Complaints by Status
* Update Complaint Status
* Complaint Details Modal
* Pagination for Complaint Table

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* HTML5
* CSS3

### Backend

* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* MySQL

### Tools

* IntelliJ IDEA
* VS Code
* Postman
* Git & GitHub

---

## 📂 Project Structure

```
CampusResolve
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── css
│   └── App.jsx
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── entity
│   ├── dto
│   ├── security
│   └── config
│
└── database
```

---

## 🔐 Authentication

* JWT Based Authentication
* Role-Based Authorization
* Student Role
* Admin Role
* Protected Routes

---

## 📊 Admin Dashboard

The Admin Dashboard provides:

* Total Complaints
* Pending Complaints
* In Progress Complaints
* Resolved Complaints
* Search Functionality
* Status Filter
* Pagination
* Complaint Details
* Status Update

---

## 📌 Complaint Workflow

```
Student Login
      │
      ▼
Raise Complaint
      │
      ▼
Pending
      │
      ▼
In Progress
      │
      ▼
Resolved
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/swamini10/CampusResolve.git
```

### 2. Backend

```bash
cd campusresolve
```

Configure `application.properties`

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/campusresolve
spring.datasource.username=root
spring.datasource.password=your_password
```

Run

```bash
mvn spring-boot:run
```

---

### 3. Frontend

```bash
cd campusresolve-frontend
npm install
npm run dev
```

---

## 📸 Screenshots

Add screenshots here:

* Login Page
<img width="1920" height="1020" alt="Screenshot 2026-07-14 231304" src="https://github.com/user-attachments/assets/8fea997e-73f2-4f3b-8ba2-8ca7ecf0af16" />

* Register Page
  <img width="1920" height="1080" alt="Screenshot 2026-07-14 231221" src="https://github.com/user-attachments/assets/5148fd1e-c6fd-4bf0-8f59-e26029a0d37b" />
<img width="1920" height="1080" alt="Screenshot 2026-07-14 231241" src="https://github.com/user-attachments/assets/511ee54e-6771-40d6-9d8e-9d462e75065f" />

* Student Dashboard
<img width="1920" height="1020" alt="Screenshot 2026-07-14 231322" src="https://github.com/user-attachments/assets/d152d7a9-2fb6-4a7d-9a6f-e031f5bbd36e" />
  
* Raise Complaint
<img width="1920" height="1080" alt="Screenshot 2026-07-14 231337" src="https://github.com/user-attachments/assets/779bbed4-8676-4ed7-8263-bd519494bf81" />
  
* My Complaints
<img width="1920" height="1080" alt="Screenshot 2026-07-14 231351" src="https://github.com/user-attachments/assets/6cbb4231-1196-4473-a337-3b7702e08a60" />

* Admin Dashboard or Complaint Details
<img width="1920" height="1080" alt="Screenshot 2026-07-14 231447" src="https://github.com/user-attachments/assets/cb1f9ba2-4168-4db4-a975-202bcca8d0d0" />

---

## 🔮 Future Enhancements

* Email Notifications
* File/Image Upload
* Analytics Dashboard
* Dark Mode

---

## 👤 Author

**Swamini Bhandare**

If you found this project useful, consider giving it a ⭐ on GitHub.
