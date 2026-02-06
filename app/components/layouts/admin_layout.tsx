import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router";
import { LogOut, ChevronDown } from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout() {
  const [user, setUser] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/admin/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin", label: "📊 Dashboard" },
    { name: "Categories", path: "/admin/categories", label: "📁 Categories" },
    { name: "Products", path: "/admin/products", label: "📦 Products" },
    { name: "Responses", path: "/admin/responses", label: "💬 Responses" },
    { name: "Reviews", path: "/admin/reviews", label: "⭐ Reviews" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/admin" className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-[#f87108] to-orange-600 text-white px-3 py-1 rounded-lg font-bold text-lg">
                JA
              </div>
              <span className="hidden sm:inline text-xl font-bold text-gray-900 font-yusei">
                Jamu Admin
              </span>
            </Link>

            {/* Menu Items */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition">
                  {item.label}
                </Link>
              ))}
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Dropdown */}
              <div className="md:hidden relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition">
                  <ChevronDown size={20} />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    {menuItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* User Profile */}
              <div className="flex items-center gap-3 border-l pl-4">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                  title="Logout">
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
