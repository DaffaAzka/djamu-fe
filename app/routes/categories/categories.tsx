import { useState, useEffect } from "react";
import { Link } from "react-router";
import Card from "../../components/ui/card";
import { dummyJamu, getJamuAll } from "../../utilities/dummy";
import { Loader } from "lucide-react";
import Loading from "~/components/ui/loading";

interface Jamu {
  id: number;
  name: string;
  description: string;
  picture_url: string;
  created_at: string;
  updated_at: string;
}

export default function CategoriesPage() {
  const [jamuList, setJamuList] = useState<Jamu[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulasi fetch data dengan delay
    const timer = setTimeout(() => {
      const data = getJamuAll();
      setJamuList(data);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="lg:max-w-7xl mx-auto p-4 pt-24">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-500 mb-2 font-yusei">
          Koleksi Jamu Tradisional
        </h1>
        <p className="text-gray-600 font-poppins text-sm">
          Katogori dari jamu pilihan berkualitas tinggi dari bahan-bahan alami
          terbaik untuk meringankan masalah anda.
        </p>
      </div>

      {isLoading ?
        <Loading text="Memuat Katalog" />
      : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jamuList.map((jamu) => (
            <Link
              key={jamu.id}
              to={`/categories/${jamu.id}/products`}
              className="group">
              <Card
                title={jamu.name}
                description={jamu.description}
                image={jamu.picture_url}
                className="group-hover:shadow-xl transition-all duration-300 cursor-pointer"
              />
            </Link>
          ))}
        </div>
      }

      {!isLoading && jamuList.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Tidak ada data kategori jamu yang tersedia
          </p>
        </div>
      )}
    </div>
  );
}
