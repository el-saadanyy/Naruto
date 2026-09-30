/**
 * Centralized Frontend API Configuration
 *
 * Reads VITE_API_BASE_URL from environment variables if set,
 * defaulting to http://127.0.0.1:8000 for local development.
 */

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Sanitize trailing slash to avoid double-slash URL construction
export const API_BASE_URL = rawBaseUrl.replace(/\/+$/, '');

export const API_ENDPOINTS = {
  ARCHIVE_SHINOBI: `${API_BASE_URL}/api/archive/shinobi`,
  AUTH: `${API_BASE_URL}/api/auth`,
  FAVORITES: `${API_BASE_URL}/api/favorites`,
  PROFILE: `${API_BASE_URL}/api/profile`,
  VILLAGES: `${API_BASE_URL}/api/villages`,
};
