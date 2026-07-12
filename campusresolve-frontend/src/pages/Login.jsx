import { useState } from "react";
import { FaUniversity, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./../css/Login.css";

function Login() {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            const response = await axios.post(

                "http://localhost:8080/api/users/login",

                formData

            );

            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role);
            localStorage.setItem("userId", data.id);
            localStorage.setItem("fullName", data.fullName);
            localStorage.setItem("email", data.email);

            setSuccess(data.message);

            setTimeout(() => {

                if (data.role === "ADMIN") {

                    navigate("/admin");

                } else {

                    navigate("/student");

                }

            }, 1000);

        }

        catch (error) {

            if (error.response) {

                setError(
                    typeof error.response.data === "string"
                        ? error.response.data
                        : error.response.data.message || "Login Failed"
                );

            } else {

                setError("Server Error");

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="logo">
                    <FaUniversity />
                </div>

                <h1>CampusResolve</h1>

                <p>Welcome Back! Login to continue.</p>

                <form onSubmit={handleSubmit}>

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

                    {error &&

                        <div className="error-message">

                            {error}

                        </div>

                    }

                    {success &&

                        <div className="success-message">

                            {success}

                        </div>

                    }

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Login
                    </button>

                </form>

                <div className="register-link">

                    Don't have an account?

                    <Link to="/register">

                        Register

                    </Link>

                </div>

            </div>

        </div>

    );

}

export default Login;