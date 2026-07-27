'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, Code2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: admin123 (dapat disesuaikan)
    if (pin === 'admin123' || pin === 'admin') {
      sessionStorage.setItem('jokicoding_admin_authenticated', 'true');
      router.push('/admin/dashboard');
    } else {
      setError('PIN/Password Admin salah! (Default PIN: admin123)');
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
      <div className="glass-panel" style={{
        maxWidth: '420px',
        width: '100%',
        padding: '36px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          background: 'var(--gradient-primary)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto',
          boxShadow: '0 4px 20px rgba(99, 102, 241, 0.4)'
        }}>
          <ShieldCheck size={28} />
        </div>

        <h2 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '6px' }}>Portal Admin</h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          Masukkan PIN / Password Keamanan Admin untuk mengelola jasa & pesanan.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                placeholder="Masukkan PIN Admin (Default: admin123)"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError('');
                }}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: error ? '1px solid #f43f5e' : '1px solid var(--border-color)',
                  color: '#fff',
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
            </div>
            {error && (
              <p style={{ color: '#f43f5e', fontSize: '0.78rem', marginTop: '6px', textAlign: 'left' }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
          >
            Masuk ke Dashboard <ArrowRight size={16} />
          </button>
        </form>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '20px' }}>
          PIN Default: <code>admin123</code> (Bisa diganti di dashboard)
        </p>
      </div>
    </div>
  );
}
