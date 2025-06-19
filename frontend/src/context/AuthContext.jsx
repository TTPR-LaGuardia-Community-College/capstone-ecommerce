import React, {
  createContext,
  useState,
  useEffect,
  useCallback
} from "react";
import api from "../api.js";

export const AuthContext = createContext({
  user: null,
  loading: true,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const eject = api.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          logout();
        }
        return Promise.reject(err);
      }
    );
    return () => api.interceptors.response.eject(eject);
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/auth/profile");
      setUser(data);
      setError(null);
    } catch (err) {
      setUser(null);
      setError(err.response?.data?.error || err.message);
      localStorage.removeItem("token");
      delete api.defaults.headers.common.Authorization;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  //  login()
  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
      await fetchProfile();
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, [fetchProfile]);

  //  register()
  const register = useCallback(async (username, email, password) => {
    setLoading(true);
    try {
      await api.post("/auth/register", { username, email, password });
      setError(null);
      return true;
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  //  logout()
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    delete api.defaults.headers.common.Authorization;
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
