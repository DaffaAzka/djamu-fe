import { useState, useEffect } from "react";
import { Link } from "react-router";
import Card from "../../components/ui/card";
import { dummyJamu, getJamuAll } from "../../utilities/dummy";
import { Loader } from "lucide-react";
import Loading from "~/components/ui/loading";
import { categoryAPI } from "~/utilities/api";
import type { Category } from "~/utilities/type";
import ButtonLink from "~/components/ui/button-link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchJamu = async () => {
      const data = await categoryAPI.getAll();
      return data;
    };

    fetchJamu().then((data) => {
      setCategories(data);
      setIsLoading(false);
    });
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
          {categories.map((jamu) => (
            <Card
              title={jamu.name}
              description={jamu.description}
              key={jamu.id}
              image={jamu.picture_url}
              className="group-hover:shadow-xl transition-all duration-300 cursor-pointer">
              <ButtonLink
                text="Lihat Produk"
                link={`/categories/${jamu.id}/products`}
              />
            </Card>
          ))}
        </div>
      }

      {!isLoading && categories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Tidak ada data kategori jamu yang tersedia
          </p>
        </div>
      )}
    </div>
  );
}
