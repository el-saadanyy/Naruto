import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { API_ENDPOINTS } from '../api/config.js';

const AuthContext = createContext(null);

const API_BASE = API_ENDPOINTS.AUTH;

function getCookie(name) {
  if (!document.cookie) return null;
  const cookies = document.cookie.split(';');
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCsrfToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/csrf/`, {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      return data.csrfToken || getCookie('csrftoken');
    } catch (err) {
      console.error('Failed to fetch CSRF token:', err);
      return getCookie('csrftoken');
    }
  }, []);

  const getValidCsrfToken = useCallback(async () => {
    let token = getCookie('csrftoken');
    if (!token) {
      token = await fetchCsrfToken();
    }
    return token;
  }, [fetchCsrfToken]);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/user/`, {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error checking auth session:', err);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username, password) => {
    setError(null);
    const csrfToken = await getValidCsrfToken();
    try {
      const response = await fetch(`${API_BASE}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMsg = data.error || 'Failed to authenticate shinobi.';
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      setUser(data.user);
      setIsAuthenticated(true);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async ({ username, email, password, confirmPassword }) => {
    setError(null);
    const csrfToken = await getValidCsrfToken();
    try {
      const response = await fetch(`${API_BASE}/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        credentials: 'include',
        body: JSON.stringify({
          username,
          email,
          password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        const errorMsg = data.error || 'Failed to enroll in ninja registry.';
        setError(errorMsg);
        throw new Error(errorMsg);
      }

      setUser(data.user);
      setIsAuthenticated(true);
      return data.user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    setError(null);
    const csrfToken = await getValidCsrfToken();
    try {
      const response = await fetch(`${API_BASE}/logout/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || '',
        },
        credentials: 'include',
      });
      if (response.ok) {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const clearError = () => setError(null);

  const value = {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    signup,
    logout,
    checkAuth,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
