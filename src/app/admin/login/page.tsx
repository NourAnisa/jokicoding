'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdminPin, isLockedOut, recordFailedAttempt, resetFailedAttempts } from '@/lib/auth';
import { ShieldCheck, Lock, ArrowRight, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [lockoutSec, setLockoutSec] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const status = isLockedOut();
    if (status.locked) {
      setLockoutSec(status.remainingSeconds);
    }
  }, []);

  useEffect(() => {
    if (lockoutSec <= 0) return;
    const timer = setInterval(() => {
      setLockoutSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          resetFailedAttempts();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSec]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const lockoutStatus = isLockedOut();
    if (lockoutStatus.locked) {
      setLockoutSec(lockoutStatus.remainingSeconds);
      setError(`Terlalu banyak percobaan gagal. Akses dikunci sementara selama ${lockoutStatus.remainingSeconds} detik.`);
      return;
    }

    if (verifyAdminPin(pin)) {
      resetFailedAttempts();
      sessionStorage.setItem('jokicoding_admin_authenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      const attempt = recordFailedAttempt();
      if (attempt.locked) {
        setLockoutSec(attempt.remainingSeconds);
        setError('Terlalu banyak percobaan gagal! Login diblokir sementara selama 60 detik demi keamanan.');
      } else {
        setError(`PIN/Password Admin salah! (${5 - attempt.attempts} kesempatan tersisa).`);
      }
    }
  };

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="card" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '36px',
        textAlign: 'center',
        background: 'var(--white)',
        border: '1px solid var(--paper-3)',
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--ink)',
          color: 'var(--paper)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
        }}>
          <ShieldCheck size={28} />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}>Portal Admin Keamanan</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--ink-3)', marginBottom: '24px' }}>
          Masukkan PIN / Password rahasia Admin Anda untuk mengelola toko & pesanan.
        </p>

        {lockoutSec > 0 && (
          <div style={{
            padding: '12px 16px',
            borderRadius: 'var(--radius)',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#991b1b',
            fontSize: '0.85rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            textAlign: 'left'
          }}>
            <AlertTriangle size={18} />
            <div>
              <strong>Akses Dibatasi Sementara:</strong>
              <div>Coba lagi dalam <strong>{lockoutSec} detik</strong>.</div>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)' }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                disabled={lockoutSec > 0}
                placeholder="Masukkan Password Admin"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                className="form-input"
                style={{
                  paddingLeft: '44px',
                  borderColor: error ? '#dc2626' : undefined,
                }}
              />
            </div>
            {error && (
              <p style={{ color: '#dc2626', fontSize: '0.78rem', marginTop: '6px', textAlign: 'left', fontWeight: 600 }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={lockoutSec > 0}
            className="btn btn-orange"
            style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: lockoutSec > 0 ? 0.6 : 1 }}
          >
            Masuk ke Dashboard Admin <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
