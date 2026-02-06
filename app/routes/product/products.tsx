import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import Card from "../../components/ui/card";
import { getProductsByCategory, dummyJamu } from "../../utilities/dummy";

interface Product {
  id: number;
  category_id: string;
  title: string;
  picture_url: string;
  is_popular: number;
  created_at: string;
  updated_at: string;
}

export function meta({ params }: any) {
  return [
    { title: `Produk - Kategori ${params.categoryId}` },
    { name: "description", content: "Halaman produk berdasarkan kategori" },
  ];
}

export default function ProductsByCategory({ params }: any) {
  const { categoryId } = params;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    // Simulasi fetch data dengan delay
    const timer = setTimeout(() => {
      const categoryData = dummyJamu.data.find(
        (cat) => cat.id === parseInt(categoryId),
      );

      if (categoryData) {
        setCategoryName(categoryData.name);
      }

      const data = getProductsByCategory(categoryId);
      setProducts(data);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [categoryId]);

  return (
    <div className="lg:max-w-7xl mx-auto p-4 pt-24">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link to="/categories" className="hover:text-gray-900 transition">
          Kategori
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">
          {categoryName || "Produk"}
        </span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 font-yusei">
          {categoryName}
        </h1>
        <p className="text-gray-600">
          Koleksi produk terbaik dalam kategori {categoryName}
        </p>
      </div>

      {isLoading ?
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading...</p>
        </div>
      : <>
          {products.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grow">
              {products.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group grow">
                  <Card
                    title={product.title}
                    image={product.picture_url}
                    className="group-hover:shadow-xl transition-all duration-300 cursor-pointer ">
                    {product.is_popular === 1 && (
                      <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full mb-2">
                        Popular
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          : <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                Tidak ada produk dalam kategori ini
              </p>
              <Link
                to="/categories"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Kembali ke Kategori
              </Link>
            </div>
          }
        </>
      }
    </div>
  );
}
