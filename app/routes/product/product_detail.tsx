import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import Card from "../../components/ui/card";
import { getProductById, getProductsByCategory } from "../../utilities/dummy";

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
    { title: `Produk - ${params.id}` },
    { name: "description", content: `Halaman detail produk ${params.id}` },
  ];
}

export default function ProductDetail({ params }: any) {
  const { id } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulasi fetch data dengan delay
    const timer = setTimeout(() => {
      try {
        const productData = getProductById(parseInt(id));

        if (!productData) {
          setError("Produk tidak ditemukan");
          setLoading(false);
          return;
        }

        setProduct(productData);

        // Get related products dari kategori yang sama
        const related = getProductsByCategory(productData.category_id)
          .filter((p) => p.id !== productData.id)
          .slice(0, 3);

        setRelatedProducts(related);
        setError("");
      } catch (err) {
        setError("Gagal memuat data produk");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">
            {error || "Produk tidak ditemukan"}
          </p>
          <Link
            to="/categories"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Kembali ke Kategori
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Breadcrumb */}
      <div className="lg:max-w-7xl mx-auto px-4 mb-8 flex items-center gap-2 text-sm text-gray-600">
        <Link to="/categories" className="hover:text-gray-900 transition">
          Kategori
        </Link>
        <span>/</span>
        <Link
          to={`/categories/${product.category_id}/products`}
          className="hover:text-gray-900 transition">
          Produk
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold">{product.title}</span>
      </div>

      {/* Product Detail */}
      <div className="lg:max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div>
              <img
                src={product.picture_url}
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              {product.is_popular === 1 && (
                <div className="mt-4 inline-block px-4 py-2 bg-red-100 text-red-700 font-semibold rounded-lg">
                  🔥 Produk Popular
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4 font-yusei">
                {product.title}
              </h1>

              <div className="mb-6 pb-6 border-b">
                <p className="text-gray-600 text-base mb-4">
                  Produk berkualitas tinggi yang telah dipilih khusus untuk
                  memenuhi kebutuhan Anda.
                </p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Kategori
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      ID: {product.category_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Ditambahkan
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {new Date(product.created_at).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition">
                  Beli Sekarang
                </button>
                <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition">
                  Tambah ke Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 font-yusei">
                Produk Lainnya
              </h2>
              <p className="text-gray-600">
                Produk lain dari kategori yang sama
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/products/${relatedProduct.id}`}
                  className="group">
                  <Card
                    title={relatedProduct.title}
                    image={relatedProduct.picture_url}
                    className="group-hover:shadow-xl transition-all duration-300 cursor-pointer">
                    {relatedProduct.is_popular === 1 && (
                      <div className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                        Popular
                      </div>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
