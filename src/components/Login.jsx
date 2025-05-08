import React, { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";


export default function Login() {
  const navigate = useNavigate();
  if(localStorage.getItem("auth-token")){
    console.log("hi")
    navigate("/")
  }
   useEffect(()=>{
      if(localStorage.getItem("auth-token")){
        navigate("/")
        }
    },[localStorage])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [userType, setUserType] = useState("studentLogin");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    console.log({ email, password, rememberMe, userType });
    let data = JSON.stringify({
      email: email,
      password: password,
      userType: userType,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `http://localhost:8000/api/v1/loginRoutes/${userType}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        localStorage.setItem("auth-token", response.data.token);
        if (userType == "studentLogin") {
          navigate("/");
        } else {
          navigate("/teacher_dashboard");
        }
      })
      .catch((error) => {
        if (error.response.data.message == "User not found") {
          alert("USER NOT FOUND");
        }

        if (error.response.request.status == 400) {
          alert("Invalid credentials");
        }
        console.log(error.response);
      });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <div className="mb-4">
          <label className="mr-4">
            <input
              type="radio"
              value="student"
              checked={userType === "studentLogin"}
              onChange={() => setUserType("studentLogin")}
              className="mr-1"
            />
            Student
          </label>
          <label>
            <input
              type="radio"
              value="teacher"
              checked={userType === "teacherLogin"}
              onChange={() => setUserType("teacherLogin")}
              className="mr-1"
            />
            Teacher
          </label>
        </div>
        <input
          type="email"
          placeholder="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />
        <div className="flex items-center justify-between">
          <p className="text-center text-sm">
            Create account?{" "}
            <Link to="/signup" className="text-light-green-500 hover:underline">
              Register
            </Link>
          </p>
          {/* <label className="flex items-center"> */}
          {/* <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember me
          </label> */}
          <button
            type="button"
            className="text-blue-500 text-sm hover:underline"
          >
            Forgot password?
          </button>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
}
