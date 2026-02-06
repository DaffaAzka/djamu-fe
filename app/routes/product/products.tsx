import { useParams, Link } from "react-router";
import { useState, useEffect, use } from "react";
import Card from "../../components/ui/card";
import { getProductsByCategory, dummyJamu } from "../../utilities/dummy";
import { categoryAPI, productAPI } from "~/utilities/api";
import type { Product } from "~/utilities/type";

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
    const fetchData = async () => {
      const data = await productAPI.getByCategoryId(categoryId);
      return data;
    };

    fetchData().then((data) => {
      setProducts(data);
      console.log(data);
      setIsLoading(false);
    });
  }, [categoryId]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await categoryAPI.getById(categoryId);
      return data;
    };

    fetchData().then((data) => {
      setCategoryName(data.name);
    });
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
                    image={product.picture_url ?? "/assets/jamu-assets2.jpg"}
                    className="group-hover:shadow-xl transition-all duration-300 cursor-pointer ">
                    <div className="flex flex-col gap-2">
                      <p>Rp {product.value?.toLocaleString("id-ID") ?? 0}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.description}
                      </p>
                    </div>
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
