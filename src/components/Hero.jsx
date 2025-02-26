

// import React, { useState, useEffect } from "react";
// import { ChevronDown } from "lucide-react";
// import { FiUser } from "react-icons/fi"; // Importing user icon from react-icons

// const Hero = () => {
//   const [department, setDepartment] = useState("");
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [userName, setUserName] = useState(""); // State to hold the user's name from the database
//   const departments = ["CSED", "ECED", "MECHANICAL"];

//   // Sample professor data for CSED (Replace with real data or API call later)
//   const csedProfessors = [
//     { name: "Dr. Shalini Batra", email: "@thapar.edu", cabin: "C101" },
//     { name: "Prof sangeeta", email: "@thapar.edu", cabin: "C102" },
//     { name: "Dr rana", email: "@thapar.edu", cabin: "C103" },
//     { name: "Dr vibha jain", email: "@thapar.edu", cabin: "C104" },
  
//   ];

//   // Simulate fetching user data from a database (replace with actual API call)
//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Replace this with your API call to fetch user data
//         const response = await fetch("/api/user"); // Example endpoint
//         const data = await response.json();
//         setUserName(data.name); // Assume API returns an object with a 'name' field
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//         setUserName("Guest"); // Fallback if fetch fails
//       }
//     };

//     fetchUserData();
//   }, []);

//   return (
//     <section className="w-full h-screen bg-gray-100 flex flex-col">
//       {/* Top Bar */}
//       <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">
//         <div className="flex items-center gap-4">
//           <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
//             <FiUser className="w-6 h-6 text-gray-600" />
//           </div>
//           <span className="text-lg font-semibold text-gray-800">
//             {userName || "Loading..."}
//           </span>
//         </div>
//         <button className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition">
//           Logout
//         </button>
//       </header>

//       {/* Main Content */}
//       <main className="flex-grow flex flex-col justify-start items-center px-4 pt-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-6">Student Dashboard</h1>

//         {/* Department Dropdown */}
//         <div className="relative inline-block text-left mt-2">
//           <button 
//             className="inline-flex justify-between items-center w-60 px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition"
//             onClick={() => setDropdownOpen(!dropdownOpen)}
//           >
//             {department ? department : "Select Department"} <ChevronDown className="ml-2" />
//           </button>

//           {dropdownOpen && (
//             <div className="mt-2 absolute w-60 bg-white rounded-lg shadow-lg z-10">
//               {departments.map((dept) => (
//                 <button 
//                   key={dept} 
//                   onClick={() => {
//                     setDepartment(dept);
//                     setDropdownOpen(false);
//                   }}
//                   className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
//                     department === dept ? "font-semibold text-blue-600" : "text-gray-800"
//                   }`}
//                 >
//                   {dept}
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Department Content */}
//         {department && (
//           <div className="mt-10 w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-4">{department} Department</h2>

//             {department === "CSED" && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {csedProfessors.map((prof, index) => (
//                   <div 
//                     key={index} 
//                     className="border rounded-2xl p-4 shadow-md bg-gray-50 hover:bg-gray-100 transition"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-700">{prof.name}</h3>
//                     <p className="text-sm text-gray-600">Email: <a href={`mailto:${prof.email}`} className="text-blue-600 hover:underline">{prof.email}</a></p>
//                     <p className="text-sm text-gray-600">Cabin: {prof.cabin}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {department !== "CSED" && (
//               <p className="text-gray-600 text-center">Content for the {department} department will be displayed here.</p>
//             )}
//           </div>
//         )}
//       </main>
//     </section>
//   );
// };

// export default Hero;


import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { FiUser } from "react-icons/fi"; // Importing user icon from react-icons
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Hero = () => {
const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem("auth-token")){
      navigate("/login")
      }
  },[localStorage])
  const [department, setDepartment] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(""); // State to hold the user's name from the database
  const departments = ["CSED", "ECED", "MECHANICAL"];

  // Sample professor data for CSED (Replace with real data or API call later)
  const csedProfessors = [
    { name: "Dr. Shalini Batra", email: "shalini.batra@thapar.edu", cabin: "C101" },
    { name: "Prof. Sangeeta", email: "sangeeta@thapar.edu", cabin: "C102" },
    { name: "Dr. Rana", email: "rana@thapar.edu", cabin: "C103" },
    { name: "Dr. Vibha Jain", email: "vibha.jain@thapar.edu", cabin: "C104" },
    { name: "Prof. Amit Kumar", email: "amit.kumar@thapar.edu", cabin: "C105" },
    { name: "Dr. Neha Verma", email: "neha.verma@thapar.edu", cabin: "C106" },
    { name: "Prof. Rajeev Sharma", email: "rajeev.sharma@thapar.edu", cabin: "C107" },
  ];

  // Simulate fetching user data from a database (replace with actual API call)
  useEffect(() => {
    const fetchUserData = async () => {
    
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:8000/api/v1/loginRoutes/student/profile',
        headers: { 
          'auth-token': localStorage.getItem("auth-token"), 
          'Content-Type': 'application/json'
        },
     
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setUserName(response.data.student.firstName)
      
  
      })
      .catch((error) => {
        console.log(error);
      });
    };

    fetchUserData();
  }, []);

  return (
    <section className="w-full min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
            <FiUser className="w-6 h-6 text-gray-600" />
          </div>
          <span className="text-lg font-semibold text-gray-800">
            {userName || "Loading..."}
          </span>
        </div>
        <button onClick={()=>{localStorage.removeItem("auth-token"); navigate("/login")}} className="px-4 py-2 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition">
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col justify-start items-center px-4 pt-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Student Dashboard</h1>

        {/* Department Dropdown */}
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

        {/* Department Content */}
        {department && (
          <div className="mt-8 w-full max-w-6xl bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{department} Department</h2>

            {department === "CSED" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {csedProfessors.map((prof, index) => (
                  <div
                    key={index}
                    className="border rounded-2xl p-4 shadow-md bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-700">{prof.name}</h3>
                    <p className="text-sm text-gray-600">
                      Email: <a href={`mailto:${prof.email}`} className="text-blue-600 hover:underline">{prof.email}</a>
                    </p>
                    <p className="text-sm text-gray-600">Cabin: {prof.cabin}</p>
                  </div>
                ))}
              </div>
            )}

            {department !== "CSED" && (
              <div className="py-8 text-center text-gray-500">{/* Blank content for now */}</div>
            )}
          </div>
        )}
      </main>
    </section>
  );
};

export default Hero;
