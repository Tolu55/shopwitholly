'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShoppingBag, Eye, Star, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addItem } = useCart();
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 1200);
  };

  return (
    <div
      className="card-luxury"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
      }}
      onClick={() => onQuickView(product)}
    >
      {/* Product Image Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          backgroundColor: '#F5F1E9',
        }}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          className="product-img"
        />

        {/* Badges */}
        <div style={{ position: 'absolute', top: '14px', left: '14px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
          {product.isBestseller && (
            <span className="badge-gold">Bestseller</span>
          )}
          {product.isNew && (
            <span className="badge-noir">New Arrival</span>
          )}
        </div>

        {/* Quick View Button on Hover */}
        <div
          className="card-action-overlay"
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            right: '12px',
            display: 'flex',
            gap: '8px',
            zIndex: 2,
            transition: 'opacity 0.25s ease, transform 0.25s ease',
          }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            style={{
              flex: 1,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              padding: '10px 14px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 600,
              color: 'var(--color-noir)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'background var(--transition-fast)',
            }}
          >
            <Eye size={14} /> Quick View
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          {/* Category & Metal Tag */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--gold-dark)', fontWeight: 700 }}>
              {product.category}
            </span>
            <span style={{ fontSize: '11px', color: '#8A827A' }}>
              {product.metal}
            </span>
          </div>

          {/* Product Name */}
          <h3
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--color-noir)',
              lineHeight: 1.35,
              marginBottom: '6px',
            }}
          >
            {product.name}
          </h3>

          <p style={{ fontSize: '12px', color: '#797169', marginBottom: '12px', lineHeight: 1.4 }}>
            {product.subtitle}
          </p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', color: '#E0A838' }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  fill={i < Math.floor(product.rating) ? '#E0A838' : 'none'}
                  stroke="#E0A838"
                />
              ))}
            </div>
            <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-noir)' }}>
              {product.rating}
            </span>
            <span style={{ fontSize: '11px', color: '#9E968E' }}>
              ({product.reviewsCount})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #F5F1E9' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-noir)', fontFamily: 'var(--font-serif)' }}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span style={{ fontSize: '13px', color: '#9E968E', textDecoration: 'line-through' }}>
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <span style={{ fontSize: '11px', color: product.stockCount <= 5 ? '#C25D44' : '#4A7C59', fontWeight: 600 }}>
              {product.stockCount <= 5 ? `Only ${product.stockCount} left in atelier` : 'In Stock'}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn btn-sm"
            style={{
              background: addedAnim ? '#2E6B47' : 'var(--color-noir)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-full)',
              padding: '10px 18px',
              transition: 'all 0.2s ease',
            }}
            title="Add to shopping bag"
          >
            {addedAnim ? (
              <>
                <Check size={14} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={14} /> Add
              </>
            )}
          </button>
        </div>
      </div>

      <style jsx>{`
        .card-luxury:hover .product-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
};
