import axios from "axios";
import type { AxiosInstance, AxiosError } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

// ----- request interceptor: attach Authorization bearer if available -----
api.interceptors.request.use((config) => {
  const raw = localStorage.getItem("token");
  const token = raw?.startsWith("Bearer ") ? raw.slice(7) : raw;
  if (token) {
    if (!config.headers) config.headers = {} as any;
    (config.headers as any)["Authorization"] = `Bearer ${token}`;
    console.log("[api] attached Bearer token", token.slice(-10));
  } else {
    console.warn("[api] no token found in localStorage");
  }
  const fullUrl = `${config.baseURL ?? ""}${config.url ?? ""}`;
  console.log("[api] request:", (config.method || "GET").toUpperCase(), fullUrl, {
    params: config.params ?? {},
    data: config.data ?? {},
  });
  return config;
});

// ----- response interceptor: log 401 for visibility -----
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url;
    const method = error?.config?.method;
    const data = error?.response?.data;
    console.error("[api] request failed:", (method || "GET").toUpperCase(), url, "status:", status, "data:", data);
    if (status === 401) {
      console.warn("[api] 401 Unauthorized. Check token/storage and login flow.");
    }
    return Promise.reject(error);
  }
);

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

// Get all product requests (transformed) with nested comments
export const fetchProducts = async () => {
  try {
    const defaultProductId = import.meta.env.VITE_DEFAULT_PRODUCT_ID ?? '679e3f91-3440-4b63-9685-45ba8bf17efc';
    const response = await api.get(`/api-v1/comments/${defaultProductId}`);
    const productRequest = response.data?.data?.productRequest ?? response.data?.data;
    const comments = productRequest?.comments ?? [];
    console.log('[api] fetchProducts ok: product', defaultProductId, 'comments:', Array.isArray(comments) ? comments.length : 0);
    return comments;
  } catch (err) {
    const axErr = err as AxiosError<any>;
    console.error('[api] fetchProducts error', {
      message: axErr.message,
      status: axErr.response?.status,
      data: axErr.response?.data,
    });
    return [];
  }
};

// List all product requests and return their IDs
export const fetchProductRequestIds = async (): Promise<string[]> => {
  try {
    const response = await api.get(`/api-v1/comments`, { params: { limit: 100 } });
    const dataRoot = response.data?.data ?? response.data;
    const list = dataRoot?.productRequests ?? dataRoot?.items ?? dataRoot;
    const ids = Array.isArray(list)
      ? list
          .map((pr: any) => pr?.id || pr?.productId || pr?._id)
          .filter((x: unknown): x is string => typeof x === 'string' && x.length > 0)
      : [];
    console.log('[api] fetchProductRequestIds ok:', { count: ids.length });
    return ids;
  } catch (err) {
    const axErr = err as AxiosError<any>;
    console.error('[api] fetchProductRequestIds error', {
      message: axErr.message,
      status: axErr.response?.status,
      data: axErr.response?.data,
    });
    return [];
  }
};

// Get comments only for a specific product
export const fetchProductComments = async (
  productId: string,
  params?: { page?: number; limit?: number }
) => {
  try {
    const response = await api.get(`/api-v1/comments/${productId}`, { params });
    const productRequest = response.data?.data?.productRequest ?? response.data?.data;
    const comments = productRequest?.comments ?? [];
    console.log('[api] fetchProductComments ok:', {
      productId,
      params,
      count: Array.isArray(comments) ? comments.length : 0,
    });
    return comments;
  } catch (err) {
    const axErr = err as AxiosError<any>;
    console.error('[api] fetchProductComments error', {
      productId,
      params,
      message: axErr.message,
      status: axErr.response?.status,
      data: axErr.response?.data,
    });
    return [];
  }
};

// Get one product (transformed) including nested comments
export const fetchOneProduct = async (productId: string) => {
  try {
    const response = await api.get(`/api-v1/comments/${productId}`);
    const product = response.data?.data?.productRequest ?? response.data?.data;
    console.log('[api] fetchOneProduct ok:', { productId, hasProduct: !!product });
    return product;
  } catch (err) {
    const axErr = err as AxiosError<any>;
    console.error('[api] fetchOneProduct error', {
      productId,
      message: axErr.message,
      status: axErr.response?.status,
      data: axErr.response?.data,
    });
    return null as any;
  }
};

// Backwards-compatible function used by useFeedback
export const fetchFeedback = async () => {
  return fetchProducts();
};

// Create a comment for a product (per backend/bruno spec)
// Body: { productId: string; description: string }
export const createComment = async (
  payload: { productId: string; description: string; title?: string; category?: string }
) => {
  const { productId, description, title, category } = payload;
  const normalizedCategory = category ? category.toUpperCase() : undefined;
  const body: Record<string, unknown> = { content: description };
  if (title && title.trim().length > 0) body.title = title;
  if (normalizedCategory && normalizedCategory.trim().length > 0) body.category = normalizedCategory;
  const response = await api.post(`/api-v1/comments/${productId}`, body);
  console.log('[api] createComment ok:', {
    productId,
    descriptionLength: description.length,
    hasTitle: !!title,
    category: normalizedCategory,
    status: response.status,
  });
  return response.data;
};

export { api };