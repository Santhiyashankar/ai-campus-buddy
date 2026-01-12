import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/req/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      alert("Account created successfully 🎉");
      navigate("/login");
    } catch (err) {
      alert("User already exists or server error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-700 via-purple-700 to-pink-600 flex items-center justify-center">
      <div className="w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 text-white">
          
          {/* Header */}
          <h2 className="text-3xl font-extrabold mb-2 text-center">
            Create Account
          </h2>
          <p className="text-center text-white/80 mb-8">
            Join AI Campus Buddy and level up your campus life
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Santhiya S"
            />

            <Input
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="san@example.com"
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <button
              type="submit"
              className="w-full py-3 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-100 transition"
            >
              Create Account
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-white/70 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline">
              Login
            </Link>
          </p>
        </div>

        <p className="text-center text-white/60 text-sm mt-6">
          Secure registration · JWT protected backend
        </p>
      </div>
    </div>
  );
}

/* Reusable Input Component */
function Input({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input
        {...props}
        required
        className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/60"
      />
    </div>
  );
}
