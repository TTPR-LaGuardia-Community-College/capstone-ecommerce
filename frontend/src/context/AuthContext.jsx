import React, { createContext, useState, useEffect } from "react";
import api from "../api.js";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // on mount, try to fetch profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    api.get("/auth/profile")
      .then(res => setUser(res.data))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  function login(email, password) {
    return api.post("/auth/login", { email, password })
      .then(res => {
        localStorage.setItem("token", res.data.token);
        return api.get("/auth/profile");
      })
      .then(res => setUser(res.data));
  }

  function register(username, email, password) {
    return api.post("/auth/register", { username, email, password });
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
