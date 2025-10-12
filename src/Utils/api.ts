
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

// HTTP helpers below cover common verbs

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem("authToken");

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      // Handle authentication errors
      if (response.status === 401) {
        localStorage.removeItem("authToken");
        // window.location.href = "/";
        throw new Error("Authentication failed");
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error ||
            errorData.message ||
            `HTTP error! status: ${response.status}`
        );
      }

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      return response as unknown as T;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  private jsonBody(body?: unknown) {
    return body !== undefined ? { body: JSON.stringify(body) } : {};
  }

  async get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
  }
  async post<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "POST",
      ...this.jsonBody(body),
    });
  }
  async put<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, { method: "PUT", ...this.jsonBody(body) });
  }
  async patch<T>(endpoint: string, body?: unknown) {
    return this.request<T>(endpoint, {
      method: "PATCH",
      ...this.jsonBody(body),
    });
  }
  async delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }

  // Auth
  async RegisterUser(data: any) {
    console.log(data);
    
    const response = await this.post<any>("/v1/auth/register/", data);
    console.log(response);
    
    localStorage.setItem("authToken", response.access);
    localStorage.setItem("refreshToken", response.refresf);
    return response;
  }
  async LoginUser(data: any) {
    const response = await this.post<any>("/v1/auth/login/", data);
    localStorage.setItem("authToken", response.access);
    localStorage.setItem("refreshToken", response.refresh);
    return response;
  }
  async userProfile() {
    console.log("Fetching user profile");
    
    return this.get<any>("/v1/users/profile");
  }
  // Products
  async getProducts() {
    return this.get("/v1/products/");
  }
  async createProduct(payload: any) {
    return this.post("/v1/products/", payload);
  }
  async updateProduct(id: string | number, payload: any) {
    return this.put(`/v1/products/${id}/`, payload);
  }
  async deleteProduct(id: string | number) {
    return this.delete(`/v1/products/${id}/`);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
