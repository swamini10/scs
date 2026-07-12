import { useState } from "react";
import {
  FaUniversity,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./../css/Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Register
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          ...formData,
          role: "STUDENT",
        }
      );

      setSuccess("Registration Successful ✅");

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);

      if (error.response) {
        setError(
          typeof error.response.data === "string"
            ? error.response.data
            : error.response.data.message || "Registration Failed"
        );
      } else {
        setError("Server Error. Please try again.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="logo">
          <FaUniversity />
        </div>

        <h1>CampusResolve</h1>

        <p>
          Join CampusResolve and manage campus complaints efficiently.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter mobile number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="role-group">
            <label>Account Type</label>

            <div className="role-card">
              <FaUserGraduate />
              <span>Student Account</span>
              <small>
                All new registrations are created as Student accounts.
              </small>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <span onClick={() => navigate("/login")}> Sign In</span>
        </div>
      </div>
    </div>
  );
}

export default Register;