import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import AdminLayout from "../../components/layouts/admin_layout";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    responses: 0,
    reviews: 0,
  });
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/admin/login");
      return;
    }
    setUser(JSON.parse(storedUser));

    // Load dummy stats
    setStats({
      categories: 6,
      products: 13,
      responses: 5,
      reviews: 8,
    });
  }, [navigate]);

  const statCards = [
    {
      title: "Categories",
      count: stats.categories,
      color: "bg-blue-500",
      icon: "📁",
    },
    {
      title: "Products",
      count: stats.products,
      color: "bg-green-500",
      icon: "📦",
    },
    {
      title: "Responses",
      count: stats.responses,
      color: "bg-purple-500",
      icon: "💬",
    },
    {
      title: "Reviews",
      count: stats.reviews,
      color: "bg-orange-500",
      icon: "⭐",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8 font-yusei">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {card.title}
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {card.count}
                </p>
              </div>
              <div
                className={`${card.color} text-white p-4 rounded-lg text-2xl`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Message */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">
          Selamat datang, {user?.name}!
        </h2>
        <p className="text-blue-700 mb-4">
          Gunakan sidebar untuk navigasi ke halaman CRUD. Backend masih dalam
          development, jadi data menggunakan dummy data.
        </p>
        <div className="space-y-2 text-sm text-blue-700">
          <p>
            <strong>📝 Categories:</strong> Kelola kategori jamu
          </p>
          <p>
            <strong>📦 Products:</strong> Kelola produk jamu
          </p>
          <p>
            <strong>💬 Responses:</strong> Lihat feedback dari customer
          </p>
          <p>
            <strong>⭐ Reviews:</strong> Kelola review produk
          </p>
        </div>
      </div>
    </div>
  );
}
