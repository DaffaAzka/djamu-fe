import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import axios from "axios";
import type {
  Category,
  CreateCategoryDTO,
  Product,
  CreateProductDTO,
  Response,
  CreateResponseDTO,
  Review,
  CreateReviewDTO,
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ApiResponse,
} from "./type";

// ========== AXIOS SETUP ==========
const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor untuk tambah token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor untuk handle error
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (typeof window !== "undefined") {
      if (error.response?.status === 401) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  },
);

// ========== AUTH API ==========
export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/login",
      credentials,
    );
    return response.data.data!;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>(
      "/register",
      data,
    );
    return response.data.data!;
  },

  logout: async (): Promise<void> => {
    await api.post("/logout");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  },

  getProfile: async (): Promise<any> => {
    const response = await api.get<ApiResponse<any>>("/me");
    return response.data.data;
  },
};

// ========== CATEGORY API ==========
export const categoryAPI = {
  /**
   * Ambil semua categories
   * @returns List of categories
   *
   * @example
   * const categories = await categoryAPI.getAll();
   */
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>("/categories");
    return response.data.data || [];
  },

  /**
   * Ambil category by ID
   * @param id - Category ID
   * @returns Category data
   *
   * @example
   * const category = await categoryAPI.getById(1);
   */
  getById: async (id: number): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data!;
  },

  /**
   * Buat category baru (requires auth)
   * @param data - Category data
   * @returns Created category
   *
   * @example
   * const newCategory = await categoryAPI.create({
   *   name: "Jamu Premium",
   *   description: "Jamu berkualitas tinggi",
   *   picture_url: "https://..."
   * });
   */
  create: async (data: CreateCategoryDTO): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>("/categories", data);
    return response.data.data!;
  },

  /**
   * Update category (requires auth)
   * @param id - Category ID
   * @param data - Updated category data
   * @returns Updated category
   *
   * @example
   * const updated = await categoryAPI.update(1, {
   *   name: "Jamu Premium Updated"
   * });
   */
  update: async (
    id: number,
    data: Partial<CreateCategoryDTO>,
  ): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(
      `/categories/${id}`,
      data,
    );
    return response.data.data!;
  },

  /**
   * Delete category (requires auth)
   * @param id - Category ID
   *
   * @example
   * await categoryAPI.delete(1);
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};

// ========== PRODUCT API ==========
export const productAPI = {
  /**
   * Ambil semua products
   * @returns List of products
   *
   * @example
   * const products = await productAPI.getAll();
   */
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>("/product");
    return response.data.data || [];
  },

  /**
   * Ambil product by ID
   * @param id - Product ID
   * @returns Product data
   *
   * @example
   * const product = await productAPI.getById(1);
   */
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/product/${id}`);
    return response.data.data!;
  },

  /**
   * Ambil products by category
   * @param categoryId - Category ID
   * @returns List of products in category
   *
   * @example
   * const categoryProducts = await productAPI.getByCategory(1);
   */
  getByCategory: async (categoryId: string | number): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>("/product", {
      params: { category_id: categoryId },
    });
    return response.data.data || [];
  },

  /**
   * Buat product baru (requires auth)
   * @param data - Product data
   * @returns Created product
   *
   * @example
   * const newProduct = await productAPI.create({
   *   category_id: "1",
   *   title: "Jamu Kunyit Asam",
   *   value: 50000,
   *   picture_url: "https://..."
   * });
   */
  create: async (data: CreateProductDTO): Promise<Product> => {
    const response = await api.post<ApiResponse<Product>>("/product", data);
    return response.data.data!;
  },

  /**
   * Update product (requires auth)
   * @param id - Product ID
   * @param data - Updated product data
   * @returns Updated product
   *
   * @example
   * const updated = await productAPI.update(1, {
   *   title: "Jamu Kunyit Asam Premium"
   * });
   */
  update: async (
    id: number,
    data: Partial<CreateProductDTO>,
  ): Promise<Product> => {
    const response = await api.put<ApiResponse<Product>>(
      `/product/${id}`,
      data,
    );
    return response.data.data!;
  },

  /**
   * Delete product (requires auth)
   * @param id - Product ID
   *
   * @example
   * await productAPI.delete(1);
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/product/${id}`);
  },
};

// ========== RESPONSE/FEEDBACK API ==========
export const responseAPI = {
  /**
   * Ambil semua responses
   * @returns List of responses
   *
   * @example
   * const responses = await responseAPI.getAll();
   */
  getAll: async (): Promise<Response[]> => {
    const response = await api.get<ApiResponse<Response[]>>("/response");
    return response.data.data || [];
  },

  /**
   * Ambil response by ID
   * @param id - Response ID
   * @returns Response data
   *
   * @example
   * const response = await responseAPI.getById(1);
   */
  getById: async (id: number): Promise<Response> => {
    const response = await api.get<ApiResponse<Response>>(`/response/${id}`);
    return response.data.data!;
  },

  /**
   * Buat response baru
   * @param data - Response data
   * @returns Created response
   *
   * @example
   * const newResponse = await responseAPI.create({
   *   name: "John Doe",
   *   email: "john@example.com",
   *   content: "Great product!"
   * });
   */
  create: async (data: CreateResponseDTO): Promise<Response> => {
    const response = await api.post<ApiResponse<Response>>("/response", data);
    return response.data.data!;
  },

  /**
   * Delete response (requires auth)
   * @param id - Response ID
   *
   * @example
   * await responseAPI.delete(1);
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/response/${id}`);
  },
};

// ========== REVIEW API ==========
export const reviewAPI = {
  /**
   * Ambil semua reviews
   * @returns List of reviews
   *
   * @example
   * const reviews = await reviewAPI.getAll();
   */
  getAll: async (): Promise<Review[]> => {
    const response = await api.get<ApiResponse<Review[]>>("/review");
    return response.data.data || [];
  },

  /**
   * Ambil review by ID
   * @param id - Review ID
   * @returns Review data
   *
   * @example
   * const review = await reviewAPI.getById(1);
   */
  getById: async (id: number): Promise<Review> => {
    const response = await api.get<ApiResponse<Review>>(`/review/${id}`);
    return response.data.data!;
  },

  /**
   * Buat review baru (requires auth)
   * @param data - Review data
   * @returns Created review
   *
   * @example
   * const newReview = await reviewAPI.create({
   *   title: "Produk Berkualitas",
   *   description: "Sangat puas dengan produknya",
   *   stars: 5
   * });
   */
  create: async (data: CreateReviewDTO): Promise<Review> => {
    const response = await api.post<ApiResponse<Review>>("/review", data);
    return response.data.data!;
  },

  /**
   * Update review (requires auth)
   * @param id - Review ID
   * @param data - Updated review data
   * @returns Updated review
   *
   * @example
   * const updated = await reviewAPI.update(1, {
   *   stars: 4
   * });
   */
  update: async (
    id: number,
    data: Partial<CreateReviewDTO>,
  ): Promise<Review> => {
    const response = await api.put<ApiResponse<Review>>(`/review/${id}`, data);
    return response.data.data!;
  },

  /**
   * Delete review (requires auth)
   * @param id - Review ID
   *
   * @example
   * await reviewAPI.delete(1);
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/review/${id}`);
  },
};

export default api;
