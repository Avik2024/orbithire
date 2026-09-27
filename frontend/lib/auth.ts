import { User, UserAuthSession } from "@/types/user";

const AUTH_TOKEN_KEY = "orbithire_auth_token";
const AUTH_USER_KEY = "orbithire_auth_user";

/**
 * Retrieves the currently authenticated user from local storage.
 */
export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;

  try {
    const userStr = localStorage.getItem(AUTH_USER_KEY);
    return userStr ? (JSON.parse(userStr) as User) : null;
  } catch (error) {
    console.error("Failed to parse stored user session:", error);
    return null;
  }
}

/**
 * Retrieves the auth token from local storage or cookie.
 */
export function getStoredToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

/**
 * Saves active user session details and token to local storage and document cookie.
 */
export function setAuthSession(user: User, token: string): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    localStorage.setItem(AUTH_TOKEN_KEY, token);

    // Set cookie for Next.js middleware / server components if needed
    document.cookie = `${AUTH_TOKEN_KEY}=${token}; path=/; max-age=604800; SameSite=Lax`;
  } catch (error) {
    console.error("Failed to save auth session:", error);
  }
}

/**
 * Clears current user authentication session.
 */
export function clearAuthSession(): void {
  if (typeof window === "undefined") return;

  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_TOKEN_KEY);
  document.cookie = `${AUTH_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
}

/**
 * Retrieves full authentication state object.
 */
export function getAuthSession(): UserAuthSession {
  const user = getStoredUser();
  const token = getStoredToken();

  return {
    user,
    token: token || undefined,
    isAuthenticated: Boolean(user && token),
  };
}