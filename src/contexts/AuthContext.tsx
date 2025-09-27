import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  accountType: "individual" | "organization";
  companyName?: string; 
  taxId?: string; 
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    name: string,
    email: string,
    password: string,
    accountType: "individual" | "organization",
    companyName?: string,
    taxId?: string
  ) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const userExists = existingUsers.find(
        (user: any) => user.email === email
      );
      if (!userExists) return false;

      const mockUser: User = {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        password: userExists.password,
        accountType: userExists.accountType,
        companyName: userExists.companyName,
        taxId: userExists.taxId,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    accountType: "individual" | "organization",
    companyName?: string,
    taxId?: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );
      const userExists = existingUsers.find(
        (user: any) => user.email === email
      );
      if (userExists) return false;

      const newUser = {
        id: Date.now().toString(),
        name: name.trim(),
        email,
        password, // لاحقًا يفضل تشفيره
        accountType,
        companyName: accountType === "organization" ? companyName : undefined,
        taxId: accountType === "organization" ? taxId : undefined,
        createdAt: new Date().toISOString(),
      };

      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));

      const mockUser: User = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        password: newUser.password, 
        accountType: newUser.accountType,
        companyName: newUser.companyName,
        taxId: newUser.taxId,
      };

      setUser(mockUser);
      localStorage.setItem("user", JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error("Registration failed:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
