import React, { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", rollNo: "", password: "", confirmPassword: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-96 space-y-5">
        <h2 className="text-3xl font-bold text-center">Register</h2>

        <div className="relative">
          <FiUser className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="relative">
          <FiMail className="absolute top-3 left-3 text-gray-500" />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="relative">
          <FiUser className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="rollNo"
            placeholder="Roll Number"
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="relative">
          <FiLock className="absolute top-3 left-3 text-gray-500" />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <div className="relative">
          <FiLock className="absolute top-3 left-3 text-gray-500" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-full font-medium hover:bg-green-600 transition">Register</button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-light-green-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
