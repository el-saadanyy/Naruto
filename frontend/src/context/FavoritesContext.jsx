import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext.jsx';
import { API_ENDPOINTS } from '../api/config.js';

const FavoritesContext = createContext(null);

const API_FAVORITES_BASE = API_ENDPOINTS.FAVORITES;
const API_AUTH_BASE = API_ENDPOINTS.AUTH;

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

export function FavoritesProvider({ children }) {
  const { isAuthenticated, user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCsrfToken = useCallback(async () => {
    let token = getCookie('csrftoken');
    if (!token) {
      try {
        const resp = await fetch(`${API_AUTH_BASE}/csrf/`, {
          method: 'GET',
          credentials: 'include',
        });
        const data = await resp.json();
        token = data.csrfToken || getCookie('csrftoken');
      } catch (e) {
        console.error('Failed to get CSRF token in FavoritesProvider:', e);
      }
    }
    return token;
  }, []);

  const loadFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_FAVORITES_BASE}/`, {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setFavorites(data.favorites || []);
      } else {
        setFavorites([]);
      }
    } catch (err) {
      console.error('Failed to load favorites:', err);
      setFavorites([]);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites, user]);

  const favoritedKeysSet = useMemo(() => {
    return new Set(favorites.map((f) => `${f.item_type || 'shinobi'}:${f.item_id}`));
  }, [favorites]);

  const isFavorited = useCallback(
    (itemId, itemType = 'shinobi') => {
      if (!itemId) return false;
      return favoritedKeysSet.has(`${itemType}:${itemId}`);
    },
    [favoritedKeysSet]
  );

  const toggleFavorite = useCallback(
    async ({ item_id, item_type = 'shinobi', item_title = '', item_image = '' }) => {
      if (!isAuthenticated) {
        return {
          authRequired: true,
          favorited: false,
          message: `Authentication required to bookmark this ${item_type}.`,
        };
      }

      const csrfToken = await getCsrfToken();
      try {
        const res = await fetch(`${API_FAVORITES_BASE}/toggle/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrfToken || '',
          },
          credentials: 'include',
          body: JSON.stringify({
            item_id,
            item_type,
            item_title,
            item_image,
          }),
        });

        const data = await res.json();
        if (res.ok) {
          if (data.favorited) {
            setFavorites((prev) => [
              data.favorite || {
                id: Date.now(),
                item_id,
                item_type,
                item_title,
                item_image,
                created_at: new Date().toISOString(),
              },
              ...prev,
            ]);
          } else {
            setFavorites((prev) =>
              prev.filter((f) => !(f.item_id === item_id && (f.item_type || 'shinobi') === item_type))
            );
          }
          return { success: true, favorited: data.favorited, message: data.message };
        } else {
          return {
            success: false,
            favorited: isFavorited(item_id, item_type),
            error: data.error || 'Failed to toggle favorite.',
          };
        }
      } catch (err) {
        console.error('Error toggling favorite:', err);
        return { success: false, favorited: isFavorited(item_id, item_type), error: err.message };
      }
    },
    [isAuthenticated, getCsrfToken, isFavorited]
  );

  const value = {
    favorites,
    isFavorited,
    toggleFavorite,
    loadFavorites,
    loading,
  };

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
