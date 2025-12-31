import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // تعيين Token في Headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      loadUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // تحميل بيانات المستخدم
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth/me');
      setUser(res.data.user);
      setError(null);
    } catch (err) {
      console.error('خطأ في تحميل المستخدم:', err);
      logout();
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الدخول
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/login', { email, password });

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      setError(null);

      return { success: true, message: res.data.message };
    } catch (err) {
      const message = err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // التسجيل
  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await axios.post('/api/auth/register', userData);

      setToken(res.data.token);
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      setError(null);

      return { success: true, message: res.data.message };
    } catch (err) {
      const message = err.response?.data?.message || 'حدث خطأ أثناء التسجيل';
      setError(message);
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الخروج
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
