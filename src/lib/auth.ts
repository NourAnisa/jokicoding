const LOCAL_STORAGE_PIN_KEY = 'jokicoding_admin_pin';
const LOCAL_STORAGE_FAILED_KEY = 'jokicoding_admin_failed_attempts';
const LOCAL_STORAGE_LOCKOUT_KEY = 'jokicoding_admin_lockout_until';

export function getAdminPin(): string {
  if (typeof window === 'undefined') return 'admin123';
  return localStorage.getItem(LOCAL_STORAGE_PIN_KEY) || 'admin123';
}

export function saveAdminPin(newPin: string): boolean {
  if (typeof window === 'undefined') return false;
  if (!newPin || newPin.trim().length < 4) return false;
  localStorage.setItem(LOCAL_STORAGE_PIN_KEY, newPin.trim());
  return true;
}

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

  if (attempts >= 5) {
    const lockoutUntil = Date.now() + 60 * 1000; // 60 seconds lockout
    localStorage.setItem(LOCAL_STORAGE_LOCKOUT_KEY, lockoutUntil.toString());
    return { locked: true, attempts, remainingSeconds: 60 };
  }

  return { locked: false, attempts, remainingSeconds: 0 };
}

export function resetFailedAttempts() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOCAL_STORAGE_FAILED_KEY);
  localStorage.removeItem(LOCAL_STORAGE_LOCKOUT_KEY);
}

export function verifyAdminPin(inputPin: string): boolean {
  const currentPin = getAdminPin();
  return inputPin.trim() === currentPin;
}
