"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Changed from next/navigation
import Cookies from "js-cookie";
import axios from "axios";
import { Eye, EyeOff } from "react-feather"; // Import icons
import { motion } from "framer-motion";

function LoginForm() {
  const navigate = useNavigate(); // Changed from useRouter

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "admin", // default to admin
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
    if (showError) {
      setShowError(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Please enter your username or email";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Please enter your password";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    console.log("change");
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call login API with role
      const response = await axios.post(
        "/api/user/login",
        {
          usernameOrEmail: formData.username,
          password: formData.password,
          role: formData.role,
        }
      );

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("role", formData.role);

        Cookies.set("token", response.data.token, {
          expires: 1,
          secure: true,
          sameSite: "Lax",
        });

        // Role-based redirect
        if (formData.role === "admin") {
          console.log('redirecting to admin dashboard')
          navigate("/adminDashboard"); // Changed from router.push
        } else if (formData.role === "kitchen") {
          console.log('redirecting to kitchen dashboard')
          navigate("/kitchenDashboard"); // Changed from router.push
        } else {
          console.log("fallback");
          navigate("/"); // Changed from router.push
        }
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Invalid username or password. Please try again."
      );
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Error Alert */}
      {showError && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {errorMessage}
        </div>
      )}

      {/* Username Field */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          id="username"
          name="username"
          placeholder="Username or Email"
          value={formData.username}
          onChange={handleChange}
          disabled={isLoading}
          required
        />
        <label htmlFor="username">Username or Email ID</label>
        {errors.username && (
          <div className="invalid-feedback">{errors.username}</div>
        )}
      </div>

      {/* Role Selection */}
      <div className="mb-3">
        <label className="form-label me-3">Login as:</label>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="adminRole"
            value="admin"
            checked={formData.role === "admin"}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label className="form-check-label" htmlFor="adminRole">
            Admin
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="role"
            id="kitchenRole"
            value="kitchen"
            checked={formData.role === "kitchen"}
            onChange={handleChange}
            disabled={isLoading}
          />
          <label className="form-check-label" htmlFor="kitchenRole">
            Kitchen
          </label>
        </div>
      </div>

      {/* Password Field */}
  <div className="form-floating mb-3 position-relative">
  <input
    type={passwordVisible ? "text" : "password"}
    className={`form-control ${errors.password ? "is-invalid" : ""}`}
    id="password"
    name="password"
    placeholder={formData.role === "admin" ? "Admin Password" : "Kitchen Password"}
    value={formData.password}
    onChange={handleChange}
    disabled={isLoading}
    required
  />
  <label htmlFor="password">
    {formData.role === "admin" ? "Admin Password" : "Kitchen Password"}
  </label>
  {errors.password && (
    <div className="invalid-feedback">{errors.password}</div>
  )}
  {/* Eye Icon */}
  <div
    className="position-absolute"
    style={{ top: "50%", right: "10px", transform: "translateY(-50%)" }}
    onClick={() => setPasswordVisible(!passwordVisible)}
    role="button"
  >
    {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
  </div>
</div>

      {/* Submit Button */}
      <div className="d-grid gap-2">
        <motion.button
        type="submit"
        disabled={isLoading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Signing in...
          </div>
        ) : (
          "Sign In"
        )}
      </motion.button>
      </div>
    </form>
  );
}

export default LoginForm;