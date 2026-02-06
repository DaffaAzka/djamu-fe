import { useState, useEffect } from "react";
// import axios from "axios";

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export default function Input({
  label,
  placeholder = "Masukkan teks...",
  type = "text",
  value = "",
  onChange,
  onSubmit,
  error,
  disabled = false,
  required = false,
  className = "",
}: InputProps) {
  const [inputValue, setInputValue] = useState(value);
  const [loading, setLoading] = useState(false);

  // ============ CONTOH PENGGUNAAN AXIOS + USEEFFECT ============
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       setLoading(true);
  //       // const response = await axios.get(`/api/endpoint`);
  //       // setInputValue(response.data.value);
  //     } catch (err) {
  //       console.error("Error fetching data:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchData();
  // }, []); // Dependency array - jalankan sekali saat mount

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Callback ke parent component jika ada
    if (onChange) {
      onChange(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // ============ CONTOH AXIOS POST ============
    // try {
    //   setLoading(true);
    //   const response = await axios.post(`/api/submit`, {
    //     data: inputValue,
    //   });
    //   console.log("Response:", response.data);
    //   setInputValue(""); // Reset input setelah submit
    // } catch (err) {
    //   console.error("Error:", err);
    // } finally {
    //   setLoading(false);
    // }

    // Atau panggil callback dari parent
    if (onSubmit) {
      onSubmit(inputValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={type}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          required={required}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            error ? "border-red-500" : "border-gray-300"
          } ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
        />

        {loading && (
          <div className="absolute right-3 top-2.5">
            <svg
              className="animate-spin h-5 w-5 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {onSubmit && (
        <button
          type="submit"
          disabled={disabled || loading}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition disabled:bg-gray-400 disabled:cursor-not-allowed">
          {loading ? "Loading..." : "Submit"}
        </button>
      )}
    </form>
  );
}

// ============ CONTOH PENGGUNAAN DI COMPONENT ============
// import Input from "./input";
//
// export default function FormExample() {
//   const [formData, setFormData] = useState("");
//   const [error, setError] = useState("");
//
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(e.target.value);
//     setError("");
//   };
//
//   const handleFormSubmit = async (value: string) => {
//     if (!value.trim()) {
//       setError("Field tidak boleh kosong");
//       return;
//     }
//     console.log("Form submitted:", value);
//   };
//
//   return (
//     <Input
//       label="Nama Lengkap"
//       placeholder="Masukkan nama..."
//       value={formData}
//       onChange={handleInputChange}
//       onSubmit={handleFormSubmit}
//       error={error}
//       required
//     />
//   );
// }
