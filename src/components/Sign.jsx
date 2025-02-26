import React, { useState } from "react";
import { FiUser, FiLock, FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstName: "",lastName:"", email: "", rollNo: "", password: "", confirmPassword: "", otp:"" });
  const [otpVerfifed, setOtpVerified]= useState(true);
  const [verifyotp, setOtpVerifyotp]= useState(true);
  const [token, setToken]= useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async  (e) => {
    e.preventDefault();
    let data = JSON.stringify({
      "firstName": formData.firstName,
      "lastName": formData.lastName,
      "roll": formData.rollNo,
      "password": formData.password,
    });
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/loginRoutes/registerStudent',
      headers: { 
        'auth-token': token, 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      navigate("/")
    })
    .catch((error) => {
      console.log(error);
    });
    console.log(formData);
  };

  const handleEmail =async (e)=>{
    e.preventDefault();
    let data = JSON.stringify({
      "email": formData.email
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/otp/generateOTP',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    axios.request(config)
.then((response) => {
  
  setToken(response.data.authtoken);
  setOtpVerifyotp(false)

})
.catch((error) => {
  console.log(error);
});

  }

  const handleOtp =async (e)=>{
    e.preventDefault();
    console.log(formData.otp)
    let data = JSON.stringify({
      "otp": formData.otp
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/v1/otp/verifyotp',
      headers: { 
        'auth-token': token, 
        'Content-Type': 'application/json', 
       
      },
    data:data}
    axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setToken(response.data.authtoken);
  setOtpVerified(false)

})
.catch((error) => {
  console.log(error);
});

  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {otpVerfifed ?
        <>
        {verifyotp ?
      <form onSubmit={handleEmail} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-96 space-y-5">
        <h2 className="text-3xl font-bold text-center">Register</h2>

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

       
     

       
       

        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-full font-medium hover:bg-green-600 transition">Register</button>

        <p className="text-center text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-light-green-500 hover:underline">Login</Link>
        </p>
      </form>:
      <form onSubmit={handleOtp} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-96 space-y-5">
        <h2 className="text-3xl font-bold text-center">Enter OTP</h2>

        <div className="relative">
          <FiMail className="absolute top-3 left-3 text-gray-500" />
          <input
            type="otp"
            name="otp"
            placeholder="enter otp"
            value={formData.otp}
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
      }
      </>
 :   
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-2xl w-96 space-y-5">
        <h2 className="text-3xl font-bold text-center">Register</h2>


        <div className="relative">
          <FiUser className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="firstName"
            placeholder="Your First Name "
            value={formData.firstName}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="relative">
          <FiUser className="absolute top-3 left-3 text-gray-500" />
          <input
            type="text"
            name="lastName"
            placeholder="Your Last Name "
            value={formData.lastName}
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
      </form> }
    </div>
  );
}
