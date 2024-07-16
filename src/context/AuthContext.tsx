import React, { createContext, useState, useEffect, useContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string, expiresIn: number) => void;
  logout: () => void;
  loading: boolean;
}

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const expirationTime = localStorage.getItem("expirationTime");

      if (token && expirationTime) {
        const currentTime = new Date().getTime();
        if (currentTime < parseInt(expirationTime)) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("expirationTime");
          setIsAuthenticated(false);
        }
      }

      setLoading(false);
    };

    checkAuth();

    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const login = (token: string, expiresIn: number) => {
    const expirationTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime.toString());
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
