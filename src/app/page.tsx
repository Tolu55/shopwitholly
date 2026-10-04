'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { ProductQuickViewModal } from '@/components/ProductQuickViewModal';
import { Footer } from '@/components/Footer';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Sparkles, Shield, HeartHandshake, Gem } from 'lucide-react';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const handleExploreClick = () => {
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Global Navigation */}
      <Header
        activeCategory={selectedCategory}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
      />

      <main style={{ flex: 1 }}>
        {/* Hero Banner Section */}
        <Hero onExploreClick={handleExploreClick} />

        {/* Curated Product Vault / Catalog */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* High Jewelry Atelier Craftsmanship Narrative */}
        <section style={{ background: 'var(--color-sand-muted)', padding: '90px 0', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center' }}>
              
              {/* Image Collage Frame */}
              <div style={{ position: 'relative', height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-luxury)', border: '1px solid rgba(197,160,89,0.3)' }}>
                <Image
                  src="/images/necklace_emerald_solitaire.jpg"
                  alt="ShopWithOlly Craftsmanship"
                  fill
                  sizes="500px"
                  style={{ objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px', background: 'rgba(17, 17, 19, 0.85)', backdropFilter: 'blur(10px)', padding: '16px 20px', borderRadius: 'var(--radius-sm)', color: '#FFFFFF', border: '1px solid rgba(197,160,89,0.4)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold-light)', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    <Gem size={13} /> Artisanal Mastery
                  </div>
                  <p style={{ fontSize: '13px', margin: '4px 0 0 0', color: '#ECE5DB' }}>
                    Over 80 hours of meticulous hand-setting for each emerald halo and diamond tennis link.
                  </p>
                </div>
              </div>

              {/* Story Narrative */}
              <div>
                <span style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
                  The ShopWithOlly Heritage
                </span>
                <h2
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: 'clamp(28px, 4vw, 40px)',
                    fontWeight: 500,
                    lineHeight: 1.25,
                    color: 'var(--color-noir)',
                    margin: '8px 0 18px 0',
                  }}
                >
                  Jewelry Conceived to be Cherished Across Generations.
                </h2>
                <p style={{ color: '#5C544E', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>
                  At ShopWithOlly, every creation celebrates the feminine spirit. From sculpted 18-karat solid gold huggies and luminous organic baroque pearls, to Swiss horological craftsmanship and radiant diamond cuffs—our creations transition seamlessly from daytime meetings to gala evenings.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Shield size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ fontSize: '14px', display: 'block', color: 'var(--color-noir)' }}>Hallmarked Purity</strong>
                      <span style={{ fontSize: '12px', color: '#797169' }}>Stamped 750 (18K) &amp; certified</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <HeartHandshake size={20} color="var(--gold-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <strong style={{ fontSize: '14px', display: 'block', color: 'var(--color-noir)' }}>Ethical Sourcing</strong>
                      <span style={{ fontSize: '12px', color: '#797169' }}>Conflict-free diamonds &amp; pearls</span>
                    </div>
                  </div>
                </div>

                <button onClick={handleExploreClick} className="btn btn-primary">
                  <span>Explore All Creations</span>
                  <Sparkles size={15} color="var(--gold-light)" />
                </button>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
