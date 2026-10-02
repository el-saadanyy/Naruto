import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { API_ENDPOINTS } from '../api/config.js';

const AuthContext = createContext(null);

const API_BASE = API_ENDPOINTS.AUTH;

/**
 * Safely parses response, handling both JSON and HTML error pages.
 * Never throws a SyntaxError on non-JSON payloads.
 */
async function safeParseResponse(response, fallbackErrorMsg = 'An unexpected error occurred.') {
  const contentType = response.headers.get('content-type') || '';
  let data = null;

  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (response.ok) {
    return { ok: true, data: data || {} };
  }

  let errorMessage = fallbackErrorMsg;
  if (data && typeof data === 'object') {
    if (data.error && typeof data.error === 'string') {
      errorMessage = data.error;
    } else if (data.message && typeof data.message === 'string') {
      errorMessage = data.message;
    } else if (data.detail && typeof data.detail === 'string') {
      errorMessage = data.detail;
    }
  } else if (!contentType.includes('application/json')) {
    if (response.status === 403) {
      errorMessage = 'Access denied or CSRF session expired (403).';
    } else if (response.status === 500) {
      errorMessage = 'Shinobi Archive server error (500). Please try again shortly.';
    } else if (response.status === 502 || response.status === 503) {
      errorMessage = 'Backend service is temporarily unavailable. Please retry.';
    } else {
      errorMessage = `${fallbackErrorMsg} (${response.status} ${response.statusText || 'Error'})`;
    }
  }

  return { ok: false, status: response.status, error: errorMessage, data };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // In-memory CSRF token store (avoids cross-origin document.cookie isolation issues)
  const csrfTokenRef = useRef(null);

  /**
   * Fetches fresh CSRF token from Django backend and stores it in memory.
   */
  const fetchCsrfToken = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/csrf/`, {
        method: 'GET',
        credentials: 'include',
      });
      const parsed = await safeParseResponse(response, 'Failed to fetch CSRF token');
      if (parsed.ok && parsed.data && parsed.data.csrfToken) {
        csrfTokenRef.current = parsed.data.csrfToken;
        return parsed.data.csrfToken;
      }
      return csrfTokenRef.current;
    } catch (err) {
      console.error('Failed to fetch CSRF token:', err);
      return csrfTokenRef.current;
    }
  }, []);

  /**
   * Retrieves a valid CSRF token, fetching from server if not yet in memory.
   */
  const getValidCsrfToken = useCallback(
    async (forceRefresh = false) => {
      if (!forceRefresh && csrfTokenRef.current) {
        return csrfTokenRef.current;
      }
      return await fetchCsrfToken();
    },
    [fetchCsrfToken]
  );

  /**
   * Check whether the client currently possesses an active Django session.
   */
  const checkAuth = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/user/`, {
        method: 'GET',
        credentials: 'include',
      });
      const parsed = await safeParseResponse(response, 'Session check failed');
      if (parsed.ok && parsed.data && parsed.data.authenticated && parsed.data.user) {
        setUser(parsed.data.user);
        setIsAuthenticated(true);
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
    fetchCsrfToken();
  }, [checkAuth, fetchCsrfToken]);

  /**
   * Core helper for POST authentication requests with CSRF token and 1-time retry on 403.
   */
  const postAuth = async (endpoint, body, fallbackError) => {
    let token = await getValidCsrfToken();

    let response;
    try {
      response = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': token || '',
        },
        credentials: 'include',
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (networkErr) {
      throw new Error(networkErr.message || 'Network error connecting to ninja registry.');
    }

    // If 403 Forbidden (CSRF token rotated or expired), refresh CSRF token and retry once
    if (response.status === 403) {
      const freshToken = await fetchCsrfToken();
      try {
        response = await fetch(`${API_BASE}${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': freshToken || '',
          },
          credentials: 'include',
          body: body ? JSON.stringify(body) : undefined,
        });
      } catch (retryNetworkErr) {
        throw new Error(retryNetworkErr.message || 'Network error during retry.');
      }
    }

    const parsed = await safeParseResponse(response, fallbackError);
    if (!parsed.ok) {
      const errorMsg = parsed.error || fallbackError;
      setError(errorMsg);
      throw new Error(errorMsg);
    }

    return parsed.data;
  };

  const login = async (username, password) => {
    setError(null);
    try {
      const data = await postAuth(
        '/login/',
        { username, password },
        'Failed to authenticate shinobi.'
      );

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
    try {
      const data = await postAuth(
        '/signup/',
        {
          username,
          email,
          password,
          confirm_password: confirmPassword,
        },
        'Failed to enroll in ninja registry.'
      );

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
    try {
      await postAuth('/logout/', null, 'Logout failed.');
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
    getValidCsrfToken,
    fetchCsrfToken,
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
