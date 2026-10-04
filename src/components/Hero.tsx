'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles, Shield, Truck, Award } from 'lucide-react';

export const Hero: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '40px 0 60px 0' }}>
      <div className="container">
        <div
          style={{
            position: 'relative',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            minHeight: '520px',
            display: 'flex',
            alignItems: 'center',
            boxShadow: 'var(--shadow-luxury)',
            border: '1px solid rgba(197, 160, 89, 0.3)',
          }}
        >
          {/* Background Image */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <Image
              src="/images/hero_banner.jpg"
              alt="ShopWithOlly Haute Fine Jewelry Collection"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
            />
            {/* Elegant Luxury Gradient Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(17, 17, 19, 0.88) 0%, rgba(17, 17, 19, 0.65) 45%, rgba(17, 17, 19, 0.15) 100%)',
              }}
            />
          </div>

          {/* Editorial Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              padding: '60px 50px',
              maxWidth: '680px',
              color: '#FFFFFF',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(197, 160, 89, 0.2)',
                border: '1px solid var(--gold-border)',
                backdropFilter: 'blur(8px)',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--gold-light)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '20px',
              }}
            >
              <Sparkles size={13} color="var(--gold-primary)" />
              The Autumn / Winter High Jewelry Edition
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                lineHeight: 1.15,
                fontWeight: 500,
                letterSpacing: '-0.5px',
                marginBottom: '18px',
                color: '#FCFAF7',
              }}
            >
              Timeless Radiance, Sculpted for the Modern Muse.
            </h1>

            <p
              style={{
                fontSize: '16px',
                color: '#D4CDC5',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '520px',
              }}
            >
              Discover bespoke 18-karat gold necklaces, baroque pearl drops, Swiss-crafted timepieces, and hand-set diamond bracelets designed to elevate every silhouette.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={onExploreClick} className="btn btn-gold">
                Explore Creations
              </button>
              <button
                onClick={onExploreClick}
                className="btn"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#FFFFFF',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                View Bestsellers
              </button>
            </div>
          </div>
        </div>

        {/* Brand Pillars Strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          {[
            {
              icon: <Sparkles size={20} color="var(--gold-primary)" />,
              title: '18K Solid Gold & Gems',
              desc: 'Ethically sourced precious metals and certified natural stones',
            },
            {
              icon: <Truck size={20} color="var(--gold-primary)" />,
              title: 'Complimentary Insured Transit',
              desc: 'Armored discreet delivery on all orders over $250',
            },
            {
              icon: <Shield size={20} color="var(--gold-primary)" />,
              title: 'Bespoke Atelier Packaging',
              desc: 'Signature velvet keepsake box with certificate of authenticity',
            },
            {
              icon: <Award size={20} color="var(--gold-primary)" />,
              title: 'Lifetime Guarantee',
              desc: 'Complimentary annual cleaning and prong inspection',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: '#FFFFFF',
                padding: '20px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-light)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  background: 'var(--color-sand)',
                  padding: '10px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {item.icon}
              </div>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-noir)', marginBottom: '3px' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '12px', color: '#797169', lineHeight: 1.4 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
