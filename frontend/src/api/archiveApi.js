/**
 * Archive API Client
 * Public read-only client for fetching Shinobi dossier records from the Django backend.
 */

import { API_ENDPOINTS } from './config.js';

const API_ARCHIVE_BASE = API_ENDPOINTS.ARCHIVE_SHINOBI;

/**
 * Fetch a list of Shinobi records from the Django backend.
 * @param {Object} params - Optional query parameters (search, village, rank, clan, status)
 * @returns {Promise<{count: number, results: Array}>}
 */
export async function fetchShinobiList(params = {}) {
  const queryParams = new URLSearchParams();

  if (params.search && params.search.trim()) {
    queryParams.append('search', params.search.trim());
  }
  if (params.village && params.village !== 'all') {
    queryParams.append('village', params.village.trim());
  }
  if (params.rank && params.rank !== 'all') {
    queryParams.append('rank', params.rank.trim());
  }
  if (params.clan && params.clan !== 'all') {
    queryParams.append('clan', params.clan.trim());
  }
  if (params.status && params.status !== 'all') {
    queryParams.append('status', params.status.trim());
  }

  const queryString = queryParams.toString();
  const url = queryString ? `${API_ARCHIVE_BASE}/?${queryString}` : `${API_ARCHIVE_BASE}/`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMessage = `Failed to fetch shinobi archive (${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // Ignore JSON parse errors on non-200 responses
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}

/**
 * Fetch a single Shinobi dossier by canonical ID.
 * @param {string} id - Canonical Shinobi ID (e.g. 'KN-012607')
 * @returns {Promise<Object>}
 */
export async function fetchShinobiById(id) {
  if (!id || typeof id !== 'string') {
    throw new Error('Valid Shinobi ID is required.');
  }

  const safeId = encodeURIComponent(id.trim());
  const url = `${API_ARCHIVE_BASE}/${safeId}/`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMessage = `Shinobi dossier '${id}' not found (${response.status})`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.error) {
        errorMessage = errorData.error;
      }
    } catch {
      // Ignore JSON parse errors
    }
    throw new Error(errorMessage);
  }

  return await response.json();
}
