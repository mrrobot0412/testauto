import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-96 space-y-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
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
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember me
          </label>
          <button type="button" className="text-blue-500 text-sm hover:underline">Forgot password?</button>
        </div>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded-lg">Login</button>
      </form>
    </div>
  );
}
