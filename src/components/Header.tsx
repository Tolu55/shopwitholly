'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Sparkles, Settings, Menu, X, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export const Header: React.FC<{ activeCategory?: string; onSelectCategory?: (cat: string) => void }> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, loginWithGoogle, logout, setIsGuideModalOpen, setIsAuthModalOpen } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'All Creations' },
    { id: 'earrings', label: 'Earrings' },
    { id: 'necklaces', label: 'Necklaces' },
    { id: 'wristwatches', label: 'Wristwatches' },
    { id: 'bracelets', label: 'Bracelets' },
  ];

  const handleCategoryClick = (catId: string) => {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(255, 255, 255, 0.94)', backdropFilter: 'blur(16px)', borderBottom: '1px solid var(--border-light)' }}>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <span>Complimentary insured delivery on orders over $250</span>
        <span style={{ opacity: 0.5 }}>&bull;</span>
        <span>Use code <strong>OLLYLUXE10</strong> for 10% off</span>
        <button
          onClick={() => setIsGuideModalOpen(true)}
          style={{
            marginLeft: '8px',
            fontSize: '11px',
            color: 'var(--gold-light)',
            textDecoration: 'underline',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          title="View Google Cloud & Supabase setup guide"
        >
          <Settings size={12} /> Cloud Setup Guide
        </button>
      </div>

      {/* Main Navigation */}
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{ display: 'none', padding: '8px', color: 'var(--color-noir)' }}
          className="mobile-toggle"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Brand Logo */}
        <Link href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textDecoration: 'none' }}>
          <span style={{ fontFamily: 'var(--font-serif)', fontSize: '26px', fontWeight: 600, letterSpacing: '2px', color: 'var(--color-noir)', textTransform: 'uppercase' }}>
            ShopWith<span style={{ color: 'var(--gold-primary)' }}>Olly</span>
          </span>
          <span style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#8A827A', marginTop: '-2px' }}>
            Haute Joaillerie &bull; Paris &bull; New York
          </span>
        </Link>

        {/* Desktop Category Navigation */}
        <nav style={{ display: 'flex', gap: '32px', alignItems: 'center' }} className="desktop-nav">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '13px',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                color: activeCategory === cat.id ? 'var(--gold-primary)' : 'var(--color-noir)',
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                padding: '6px 0',
                position: 'relative',
                transition: 'color var(--transition-fast)',
                borderBottom: activeCategory === cat.id ? '2px solid var(--gold-primary)' : '2px solid transparent',
              }}
            >
              {cat.label}
            </button>
          ))}
        </nav>

        {/* Actions (Auth & Cart) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          
          {/* Cloud Config Badge */}
          <button
            onClick={() => setIsGuideModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--color-sand)',
              border: '1px solid var(--border-light)',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-noir)',
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
            title="Configure Supabase, Mailgun, and Google OAuth"
          >
            <ShieldCheck size={14} color="var(--gold-primary)" />
            <span className="hide-on-mobile">Setup Status</span>
          </button>

          {/* User Profile / Google Sign-in */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--gold-subtle)',
                  border: '1px solid var(--gold-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '14px',
                  color: 'var(--gold-dark)',
                  overflow: 'hidden',
                }}
                title={`Signed in as ${user.name} (${user.email})`}
              >
                {user.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <button
                onClick={logout}
                style={{
                  fontSize: '11px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: '#8A827A',
                  cursor: 'pointer',
                }}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid rgba(17, 17, 19, 0.2)',
                background: '#FFFFFF',
                fontSize: '12px',
                fontWeight: 600,
                color: 'var(--color-noir)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
              }}
            >
              <User size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Bag / Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--color-noir)',
              color: '#FFFFFF',
              boxShadow: '0 4px 12px rgba(17, 17, 19, 0.2)',
              cursor: 'pointer',
              transition: 'transform var(--transition-fast)',
            }}
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--gold-primary)',
                  color: 'var(--color-noir-deep)',
                  fontSize: '11px',
                  fontWeight: 800,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                }}
              >
                {totalItems}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div style={{ background: '#FFFFFF', borderTop: '1px solid var(--border-light)', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                textAlign: 'left',
                fontSize: '15px',
                fontWeight: activeCategory === cat.id ? 700 : 500,
                color: activeCategory === cat.id ? 'var(--gold-primary)' : 'var(--color-noir)',
                padding: '8px 0',
                borderBottom: '1px solid #F5F1E9',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .hide-on-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};
