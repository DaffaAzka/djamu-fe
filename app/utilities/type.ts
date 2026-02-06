// ========== CATEGORY TYPES ==========
export interface Category {
  id: number;
  name: string;
  description: string;
  picture_url: string;
  created_at: string;
  updated_at: string;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  picture_url?: string;
}

// ========== PRODUCT TYPES ==========
export interface Product {
  id: number;
  category_id: string;
  title: string;
  description?: string;
  value?: number;
  picture_url: string;
  is_popular: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProductDTO {
  category_id: string;
  title: string;
  description?: string;
  value?: number;
  picture_url?: string;
  is_popular?: boolean;
}

// ========== RESPONSE/FEEDBACK TYPES ==========
export interface Response {
  id: number;
  name: string;
  email: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface CreateResponseDTO {
  name: string;
  email: string;
  content: string;
}

// ========== REVIEW TYPES ==========
export interface Review {
  id: number;
  title: string;
  description?: string;
  picture_url?: string;
  stars: number;
  created_at: string;
  updated_at: string;
}

export interface CreateReviewDTO {
  title: string;
  description?: string;
  picture_url?: string;
  stars: number;
}

// ========== USER/AUTH TYPES ==========
export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// ========== API RESPONSE TYPES ==========
export interface ApiResponse<T> {
  status: "success" | "error";
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiListResponse<T> {
  status: "success" | "error";
  data: T[];
  message?: string;
}

// ========== PAGINATION TYPES ==========
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

// ========== TABLE TYPES ==========
export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  sortable?: boolean;
}

export interface TableState {
  data: any[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}
