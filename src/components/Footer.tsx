'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, Sparkles, Mail, Globe, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{ background: 'var(--color-noir-deep)', color: '#D4CDC5', paddingTop: '70px', paddingBottom: '40px', borderTop: '1px solid rgba(197, 160, 89, 0.2)' }}>
      <div className="container">
        
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '60px',
          }}
        >
          {/* Brand Col */}
          <div style={{ maxWidth: '320px' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', letterSpacing: '2px', color: '#FFFFFF', textTransform: 'uppercase', marginBottom: '14px' }}>
              ShopWith<span style={{ color: 'var(--gold-primary)' }}>Olly</span>
            </h3>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#A69E96', marginBottom: '20px' }}>
              Fine female jewelry, handcrafted in 18k solid gold, lustrous baroque pearls, and certified natural gemstones. Designed for modern poise and timeless elegance.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-primary)',
                  cursor: 'pointer',
                }}
                title="Global Salons"
              >
                <Globe size={16} />
              </span>
              <span
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-primary)',
                  cursor: 'pointer',
                }}
                title="Share Collection"
              >
                <Share2 size={16} />
              </span>
            </div>
          </div>

          {/* Collections Col */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-light)', marginBottom: '18px', fontWeight: 700 }}>
              The Collections
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li>
                <a href="#catalog" style={{ color: '#D4CDC5', transition: 'color 0.2s' }}>
                  Earrings &amp; Baroque Drops
                </a>
              </li>
              <li>
                <a href="#catalog" style={{ color: '#D4CDC5', transition: 'color 0.2s' }}>
                  Emerald &amp; Gold Necklaces
                </a>
              </li>
              <li>
                <a href="#catalog" style={{ color: '#D4CDC5', transition: 'color 0.2s' }}>
                  Swiss-Movement Wristwatches
                </a>
              </li>
              <li>
                <a href="#catalog" style={{ color: '#D4CDC5', transition: 'color 0.2s' }}>
                  Diamond Tennis Bracelets &amp; Cuffs
                </a>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-light)', marginBottom: '18px', fontWeight: 700 }}>
              Client Concierge
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
              <li>
                <span style={{ color: '#D4CDC5' }}>Complimentary Insured Shipping</span>
              </li>
              <li>
                <span style={{ color: '#D4CDC5' }}>Ring &amp; Wrist Sizing Guide</span>
              </li>
              <li>
                <span style={{ color: '#D4CDC5' }}>30-Day Atelier Guarantee</span>
              </li>
              <li>
                <span style={{ color: '#D4CDC5' }}>Certificate of Gemological Hallmarks</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / Private Club */}
          <div>
            <h4 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-light)', marginBottom: '18px', fontWeight: 700 }}>
              The Private Salon
            </h4>
            <p style={{ fontSize: '13px', color: '#A69E96', lineHeight: 1.6, marginBottom: '14px' }}>
              Receive private invitations to seasonal high-jewelry drops and private showroom trunk shows.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for joining our private salon.'); }} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(197, 160, 89, 0.3)',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  color: '#FFFFFF',
                  fontSize: '13px',
                  outline: 'none',
                  flex: 1,
                }}
              />
              <button type="submit" className="btn btn-gold btn-sm">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div
          style={{
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            fontSize: '12px',
            color: '#8A827A',
          }}
        >
          <div>
            &copy; {new Date().getFullYear()} ShopWithOlly &bull; Haute Joaillerie. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Google Cloud OAuth Protected</span>
            <span>Mailgun Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
