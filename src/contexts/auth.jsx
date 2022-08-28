import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [admin, setAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("user@id");

    if (storedToken) {
      setToken(storedToken);
      setUserId(storedUserId);
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

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user@id", response.data.user.id);
      api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
      
      return;

    } catch (err) {
      return err;
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
      if (!id) {
        return false
      };
      const response = await api.get(`/users/${id}/admin`);
      setAdmin(response.data);
      return response.data;
    } catch (err) {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ signed: Boolean(token), admin, userId, Login, Logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};