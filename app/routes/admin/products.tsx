import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import AdminLayout from "../../components/layouts/admin_layout";
import { dummyProducts, dummyJamu } from "../../utilities/dummy";
import type { Product, Category } from "../../utilities/type";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    category_id: "",
    title: "",
    description: "",
    value: 0,
    picture_url: "",
    is_popular: false,
  });
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem("auth_token")) {
      navigate("/login");
      return;
    }

    // Load from dummy data
    setProducts(dummyProducts.data as any);
    setCategories(dummyJamu.data as any);
  }, [navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const inputElement = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? inputElement.checked
        : name === "value" ? parseInt(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.category_id) {
      alert("Judul dan kategori harus diisi!");
      return;
    }

    if (editingId) {
      // Update
      setProducts((prev) =>
        prev.map((prod) =>
          prod.id === editingId ?
            {
              ...prod,
              category_id: formData.category_id,
              title: formData.title,
              description: formData.description,
              value: formData.value,
              picture_url: formData.picture_url,
              is_popular: formData.is_popular ? 1 : 0,
              updated_at: new Date().toISOString(),
            }
          : prod,
        ),
      );
      setSuccessMsg("✓ Product berhasil diupdate!");
    } else {
      // Create
      const newProduct: Product = {
        id: Math.max(...products.map((p) => p.id), 0) + 1,
        category_id: formData.category_id,
        title: formData.title,
        description: formData.description,
        value: formData.value || 0,
        picture_url: formData.picture_url,
        is_popular: formData.is_popular ? 1 : 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setProducts((prev) => [...prev, newProduct]);
      setSuccessMsg("✓ Product berhasil ditambahkan!");
    }

    resetForm();
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Hapus product ini?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setSuccessMsg("✓ Product berhasil dihapus!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData({
      category_id: product.category_id,
      title: product.title,
      description: product.description || "",
      value: product.value || 0,
      picture_url: product.picture_url || "",
      is_popular: product.is_popular === 1,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      category_id: "",
      title: "",
      description: "",
      value: 0,
      picture_url: "",
      is_popular: false,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (!localStorage.getItem("auth_token")) {
    navigate("/login");
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-yusei">
            Products
          </h1>
          <p className="text-gray-600 mt-1">Kelola produk jamu</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={20} /> Tambah Product
        </button>
      </div>

      {/* Success Message */}
      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
          <Check size={20} /> {successMsg}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingId ? "Edit Product" : "Tambah Product Baru"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Pilih Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Judul *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Nama produk"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Deskripsi produk"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  name="value"
                  value={formData.value}
                  onChange={handleInputChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL Picture
                </label>
                <input
                  type="url"
                  name="picture_url"
                  value={formData.picture_url}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_popular"
                  checked={formData.is_popular}
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm font-medium text-gray-700">
                  Produk Popular ⭐
                </span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                {editingId ? "Update" : "Simpan"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-medium">
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Judul
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Harga
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Popular
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ?
                products.map((product) => {
                  const category = categories.find(
                    (c) => c.id === parseInt(product.category_id),
                  );
                  return (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {product.title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {category?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        Rp {product.value?.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {product.is_popular === 1 ?
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold">
                            Yes ⭐
                          </span>
                        : <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            No
                          </span>
                        }
                      </td>
                      <td className="px-6 py-4 text-sm flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition font-medium">
                          <Edit2 size={16} /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition font-medium">
                          <Trash2 size={16} /> Hapus
                        </button>
                      </td>
                    </tr>
                  );
                })
              : <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-gray-500">
                    Belum ada product
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
