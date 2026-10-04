'use client';

import React from 'react';
import { X, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle, loading, setIsGuideModalOpen } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsAuthModalOpen(false)}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          borderRadius: 'var(--radius-lg)',
          padding: '36px 32px',
          background: '#FFFFFF',
          position: 'relative',
          boxShadow: 'var(--shadow-luxury)',
          textAlign: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#797169',
          }}
        >
          <X size={18} />
        </button>

        {/* Brand Crest */}
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'var(--gold-subtle)',
            border: '1px solid var(--gold-border)',
            margin: '0 auto 16px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-dark)',
          }}
        >
          <Sparkles size={24} />
        </div>

        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 600, color: 'var(--color-noir)', marginBottom: '8px' }}>
          Welcome to ShopWithOlly
        </h3>
        <p style={{ fontSize: '13px', color: '#797169', lineHeight: 1.5, marginBottom: '28px' }}>
          Sign in to access your private atelier vault, saved wishlists, and track insured fine jewelry shipments.
        </p>

        {/* Google Sign-in Button */}
        <button
          onClick={() => loginWithGoogle()}
          disabled={loading}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '14px 20px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid #D6CEBE',
            background: '#FFFFFF',
            fontSize: '14px',
            fontWeight: 600,
            color: 'var(--color-noir)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            cursor: 'pointer',
            transition: 'all var(--transition-fast)',
            marginBottom: '20px',
          }}
        >
          {/* Official Google 'G' SVG Logo */}
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{loading ? 'Authenticating...' : 'Continue with Google'}</span>
        </button>

        {/* Security & Setup notice */}
        <div style={{ background: 'var(--color-sand)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', fontSize: '11px', color: '#797169', textAlign: 'left', display: 'flex', gap: '8px' }}>
          <ShieldCheck size={16} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <span>Powered by <strong>Google Cloud Console OAuth 2.0</strong> &amp; <strong>Supabase Auth</strong>.</span>
            <button
              onClick={() => {
                setIsAuthModalOpen(false);
                setIsGuideModalOpen(true);
              }}
              style={{ display: 'block', color: 'var(--gold-dark)', fontWeight: 600, textDecoration: 'underline', marginTop: '4px' }}
            >
              Learn how to configure your credentials &rarr;
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
