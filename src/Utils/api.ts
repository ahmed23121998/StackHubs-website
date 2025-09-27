const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://192.168.1.6:8000/api";

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
        // localStorage.removeItem("authToken");
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

  async RegisterUser(data: any) {
    try {
      const response = await this.request<any>("/v1/auth/register/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response) {
        throw new Error("API request failed");
      } else {
        console.log(response);
        localStorage.setItem("authToken", response.access);
        localStorage.setItem("refreshToken", response.refresf);
        return response;
      }
     
     
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }
  async LoginUser(data: any) {
    try {
      const response = await this.request<any>("/v1/auth/login/", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response) {
        throw new Error("API request failed");
      } else {
        console.log(response);
        localStorage.setItem("authToken", response.access);
        localStorage.setItem("refreshToken", response.refresf);
        return response;
      }
     
     
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }
  async getproducts() {
  
    return this.request("/v1/products/");
 
  } 
}

export const apiClient = new ApiClient(API_BASE_URL);
