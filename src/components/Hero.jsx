import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hero = () => {
  const navigate = useNavigate();
  const [department, setDepartment] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(false);
  const departments = ["CSED", "ECED", "MECHANICAL"];

  // Function to fetch teachers from backend
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("username", "amank@gmail.com");
      myHeaders.append("password", "123");
      myHeaders.append("Authorization", localStorage.getItem("auth-token"));
      myHeaders.append("Content-Type", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      const response = await fetch(`http://localhost:8000/api/v1/teachersRoutes/getTeachers?department=${department}`, requestOptions);
      const result = await response.json();
      
      if (result && result.teachers) {
        setTeachers(result.teachers);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user profile data
  useEffect(() => {
    const fetchUserData = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:8000/api/v1/loginRoutes/student/profile",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setUserName(response.data.student.firstName);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    fetchUserData();
  }, []);

  // Fetch teachers when department changes
  useEffect(() => {
    if (department) {
      fetchTeachers();
    }
  }, [department]);

  return (
    <section className="w-full min-h-screen bg-gray-100 flex flex-col">
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
            <FiUser className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            {userName || "Loading..."}
          </span>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("auth-token");
            navigate("/login");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      <main className="flex-grow flex flex-col justify-start items-center px-4 pt-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Student Dashboard</h1>

        <div className="relative inline-block text-left mt-2">
          <button
            className="inline-flex justify-between items-center w-60 px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {department || "Select Department"} <ChevronDown className="ml-2" />
          </button>

          {dropdownOpen && (
            <div className="mt-2 absolute w-60 bg-white rounded-lg shadow-lg z-10">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => {
                    setDepartment(dept);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                    department === dept ? "font-semibold text-blue-600" : "text-gray-800"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}
        </div>

        {department && (
          <div className="mt-8 w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{department} Department</h2>

            {loading ? (
              <div className="text-center py-8">
                <p>Loading teachers...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teachers.map((teacher, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-4 shadow-md bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">
                      {teacher.firstName} {teacher.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Email:{" "}
                      <a href={`mailto:${teacher.email}`} className="text-blue-600 hover:underline">
                        {teacher.email}
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">Cabin: {teacher.roomNumber}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </section>
  );
};

export default Hero;

