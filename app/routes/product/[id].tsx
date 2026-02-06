import { useParams } from "react-router";
import { useState, useEffect } from "react";
// import axios from "axios";

interface DetailData {
  id: string;
  title: string;
  description: string;
  image?: string;
}

export function meta({ params }: any) {
  return [
    { title: `Detail - ${params.id}` },
    { name: "description", content: `Detail page for item ${params.id}` },
  ];
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<DetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetailData = async () => {
      try {
        setLoading(true);

        // ============ CONTOH AXIOS GET DENGAN ID ============
        // const response = await axios.get(`/api/items/${id}`);
        // setData(response.data);

        // Untuk testing, gunakan dummy data:
        setData({
          id: id || "1",
          title: `Detail Item ${id}`,
          description: `Ini adalah halaman detail untuk item dengan ID: ${id}`,
          image: `https://via.placeholder.com/400x300?text=Item+${id}`,
        });
      } catch (err) {
        setError("Gagal memuat data");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetailData();
    }
  }, [id]); // Re-fetch jika id berubah

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">{error || "Data tidak ditemukan"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="w-full h-96 object-cover"
          />
        )}

        <div className="p-8">
          <div className="mb-4">
            <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              ID: {data.id}
            </span>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {data.title}
          </h1>

          <p className="text-gray-600 text-lg mb-6">{data.description}</p>

          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition">
              Delete
            </button>
            <a
              href="/"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition"
            >
              Kembali
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ CONTOH PENGGUNAAN ============
// Route akan auto-match: /1, /2, /123, dll
// URL: /1 → params.id = "1"
// URL: /abc-product → params.id = "abc-product"
//
// Di component lain, navigate dengan:
// import { useNavigate } from "react-router";
// const navigate = useNavigate();
// navigate(`/${id}`);
// atau
// <Link to={`/${id}`}>Link ke detail</Link>
