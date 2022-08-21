import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      api.defaults.headers.Authorization = `Bearer ${storedToken}`;
    }

    VerifyAdmin();
  }, [token]);

  const Login = async (username, password) => {
    try {
      const response = await api.post("/users/login", {
        username,
        password,
      });

      setToken(response.data.token);
      setUser(response.data.user);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user@id", response.data.user.id);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      
    } catch (err) {
      return false;
    }
  };

  const Logout = async () => {
    setToken("");
    setUser("");
    localStorage.removeItem("token");
    localStorage.removeItem("user@id");
  };

  const VerifyAdmin = async () => {
    try {
      const id = localStorage.getItem("user@id");
      const response = await api.get(`/users/${id}/admin`);
      setAdmin(response.data);
      return response.data;
    } catch (err) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(token), admin, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};