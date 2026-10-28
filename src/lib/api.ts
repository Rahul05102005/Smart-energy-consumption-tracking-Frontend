const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
if (!configuredApiUrl) throw new Error('VITE_API_URL must be set in the frontend environment.');
const API_BASE = configuredApiUrl.replace(/\/$/, '');
const TOKEN_KEY = 'energytrack:token';
const USER_KEY = 'energytrack:user';
export type ApiUser = { id: string; email: string; name: string; created_at?: string };
export function getToken() { return typeof window === 'undefined' ? null : window.localStorage.getItem(TOKEN_KEY); }
export function getStoredUser(): ApiUser | null {
  if (typeof window === 'undefined') return null;
  try { const value = window.localStorage.getItem(USER_KEY); return value ? JSON.parse(value) as ApiUser : null; } catch { return null; }
}
export function saveSession(token: string, user: ApiUser) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('energytrack:auth'));
}
export function cacheUser(user: ApiUser) { window.localStorage.setItem(USER_KEY, JSON.stringify(user)); }
export function saveStoredUser(user: ApiUser) {
  cacheUser(user);
  window.dispatchEvent(new Event('energytrack:auth'));
}
export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event('energytrack:auth'));
}
export async function api<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const response = await fetch(`${API_BASE}/api${path}`, { ...options, headers: { ...(options.body ? { 'Content-Type': 'application/json' } : {}), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options.headers } });
  if (!response.ok) { const payload = await response.json().catch(() => ({})); throw Object.assign(new Error(payload.message || `Request failed (${response.status})`), { status: response.status }); }
  if (response.status === 204) return undefined as T;
  return response.json();
}
