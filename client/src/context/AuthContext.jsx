import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios"; // your axios instance


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // ✅ LOGIN FUNCTION
  const login = async (email, password, role) => {
    const res = await api.post("/auth/login", {
        email,
        password,
        role_type: role, 
      
    });

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
  };

  // ✅ LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // ✅ REFRESH SESSION (CORRECTED)
  const refreshSession = async () => {
    const storedToken = localStorage.getItem("token");
  
    if (!storedToken) {
      setUser(null);
      setLoading(false);
      return;
    }
  
    try {
      const res = await api.get("/auth/session");
      setUser(res.data.user);
    } catch (error) {
      console.log("Session restore failed");
      setUser(null); // ❗ no logout here
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO RUN ON LOAD
  useEffect(() => {
    refreshSession();
  }, []);

  // ✅ PROVIDE VALUES
  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ CUSTOM HOOK
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
