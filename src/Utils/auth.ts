import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  user_id: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch {
    return false;
  }
};

export const getTokenPayload = (token: string): JWTPayload | null => {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
};

export const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const redirectBasedOnRole = (role: string): string => {
  switch (role) {
    case "Vendor":
      return "/Vendor/dashboard";
    case "admin":
      return "/admin/dashboard";
    default:
      return "/";
  }
};

export const formatUserRole = (role: string, language: string): string => {
  const roleMap = {
    vendor: language === "ar" ? "بائع":"Vendor",
    admin: language === "ar" ? "مدير" : "Admin",
    individual: language === "ar" ? "فرد" : "Individual",
  };

  return roleMap[role as keyof typeof roleMap] || role;
};

export const validateemail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (
  password: string
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters long");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }

  if (!/\d/.test(password)) {
    errors.push("Password must contain at least one number");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};


