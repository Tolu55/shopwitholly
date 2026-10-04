'use client';

import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, Copy, Check, ExternalLink, Database, Mail, Key } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { isSupabaseConfigured } from '@/lib/supabase';

export const GoogleCloudConsoleGuideModal: React.FC = () => {
  const { isGuideModalOpen, setIsGuideModalOpen } = useAuth();
  const [activeTab, setActiveTab] = useState<'google' | 'supabase' | 'mailgun'>('google');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!isGuideModalOpen) return null;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsGuideModalOpen(false)}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '88vh',
          borderRadius: 'var(--radius-lg)',
          overflowY: 'auto',
          background: '#FFFFFF',
          padding: '32px',
          position: 'relative',
          boxShadow: 'var(--shadow-luxury)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsGuideModalOpen(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--color-sand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-noir)',
          }}
        >
          <X size={18} />
        </button>

        <div style={{ marginBottom: '24px' }}>
          <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
            Architecture &amp; Cloud Integration
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 600, color: 'var(--color-noir)', margin: '4px 0 8px 0' }}>
            ShopWithOlly Cloud Services Guide
          </h2>
          <p style={{ fontSize: '14px', color: '#797169' }}>
            Configure your production database, transactional emails, and Google Cloud authentication.
          </p>
        </div>

        {/* Status Indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '28px' }}>
          <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', background: 'var(--color-sand)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Database size={16} color="var(--gold-primary)" />
              <strong style={{ fontSize: '13px' }}>Supabase / Neon DB</strong>
            </div>
            <span style={{ fontSize: '12px', color: isSupabaseConfigured ? '#2E6B47' : '#B36B24', display: 'flex', alignItems: 'center', gap: '4px' }}>
              {isSupabaseConfigured ? <CheckCircle size={13} /> : <AlertCircle size={13} />}
              {isSupabaseConfigured ? 'Connected to live database' : 'Ready (local storage fallback active)'}
            </span>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', background: 'var(--color-sand)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Mail size={16} color="var(--gold-primary)" />
              <strong style={{ fontSize: '13px' }}>Mailgun API</strong>
            </div>
            <span style={{ fontSize: '12px', color: '#2E6B47', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={13} />
              Preview mode active (live dispatch on key)
            </span>
          </div>

          <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', background: 'var(--color-sand)', border: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Key size={16} color="var(--gold-primary)" />
              <strong style={{ fontSize: '13px' }}>Google Cloud Auth</strong>
            </div>
            <span style={{ fontSize: '12px', color: '#2E6B47', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <CheckCircle size={13} />
              OAuth 2.0 Client Handshake ready
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px', marginBottom: '20px' }}>
          {[
            { id: 'google', label: '1. Google Cloud Console' },
            { id: 'supabase', label: '2. Supabase / Neon DB' },
            { id: 'mailgun', label: '3. Mailgun Email' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: 600,
                background: activeTab === tab.id ? 'var(--color-noir)' : 'transparent',
                color: activeTab === tab.id ? '#FFFFFF' : '#797169',
                transition: 'all 0.2s ease',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Google Cloud Console */}
        {activeTab === 'google' && (
          <div style={{ fontSize: '13px', color: '#4D4742', lineHeight: 1.6 }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-noir)', marginBottom: '8px' }}>
              Setting up Google OAuth via Google Cloud Console
            </h4>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px' }}>
              <li>
                Open the <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>Google Cloud Console Credentials Page <ExternalLink size={12} style={{ display: 'inline' }} /></a>.
              </li>
              <li>
                Select or create a new project: <strong>ShopWithOlly</strong>.
              </li>
              <li>
                Configure the <strong>OAuth consent screen</strong>:
                <ul style={{ paddingLeft: '18px', marginTop: '4px' }}>
                  <li>User type: External</li>
                  <li>App name: <code>ShopWithOlly</code></li>
                  <li>Developer contact email: your email</li>
                  <li>Scopes: <code>userinfo.email</code>, <code>userinfo.profile</code>, <code>openid</code></li>
                </ul>
              </li>
              <li>
                Navigate to <strong>Credentials</strong> &rarr; <strong>Create Credentials</strong> &rarr; <strong>OAuth 2.0 Client IDs</strong>.
              </li>
              <li>
                Select Application type: <strong>Web application</strong>.
              </li>
              <li>
                Add Authorized Redirect URIs:
                <div style={{ background: 'var(--color-sand)', padding: '8px 12px', borderRadius: '6px', margin: '6px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <code>https://&lt;your-supabase-project&gt;.supabase.co/auth/v1/callback</code>
                  <button
                    onClick={() => copyToClipboard('https://<your-supabase-project>.supabase.co/auth/v1/callback', 'uri1')}
                    style={{ fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--gold-dark)' }}
                  >
                    {copiedSection === 'uri1' ? <Check size={12} /> : <Copy size={12} />} Copy
                  </button>
                </div>
              </li>
              <li>
                Copy the generated <strong>Client ID</strong> and <strong>Client Secret</strong> into your Supabase Dashboard under <em>Authentication &rarr; Providers &rarr; Google</em>.
              </li>
            </ol>
          </div>
        )}

        {/* Tab 2: Supabase / Neon */}
        {activeTab === 'supabase' && (
          <div style={{ fontSize: '13px', color: '#4D4742', lineHeight: 1.6 }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-noir)', marginBottom: '8px' }}>
              Database Migration &amp; Configuration
            </h4>
            <p style={{ marginBottom: '12px' }}>
              A full PostgreSQL schema has been created in <code>supabase/schema.sql</code>. It includes orders, order items, product catalog, profiles, and Row Level Security (RLS) policies.
            </p>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <li>Create a project at <a href="https://supabase.com" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>supabase.com</a> or <a href="https://neon.tech" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>neon.tech</a>.</li>
              <li>Navigate to the <strong>SQL Editor</strong> in your dashboard.</li>
              <li>Paste the contents of <code>supabase/schema.sql</code> and click <strong>Run</strong>.</li>
              <li>Go to <strong>Project Settings &rarr; API</strong> and copy your Project URL and anon public key into <code>.env.local</code>:</li>
            </ol>
            <div style={{ background: '#1B1B1E', color: '#E5D2A6', padding: '12px 16px', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace', position: 'relative' }}>
              NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co<br />
              NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
            </div>
          </div>
        )}

        {/* Tab 3: Mailgun */}
        {activeTab === 'mailgun' && (
          <div style={{ fontSize: '13px', color: '#4D4742', lineHeight: 1.6 }}>
            <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-noir)', marginBottom: '8px' }}>
              Configuring Transactional Order Confirmation Emails
            </h4>
            <p style={{ marginBottom: '12px' }}>
              ShopWithOlly includes a luxury HTML order receipt template. It automatically dispatches through Mailgun API or provides a high-fidelity preview mode when developing locally.
            </p>
            <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              <li>Sign in to <a href="https://app.mailgun.com" target="_blank" rel="noreferrer" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>app.mailgun.com</a>.</li>
              <li>Go to <strong>Sending &rarr; Domains</strong> and copy your sending domain.</li>
              <li>Go to <strong>API Keys</strong> and create a Private API Key.</li>
              <li>Update your <code>.env.local</code> file:</li>
            </ol>
            <div style={{ background: '#1B1B1E', color: '#E5D2A6', padding: '12px 16px', borderRadius: '8px', fontSize: '12px', fontFamily: 'monospace', position: 'relative' }}>
              MAILGUN_API_KEY=key-your-private-mailgun-api-key<br />
              MAILGUN_DOMAIN=mg.yourjewelrydomain.com<br />
              MAILGUN_FROM_EMAIL=ShopWithOlly &lt;orders@mg.yourjewelrydomain.com&gt;
            </div>
          </div>
        )}

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={() => setIsGuideModalOpen(false)} className="btn btn-primary btn-sm">
            Got It, Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
