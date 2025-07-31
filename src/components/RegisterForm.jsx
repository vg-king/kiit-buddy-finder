import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

// Password input component
const PasswordInput = ({
  label,
  name,
  placeholder,
  value,
  error,
  onChange,
  showPassword,
  toggleShowPassword,
  disabled = false,
}) => (
  <div className="relative">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Lock className="h-4 w-4 text-gray-400" />
    </div>
    <input
      type={showPassword[name] ? "text" : "password"}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
      disabled={disabled}
      className={`w-full pl-9 pr-10 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
        error ? "border-red-500" : "border-gray-300"
      }`}
    />
    <button
      type="button"
      onClick={() => toggleShowPassword(name)}
      className="absolute inset-y-0 right-0 pr-3 flex items-center"
      tabIndex={-1}
    >
      {showPassword[name] ? (
        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      ) : (
        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-600" />
      )}
    </button>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default function RegisterForm({ onRegistered = () => {} }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    adminPassword: "",
    kitchenPassword: "",
    confirmAdminPassword: "",
    confirmKitchenPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const [showPassword, setShowPassword] = useState({
    adminPassword: false,
    confirmAdminPassword: false,
    kitchenPassword: false,
    confirmKitchenPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
    if (showError) {
      setShowError(false);
    }
  };

  const handleTogglePassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Please enter a username";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter an email address";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.adminPassword.trim()) {
      newErrors.adminPassword = "Please enter an admin password";
    } else if (formData.adminPassword.length < 6) {
      newErrors.adminPassword = "Admin password must be at least 6 characters";
    }
    if (!formData.kitchenPassword.trim()) {
      newErrors.kitchenPassword = "Please enter a kitchen password";
    } else if (formData.kitchenPassword.length < 6) {
      newErrors.kitchenPassword = "Kitchen password must be at least 6 characters";
    }
    if (formData.adminPassword !== formData.confirmAdminPassword) {
      newErrors.confirmAdminPassword = "Admin passwords do not match";
    }
    if (formData.kitchenPassword !== formData.confirmKitchenPassword) {
      newErrors.confirmKitchenPassword = "Kitchen passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Only send required fields to backend
      const payload = {
        username: formData.username,
        email: formData.email,
        adminPassword: formData.adminPassword,
        kitchenPassword: formData.kitchenPassword,
      };

      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("Registration successful! You can now log in.");
        onRegistered();
        setFormData({
          username: "",
          email: "",
          adminPassword: "",
          kitchenPassword: "",
          confirmAdminPassword: "",
          confirmKitchenPassword: "",
        });
      } else {
        setErrorMessage(data.message || "Registration failed. Please try again.");
        setShowError(true);
      }
    } catch (error) {
      setErrorMessage(error && error.message ? error.message : "Registration failed. Please try again.");
      setShowError(true);
    }
    setIsLoading(false);
  };

  return (
    <div className="max-h-96 overflow-y-auto pr-2">
      <form onSubmit={handleSubmit} className="space-y-3">
        {showError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-xs">
            {errorMessage}
          </div>
        )}

        {/* Username */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User className="h-4 w-4 text-gray-400" />
          </div>
          <input
            name="username"
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
            disabled={isLoading}
            className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs mt-1">{errors.username}</p>
          )}
        </div>

        {/* Email */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-4 w-4 text-gray-400" />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className={`w-full pl-9 pr-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Admin Password */}
        <PasswordInput
          label="Admin Password"
          name="adminPassword"
          placeholder="Enter admin password"
          value={formData.adminPassword}
          error={errors.adminPassword}
          onChange={handleChange}
          showPassword={showPassword}
          toggleShowPassword={handleTogglePassword}
          disabled={isLoading}
        />

        {/* Confirm Admin Password */}
        <PasswordInput
          label="Confirm Admin Password"
          name="confirmAdminPassword"
          placeholder="Confirm admin password"
          value={formData.confirmAdminPassword}
          error={errors.confirmAdminPassword}
          onChange={handleChange}
          showPassword={showPassword}
          toggleShowPassword={handleTogglePassword}
          disabled={isLoading}
        />

        {/* Kitchen Password */}
        <PasswordInput
          label="Kitchen Password"
          name="kitchenPassword"
          placeholder="Enter kitchen password"
          value={formData.kitchenPassword}
          error={errors.kitchenPassword}
          onChange={handleChange}
          showPassword={showPassword}
          toggleShowPassword={handleTogglePassword}
          disabled={isLoading}
        />

        {/* Confirm Kitchen Password */}
        <PasswordInput
          label="Confirm Kitchen Password"
          name="confirmKitchenPassword"
          placeholder="Confirm kitchen password"
          value={formData.confirmKitchenPassword}
          error={errors.confirmKitchenPassword}
          onChange={handleChange}
          showPassword={showPassword}
          toggleShowPassword={handleTogglePassword}
          disabled={isLoading}
        />

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-[#6a11cb] to-[#2575fc] text-white py-2.5 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Creating account...
            </div>
          ) : (
            "Create Account"
          )}
        </motion.button>
      </form>
    </div>
  );
}