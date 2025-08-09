import AppShell from "@/components/layouts/AppShell";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState, createContext, useContext } from "react";
import Head from "next/head";

// User interface
interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize default users and check authentication
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initialize default admin user if not exists
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      if (!users.find((u: User) => u.email === "admin@gmail.com")) {
        const adminUser: User = {
          id: "admin-001",
          email: "admin@gmail.com",
          password: "admin123",
          name: "Administrator",
          role: "admin",
          createdAt: new Date().toISOString(),
        };
        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));
      }

      // Check if user is already logged in
      const isLogin = localStorage.getItem("isLogin");
      const currentUser = localStorage.getItem("currentUser");
      
      if (isLogin === "true" && currentUser) {
        try {
          const userData = JSON.parse(currentUser);
          setUser(userData);
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("isLogin");
          localStorage.removeItem("currentUser");
        }
      }
      
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: User) => u.email === email && u.password === password);
      
      if (user) {
        // Update last login
        const updatedUser = { ...user, lastLogin: new Date().toISOString() };
        const updatedUsers = users.map((u: User) => 
          u.id === user.id ? updatedUser : u
        );
        
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("isLogin");
    localStorage.removeItem("currentUser");
    setUser(null);
    window.dispatchEvent(new Event("storage"));
  };

  // Register function
  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      if (users.find((u: User) => u.email === email)) {
        return false; // Email already exists
      }
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        password,
        name: name || email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  // Update user function
  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      
      // Update in users array
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const updatedUsers = users.map((u: User) => 
        u.id === user.id ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    }
  };

  // Auth context value
  const authContextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    updateUser,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="ShopHub - Toko online terpercaya dengan berbagai produk berkualitas. Belanja online aman, nyaman, dan terpercaya." />
        <meta name="keywords" content="toko online, belanja online, produk berkualitas, ShopHub, e-commerce" />
        <meta name="author" content="ShopHub Team" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ShopHub - Toko Online Terpercaya" />
        <meta property="og:description" content="Belanja online aman, nyaman, dan terpercaya dengan berbagai produk berkualitas" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        <meta property="og:url" content="https://yourdomain.com" />
        
        {/* Twitter */}
        <meta name="twitter:title" content="ShopHub - Toko Online Terpercaya" />
        <meta name="twitter:description" content="Belanja online aman, nyaman, dan terpercaya dengan berbagai produk berkualitas" />
        <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://yourdomain.com" />
      </Head>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
