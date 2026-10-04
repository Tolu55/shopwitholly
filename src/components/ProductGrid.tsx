'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/types';
import { CATEGORIES } from '@/data/products';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.materials.some((m) => m.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="catalog" style={{ padding: '40px 0 80px 0' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <span style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
            Curated High Jewelry
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '34px',
              fontWeight: 500,
              color: 'var(--color-noir)',
              margin: '8px 0 12px 0',
            }}
          >
            The Permanent Collection
          </h2>
          <p style={{ color: '#797169', maxWidth: '540px', margin: '0 auto', fontSize: '15px' }}>
            Artisanal precision meet timeless silhouettes. Filter by category or search our private vault of fine earrings, necklaces, watches, and bracelets.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          {/* Category Tabs */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '8px',
              scrollbarWidth: 'none',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                style={{
                  padding: '10px 22px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: selectedCategory === cat.id ? 700 : 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  background: selectedCategory === cat.id ? 'var(--color-noir)' : '#FFFFFF',
                  color: selectedCategory === cat.id ? '#FFFFFF' : 'var(--color-noir)',
                  border: selectedCategory === cat.id ? '1px solid var(--color-noir)' : '1px solid var(--border-light)',
                  boxShadow: selectedCategory === cat.id ? '0 4px 12px rgba(17,17,19,0.15)' : 'var(--shadow-sm)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{cat.label}</span>
                <span
                  style={{
                    fontSize: '11px',
                    opacity: selectedCategory === cat.id ? 0.9 : 0.6,
                    background: selectedCategory === cat.id ? 'rgba(255,255,255,0.2)' : 'var(--color-sand)',
                    padding: '2px 6px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '14px',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#FFFFFF',
              padding: '12px 18px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Search Input */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flex: '1 1 280px',
                background: 'var(--color-sand)',
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--border-light)',
              }}
            >
              <Search size={16} color="#8A827A" />
              <input
                type="text"
                placeholder="Search by gem, gold carat, style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '13px',
                  width: '100%',
                  color: 'var(--color-noir)',
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ fontSize: '11px', color: '#9E968E', padding: '0 4px' }}
                >
                  Clear
                </button>
              )}
            </div>

            {/* Counter & Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '13px', color: '#797169' }}>
                Showing <strong>{filteredProducts.length}</strong> creations
              </span>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={14} color="#8A827A" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-light)',
                    background: '#FFFFFF',
                    fontSize: '13px',
                    color: 'var(--color-noir)',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  <option value="featured">Featured Curations</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '28px',
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-light)',
            }}
          >
            <p style={{ fontSize: '18px', fontFamily: 'var(--font-serif)', color: 'var(--color-noir)', marginBottom: '8px' }}>
              No creations found
            </p>
            <p style={{ fontSize: '14px', color: '#8A827A', marginBottom: '20px' }}>
              Try adjusting your search criteria or explore other jewelry categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="btn btn-outline-dark btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
