import { createContext, useContext, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const stored = localStorage.getItem('freddo_admin');
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (username, password) => {
    const { data } = await api.post('/auth/login', { username, password });
    localStorage.setItem('freddo_token', data.token);
    localStorage.setItem('freddo_admin', JSON.stringify(data.admin));
    setAdmin(data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('freddo_token');
    localStorage.removeItem('freddo_admin');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, isLoggedIn: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
