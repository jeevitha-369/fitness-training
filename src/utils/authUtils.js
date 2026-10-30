/**
 * FitTrack Pro - Client-Side Demo Authentication Utilities
 *
 * SECURITY NOTICE:
 * This module is strictly for front-end demonstration, portfolio display, and UI state testing.
 * - Real user authentication requires a secure server backend or managed auth provider (e.g., Supabase, Firebase, Auth0).
 * - Raw passwords are NEVER stored in localStorage. Passwords are hashed using the browser's
 *   native Web Crypto API (SHA-256 digest) before saving to the demo user registry.
 * - Logging out clears the current session while preserving the user's workout history and fitness data.
 */

const DEMO_USERS_KEY = "fittrack_demo_users";
const CURRENT_SESSION_KEY = "fittrack_demo_session";

// Default demo athlete account for instant testing
export const DEFAULT_DEMO_ACCOUNT = {
  name: "Jeevi Athlete",
  email: "athlete@fittrack.demo",
  fitnessLevel: "Beginner",
};

/**
 * Computes a standard SHA-256 hex digest of a string using the native Web Crypto API.
 * Ensures raw passwords are never persisted in plaintext.
 */
export async function hashPassword(plainTextPassword) {
  const subtle =
    (typeof window !== "undefined" && window.crypto?.subtle) ||
    (typeof globalThis !== "undefined" && globalThis.crypto?.subtle);

  if (subtle) {
    const msgBuffer = new TextEncoder().encode(plainTextPassword);
    const hashBuffer = await subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  // Fallback bitwise hash if Web Crypto API is unavailable
  let hash = 0;
  for (let i = 0; i < plainTextPassword.length; i++) {
    const char = plainTextPassword.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return "fallback_" + Math.abs(hash).toString(16);
}

/**
 * Retrieves the list of demo registered users from localStorage.
 */
export function getRegisteredUsers() {
  try {
    const raw = localStorage.getItem(DEMO_USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("Failed to read demo users from localStorage:", err);
    return [];
  }
}

/**
 * Saves a new user to the demo registry with a hashed password.
 */
export async function registerDemoUser({ name, email, password, fitnessLevel = "Beginner" }) {
  const cleanEmail = email.trim().toLowerCase();
  const cleanName = name.trim();

  // Basic validation
  if (!cleanName) {
    return { success: false, error: "Please enter your full name." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(cleanEmail)) {
    return { success: false, error: "Please provide a valid email address." };
  }
  if (!password || password.length < 6) {
    return { success: false, error: "Password must be at least 6 characters long." };
  }

  const users = getRegisteredUsers();
  const existing = users.find((u) => u.email === cleanEmail);
  if (existing) {
    return { success: false, error: "An account with this email already exists in local demo storage." };
  }

  const passwordHash = await hashPassword(password);
  const newUser = {
    id: "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    name: cleanName,
    email: cleanEmail,
    passwordHash: passwordHash, // Stored as SHA-256, NEVER plaintext
    fitnessLevel: fitnessLevel,
    registeredAt: new Date().toISOString(),
  };

  users.push(newUser);
  try {
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
  } catch {
    return { success: false, error: "Local storage quota exceeded or unavailable." };
  }

  // Auto-establish demo session
  const sessionData = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    fitnessLevel: newUser.fitnessLevel,
    isLoggedIn: true,
    loginTimestamp: Date.now(),
  };
  saveCurrentSession(sessionData);

  return { success: true, user: sessionData };
}

/**
 * Authenticates a demo user against registered users or built-in test accounts.
 */
export async function loginDemoUser(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    return { success: false, error: "Please enter both email and password." };
  }

  const inputHash = await hashPassword(password);
  const users = getRegisteredUsers();
  const foundUser = users.find((u) => u.email === cleanEmail);

  // Check custom registered users
  if (foundUser) {
    if (foundUser.passwordHash === inputHash) {
      const sessionData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        fitnessLevel: foundUser.fitnessLevel || "Beginner",
        isLoggedIn: true,
        loginTimestamp: Date.now(),
      };
      saveCurrentSession(sessionData);
      return { success: true, user: sessionData };
    } else {
      return { success: false, error: "Invalid password for this demo account." };
    }
  }

  // Allow quick one-click default athlete demo login
  if (cleanEmail === DEFAULT_DEMO_ACCOUNT.email && password === "demo123") {
    const sessionData = {
      id: "demo_default_athlete",
      name: DEFAULT_DEMO_ACCOUNT.name,
      email: DEFAULT_DEMO_ACCOUNT.email,
      fitnessLevel: DEFAULT_DEMO_ACCOUNT.fitnessLevel,
      isLoggedIn: true,
      loginTimestamp: Date.now(),
    };
    saveCurrentSession(sessionData);
    return { success: true, user: sessionData };
  }

  return {
    success: false,
    error: "Account not found in demo storage. You can register a new demo account or click 'Quick Demo Login'.",
  };
}

/**
 * Retrieves the currently active demo user session from localStorage.
 */
export function getCurrentSession() {
  try {
    const raw = localStorage.getItem(CURRENT_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw);
    return session?.isLoggedIn ? session : null;
  } catch {
    return null;
  }
}

/**
 * Persists the current session to localStorage.
 */
export function saveCurrentSession(session) {
  try {
    localStorage.setItem(CURRENT_SESSION_KEY, JSON.stringify(session));
  } catch (err) {
    console.error("Could not write demo session to localStorage:", err);
  }
}

/**
 * Clears the active demo session while strictly preserving workout history & fitness progress.
 */
export function clearCurrentSession() {
  try {
    localStorage.removeItem(CURRENT_SESSION_KEY);
  } catch (err) {
    console.error("Could not clear demo session:", err);
  }
}
