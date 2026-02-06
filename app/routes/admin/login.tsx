import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!credentials.name.trim() || !credentials.password.trim()) {
      setError("Username dan password harus diisi!");
      return;
    }

    // Dummy login - accept any credentials
    const user = {
      id: 1,
      name: credentials.name,
      email: `${credentials.name}@jamu.local`,
      role: "admin",
    };

    // Save to localStorage
    localStorage.setItem("auth_token", "dummy_token_" + Date.now());
    localStorage.setItem("user", JSON.stringify(user));

    // Redirect ke dashboard
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D1C0F] to-[#1a0f06] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 font-yusei">
            Jamu Admin
          </h1>
          <p className="text-gray-400">Kelola dashboard jamu Anda</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name/Username Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                placeholder="Masukkan username"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f87108] transition"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Masukkan password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f87108] transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                  {showPassword ?
                    <EyeOff size={20} />
                  : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#f87108] to-orange-600 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition">
              Login
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-600 mb-3 font-semibold">
              Demo Credentials:
            </p>
            <div className="space-y-2 text-xs text-gray-600">
              <p>
                <span className="font-semibold">Username:</span> admin
              </p>
              <p>
                <span className="font-semibold">Password:</span> password123
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Backend belum deployed, menggunakan dummy data untuk testing
        </p>
      </div>
    </div>
  );
}
