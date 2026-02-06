import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";
import { authAPI } from "~/utilities/api";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    email: "",
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
    setLoading(true);

    const { email, password } = credentials;

    const fetchLogin = async () => {
      await authAPI.login({ email, password }).then((data) => {
        if (data) {
          localStorage.setItem("auth_token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      });
    };

    fetchLogin()
      .then((data) => {
        setLoading(false);
        console.log(data);
        // navigate("/admin");
      })
      .catch((err) => {
        setLoading(false);
        setError(
          err.response?.data?.message ||
            "Gagal melakukan login. Silakan coba lagi.",
        );
      });

    // navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#2D1C0F] to-[#1a0f06] flex items-center justify-center p-4">
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
                Email
              </label>
              <input
                type="text"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="Masukkan email"
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
        </div>
      </div>
    </div>
  );
}
