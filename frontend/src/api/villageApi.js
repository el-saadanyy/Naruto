/**
 * Village API Client
 * Public read-only client for fetching Shinobi Village records from the Django backend.
 */

import { API_ENDPOINTS } from './config.js';

const API_VILLAGES_BASE = API_ENDPOINTS.VILLAGES;

/**
 * Fetch list of all canonical Shinobi Villages from Django backend.
 * @returns {Promise<{count: number, results: Array}>}
 */
export async function fetchVillageList() {
  const url = `${API_VILLAGES_BASE}/`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMessage = `Failed to fetch village dossiers (${response.status})`;
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

/**
 * Fetch a single Shinobi Village dossier by canonical ID.
 * @param {string} id - Canonical Village ID (e.g. 'leaf', 'sand', 'rock', 'cloud', 'mist')
 * @returns {Promise<Object>}
 */
export async function fetchVillageById(id) {
  if (!id || typeof id !== 'string') {
    throw new Error('Valid Village ID is required.');
  }

  const safeId = encodeURIComponent(id.trim().toLowerCase());
  const url = `${API_VILLAGES_BASE}/${safeId}/`;

  const response = await fetch(url, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    let errorMessage = `Village dossier '${id}' not found (${response.status})`;
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
