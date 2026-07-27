const LOCAL_STORAGE_PIN_KEY = 'jokicoding_admin_pin';
const LOCAL_STORAGE_FAILED_KEY = 'jokicoding_admin_failed_attempts';
const LOCAL_STORAGE_LOCKOUT_KEY = 'jokicoding_admin_lockout_until';
const SESSION_KEY = 'jokicoding_admin_authenticated';

const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 60 * 1000; // 60 seconds
const SESSION_TIMEOUT_MS = 2 * 60 * 60 * 1000; // 2 hours session validity
const SESSION_TIMESTAMP_KEY = 'jokicoding_admin_session_ts';

// ─── PIN Storage ────────────────────────────────────────────────────────────

export function getAdminPin(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(LOCAL_STORAGE_PIN_KEY) || 'admin123';
}

export function saveAdminPin(newPin: string): boolean {
  if (typeof window === 'undefined') return false;
  const trimmed = newPin.trim();
  if (!trimmed || trimmed.length < 6) return false; // min 6 chars for better security
  localStorage.setItem(LOCAL_STORAGE_PIN_KEY, trimmed);
  return true;
}

export function verifyAdminPin(inputPin: string): boolean {
  const current = getAdminPin();
  return inputPin.trim() === current;
}

// ─── Brute-Force Lockout ─────────────────────────────────────────────────────

export function isLockedOut(): { locked: boolean; remainingSeconds: number } {
  if (typeof window === 'undefined') return { locked: false, remainingSeconds: 0 };
  const lockoutUntil = parseInt(localStorage.getItem(LOCAL_STORAGE_LOCKOUT_KEY) || '0', 10);
  const now = Date.now();
  if (lockoutUntil > now) {
    return { locked: true, remainingSeconds: Math.ceil((lockoutUntil - now) / 1000) };
  }
  return { locked: false, remainingSeconds: 0 };
}

export function recordFailedAttempt(): { locked: boolean; attempts: number; remainingSeconds: number } {
  if (typeof window === 'undefined') return { locked: false, attempts: 0, remainingSeconds: 0 };

  let attempts = parseInt(localStorage.getItem(LOCAL_STORAGE_FAILED_KEY) || '0', 10) + 1;
  localStorage.setItem(LOCAL_STORAGE_FAILED_KEY, attempts.toString());

  if (attempts >= MAX_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
    localStorage.setItem(LOCAL_STORAGE_LOCKOUT_KEY, lockoutUntil.toString());
    return { locked: true, attempts, remainingSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000) };
  }

  return { locked: false, attempts, remainingSeconds: 0 };
}

export function resetFailedAttempts() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_STORAGE_FAILED_KEY);
  localStorage.removeItem(LOCAL_STORAGE_LOCKOUT_KEY);
}

// ─── Session Management (with timestamp) ────────────────────────────────────

export function createSession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(SESSION_KEY, 'true');
  sessionStorage.setItem(SESSION_TIMESTAMP_KEY, Date.now().toString());
}

export function isSessionValid(): boolean {
  if (typeof window === 'undefined') return false;
  const auth = sessionStorage.getItem(SESSION_KEY);
  if (auth !== 'true') return false;

  // Check session age (auto-expire after SESSION_TIMEOUT_MS)
  const ts = parseInt(sessionStorage.getItem(SESSION_TIMESTAMP_KEY) || '0', 10);
  if (ts === 0) return false;
  if (Date.now() - ts > SESSION_TIMEOUT_MS) {
    destroySession();
    return false;
  }
  return true;
}

export function destroySession(): void {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_TIMESTAMP_KEY);
}
