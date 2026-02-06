import { useState, useEffect } from "react";
import { useNavigate, Link, Outlet, NavLink } from "react-router";
import { LogOut, ChevronDown, List } from "lucide-react";
import NavbarAdmin from "../ui/navbar-admin";

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
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin", label: "📊 Dashboard" },
    { name: "Categories", path: "/admin/categories", label: "📁 Categories" },
    { name: "Products", path: "/admin/products", label: "📦 Products" },
    { name: "Responses", path: "/admin/responses", label: "💬 Responses" },
    { name: "Reviews", path: "/admin/reviews", label: "⭐ Reviews" },
  ];

  return (
    <div>
    <NavbarAdmin />

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}