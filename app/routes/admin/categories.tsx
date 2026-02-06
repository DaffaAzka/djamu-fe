import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Plus, Edit2, Trash2, X, Check } from "lucide-react";
import AdminLayout from "../../components/layouts/admin_layout";
import { dummyJamu } from "../../utilities/dummy";
import type { Category } from "../../utilities/type";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    picture_url: "",
  });
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    if (!localStorage.getItem("auth_token")) {
      navigate("/login");
      return;
    }

    // Load dari dummy data
    const dummyData: Category[] = dummyJamu.data as any;
    setCategories(dummyData);
  }, [navigate]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Nama category harus diisi!");
      return;
    }

    if (editingId) {
      // Update
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId ?
            {
              ...cat,
              name: formData.name,
              description: formData.description,
              picture_url: formData.picture_url,
              updated_at: new Date().toISOString(),
            }
          : cat,
        ),
      );
      setSuccessMsg("✓ Category berhasil diupdate!");
    } else {
      // Create
      const newCategory: Category = {
        id: Math.max(...categories.map((c) => c.id), 0) + 1,
        name: formData.name,
        description: formData.description,
        picture_url: formData.picture_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setCategories((prev) => [...prev, newCategory]);
      setSuccessMsg("✓ Category berhasil ditambahkan!");
    }

    resetForm();
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Hapus category ini?")) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      setSuccessMsg("✓ Category berhasil dihapus!");
      setTimeout(() => setSuccessMsg(""), 3000);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description,
      picture_url: category.picture_url,
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", picture_url: "" });
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
            Categories
          </h1>
          <p className="text-gray-600 mt-1">Kelola kategori produk jamu</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={20} /> Tambah Category
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
              {editingId ? "Edit Category" : "Tambah Category Baru"}
            </h2>
            <button
              onClick={resetForm}
              className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Category *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Contoh: Jamu Premium"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Deskripsi category"
                rows={3}
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
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                ID
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Deskripsi
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ?
              categories.map((category) => (
                <tr key={category.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {category.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {category.description?.substring(0, 50)}
                    {category.description && category.description.length > 50 ?
                      "..."
                    : ""}
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg hover:bg-blue-200 transition font-medium">
                      <Edit2 size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-lg hover:bg-red-200 transition font-medium">
                      <Trash2 size={16} /> Hapus
                    </button>
                  </td>
                </tr>
              ))
            : <tr>
                <td
                  colSpan={4}
                  className="px-6 py-12 text-center text-gray-500">
                  Belum ada category
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}
