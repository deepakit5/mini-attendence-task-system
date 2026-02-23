import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(s => s.auth.status);
  const error = useSelector(s => s.auth.error);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(register({ name, email, password }));
    if (res.type === "auth/register/fulfilled") {
      // After register, redirect to login (safer than auto-login)
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white p-6">
      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-6 bg-white shadow-lg rounded-xl overflow-hidden">
        {/* left visual */}
        <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold">Join Mini Attendance</h1>
            <p className="mt-2 text-blue-100">Register and start tracking your attendance and tasks.</p>
          </div>
          <div className="mt-auto text-sm opacity-90">
            <div className="flex items-center gap-3">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none"><path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 20v-1a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div>
                <div className="text-xs uppercase tracking-wide">Secure & simple</div>
                <div className="text-sm">Passwords hashed, token stored in httpOnly cookie</div>
              </div>
            </div>
          </div>
        </div>

        {/* right form */}
        <div className="p-8">
          <h2 className="text-2xl font-semibold mb-4">Create account</h2>

          {error && <div className="mb-3 text-red-600">{error}</div>}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full name</label>
              <input value={name} onChange={e => setName(e.target.value)} required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Your full name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" minLength={6} required
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400" placeholder="Choose a secure password" />
            </div>

            <div className="flex items-center justify-between">
              <button type="submit" disabled={status === "loading"}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-60">
                {status === "loading" ? "Creating..." : "Create account"}
              </button>
              <button type="button" onClick={() => navigate("/login")} className="text-sm text-indigo-600 hover:underline">
                Already have an account? Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}