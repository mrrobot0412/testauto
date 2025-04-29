import React, { useState, useEffect } from "react";

// Dummy data for demonstration
const dummyProfile = {
  firstName: "Vinay",
  lastName: "Arora",
  department: "CSED",
  specialization: "machine learning",
  contact: "9876543210",
  cabin: "C-201",
  email: "vinay.arora@thapar.edu",
  researchPapers: [
    { title: "Deep Learning Advances", journal: "AI Journal", year: 2022 },
    { title: "Neural Networks", journal: "ML Review", year: 2021 }
  ]
};

const dummyTimetable = {
  Monday: [
    { start: "08:00", end: "08:50", type: "Lecture", subject: "DAA", status: "busy" },
    { start: "09:00", end: "10:40", type: "Lab", subject: "ML Lab", status: "busy" },
    { start: "10:50", end: "11:40", type: "Free", status: "free" },
    { start: "11:50", end: "12:40", type: "Lecture", subject: "DSA", status: "busy" },
    { start: "12:50", end: "13:40", type: "Free", status: "free" },
    // ...more slots
  ],
  Tuesday: [
    { start: "08:00", end: "08:50", type: "Free", status: "free" },
    { start: "09:00", end: "10:40", type: "Lab", subject: "DL Lab", status: "busy" },
    // ...more slots
  ],
  // ...Wednesday, Thursday, Friday
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

function Timetable({ timetable }) {
  return (
    <div className="mt-10 w-full max-w-4xl">
      <h3 className="text-xl font-semibold mb-4">Weekly Timetable</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-100">Time</th>
              {days.map(day => (
                <th key={day} className="border px-2 py-1 bg-gray-100">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Find the max number of slots in any day */}
            {Array.from({ length: Math.max(...days.map(d => (timetable[d] || []).length)) }).map((_, slotIdx) => (
              <tr key={slotIdx}>
                {/* Time column: take from Monday as reference */}
                <td className="border px-2 py-1 font-mono text-xs">
                  {timetable["Monday"] && timetable["Monday"][slotIdx]
                    ? `${timetable["Monday"][slotIdx].start} - ${timetable["Monday"][slotIdx].end}`
                    : ""}
                </td>
                {days.map(day => {
                  const slot = timetable[day] && timetable[day][slotIdx];
                  if (!slot) return <td key={day} className="border px-2 py-1"></td>;
                  return (
                    <td
                      key={day}
                      className={`border px-2 py-1 text-xs ${
                        slot.status === "busy"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {slot.status === "busy"
                        ? `${slot.type}: ${slot.subject}`
                        : "Free"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const DashTeacher = () => {
  const [profile, setProfile] = useState(dummyProfile);
  const [newPaper, setNewPaper] = useState({ title: "", journal: "", year: "" });
  const [editingContact, setEditingContact] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle adding a new research paper
  const handleAddPaper = (e) => {
    e.preventDefault();
    if (!newPaper.title) return;
    setProfile({
      ...profile,
      researchPapers: [...profile.researchPapers, newPaper]
    });
    setNewPaper({ title: "", journal: "", year: "" });
  };

  // Handle contact info edit
  const handleContactChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    // Uncomment this block to fetch profile and timetable from backend in real use
    /*
    setLoading(true);
    const fetchData = async () => {
      try {
        // Fetch profile
        const profileRes = await fetch("http://localhost:8000/api/v1/teacher/profile", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
        });
        const profileData = await profileRes.json();
        setProfile(profileData.teacher);

        // Fetch timetable
        const timetableRes = await fetch("http://localhost:8000/api/v1/teacher/timetable", {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
            "Content-Type": "application/json",
          },
        });
        const timetableData = await timetableRes.json();
        setTimetable(timetableData.timetable);
      } catch (error) {
        setProfile(null);
        setTimetable({});
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    */
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-2xl shadow-md p-10 w-full max-w-4xl flex flex-row gap-10">
        {/* Left: Contact Info */}
        <div className="flex-1 flex flex-col items-center border-r pr-8">
          <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-4xl text-blue-600 font-bold mb-3">
            {profile.firstName?.[0]}
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-1">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-500 mb-4">{profile.department}</p>
          <div className="w-full">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Contact Info</h3>
            {editingContact ? (
              <form
                className="space-y-2"
                onSubmit={e => {
                  e.preventDefault();
                  setEditingContact(false);
                }}
              >
                <input
                  type="text"
                  name="contact"
                  value={profile.contact}
                  onChange={handleContactChange}
                  placeholder="Contact Number"
                  className="w-full px-3 py-1 border rounded"
                />
                <input
                  type="text"
                  name="cabin"
                  value={profile.cabin}
                  onChange={handleContactChange}
                  placeholder="Cabin Number"
                  className="w-full px-3 py-1 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleContactChange}
                  placeholder="Email"
                  className="w-full px-3 py-1 border rounded"
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
              </form>
            ) : (
              <div className="space-y-1">
                <div>
                  <span className="font-medium">Contact:</span> {profile.contact}
                </div>
                <div>
                  <span className="font-medium">Cabin:</span> {profile.cabin}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {profile.email}
                </div>
                <button
                  className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  onClick={() => setEditingContact(true)}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: Academic Info */}
        <div className="flex-1 pl-8">
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-1">Field of Specialization</h3>
            <p className="text-gray-600">{profile.specialization || "Not specified"}</p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Research Papers</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4">
              {profile.researchPapers.map((paper, idx) => (
                <li key={idx}>
                  <span className="font-semibold">{paper.title}</span>
                  {paper.journal && (
                    <span className="text-gray-400"> — {paper.journal}</span>
                  )}
                  {paper.year && (
                    <span className="text-gray-400"> ({paper.year})</span>
                  )}
                </li>
              ))}
            </ul>
            <form className="flex flex-col gap-2" onSubmit={handleAddPaper}>
              <input
                type="text"
                placeholder="Title"
                value={newPaper.title}
                onChange={e => setNewPaper({ ...newPaper, title: e.target.value })}
                className="px-3 py-1 border rounded"
                required
              />
              <input
                type="text"
                placeholder="Journal"
                value={newPaper.journal}
                onChange={e => setNewPaper({ ...newPaper, journal: e.target.value })}
                className="px-3 py-1 border rounded"
              />
              <input
                type="number"
                placeholder="Year"
                value={newPaper.year}
                onChange={e => setNewPaper({ ...newPaper, year: e.target.value })}
                className="px-3 py-1 border rounded"
              />
              <button
                type="submit"
                className="self-start mt-1 px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Paper
              </button>
            </form>
          </div>
        </div>
      </div>
      <Timetable timetable={dummyTimetable} />
    </div>
  );
};

export default DashTeacher;