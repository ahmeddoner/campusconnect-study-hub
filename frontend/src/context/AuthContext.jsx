import { createContext, useContext, useEffect, useState } from "react";
import { get } from "../api/client";

// create the context (the shared box)
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

  // user = loggin in user object, loading = are we still checking?
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // on app load, check if a token exists and fetch the user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }

    get("/auth/me")
      .then((data) => setUser(data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  // called after login — save token and set user
  const login = (user, token) => {
    localStorage.setItem("token", token);
    setUser(user);
  };

  // called on logout — clear everything
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // wrap the app and share user, loading, login, logout with everyone
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// shortcut hook — any component calls useAuth() to access the context
export const useAuth = () => useContext(AuthContext);
