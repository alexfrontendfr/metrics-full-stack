import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import api from "@/lib/api";
import { toast } from "react-toastify";
import type { User, AuthResponse } from "@/types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const {
            data: { user },
          } = await api.get<{ user: User }>("/current_user");
          setUser(user);
        } catch (error) {
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const {
        data: { data },
      } = await api.post<AuthResponse>("/login", {
        user: { email, password },
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Invalid email or password");
      throw error;
    }
  };

  const register = async (
    email: string,
    password: string,
    passwordConfirmation: string
  ) => {
    try {
      const {
        data: { data },
      } = await api.post<AuthResponse>("/register", {
        user: { email, password, password_confirmation: passwordConfirmation },
      });
      localStorage.setItem("token", data.token);
      setUser(data.user);
      toast.success("Successfully registered!");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.delete("/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      router.push("/login");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
