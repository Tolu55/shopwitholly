'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { X, Star, ShoppingBag, ShieldCheck, Truck, Sparkles, Check } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({ product, onClose }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      onClose();
    }, 900);
  };

  const handleInstantBuy = () => {
    addItem(product, quantity);
    onClose();
    router.push('/checkout');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '900px',
          maxHeight: '90vh',
          borderRadius: 'var(--radius-lg)',
          overflowY: 'auto',
          position: 'relative',
          padding: '0',
          boxShadow: 'var(--shadow-luxury)',
          background: '#FFFFFF',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'var(--color-sand)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            color: 'var(--color-noir)',
            transition: 'background var(--transition-fast)',
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          
          {/* Product Image Frame */}
          <div style={{ position: 'relative', minHeight: '380px', backgroundColor: '#F6F3EC' }}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', bottom: '16px', left: '16px', display: 'flex', gap: '8px' }}>
              <span className="badge-noir">{product.metal}</span>
              {product.gemstone && <span className="badge-gold">{product.gemstone}</span>}
            </div>
          </div>

          {/* Details Column */}
          <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {/* Category */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-dark)', fontWeight: 700 }}>
                  {product.category}
                </span>
                <span style={{ color: '#D4CDC5' }}>&bull;</span>
                <span style={{ fontSize: '12px', color: '#8A827A' }}>
                  SKU: {product.id.toUpperCase()}
                </span>
              </div>

              {/* Title & Price */}
              <h2
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '26px',
                  fontWeight: 600,
                  color: 'var(--color-noir)',
                  lineHeight: 1.25,
                  marginBottom: '10px',
                }}
              >
                {product.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '16px' }}>
                <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--color-noir)', fontFamily: 'var(--font-serif)' }}>
                  ${product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '16px', color: '#9E968E', textDecoration: 'line-through' }}>
                    ${product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span style={{ fontSize: '12px', color: '#2E6B47', fontWeight: 600, background: '#EDF5EF', padding: '2px 8px', borderRadius: '4px' }}>
                  Includes Insured Delivery
                </span>
              </div>

              {/* Reviews */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', color: '#E0A838' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? '#E0A838' : 'none'}
                      stroke="#E0A838"
                    />
                  ))}
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>{product.rating}</span>
                <span style={{ fontSize: '12px', color: '#8A827A' }}>({product.reviewsCount} atelier reviews)</span>
              </div>

              {/* Description */}
              <p style={{ fontSize: '14px', color: '#59524C', lineHeight: 1.6, marginBottom: '20px' }}>
                {product.description}
              </p>

              {/* Specifications Matrix */}
              <div
                style={{
                  background: 'var(--color-sand)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '16px',
                  marginBottom: '24px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  fontSize: '12px',
                }}
              >
                <div>
                  <span style={{ color: '#8A827A', display: 'block' }}>Primary Metal</span>
                  <strong style={{ color: 'var(--color-noir)' }}>{product.metal}</strong>
                </div>
                {product.carat && (
                  <div>
                    <span style={{ color: '#8A827A', display: 'block' }}>Carat Weight</span>
                    <strong style={{ color: 'var(--color-noir)' }}>{product.carat}</strong>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span style={{ color: '#8A827A', display: 'block' }}>Dimensions</span>
                    <strong style={{ color: 'var(--color-noir)' }}>{product.dimensions}</strong>
                  </div>
                )}
                <div>
                  <span style={{ color: '#8A827A', display: 'block' }}>Authenticity</span>
                  <strong style={{ color: '#2E6B47' }}>Certified Hallmark</strong>
                </div>
              </div>

              {/* Materials */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'var(--color-noir)', display: 'block', marginBottom: '8px' }}>
                  Handcrafted Materials:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {product.materials.map((mat, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '12px',
                        background: '#FFFFFF',
                        border: '1px solid var(--border-light)',
                        padding: '4px 10px',
                        borderRadius: 'var(--radius-full)',
                        color: '#473F3A',
                      }}
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div>
              {/* Quantity Stepper */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600 }}>Quantity:</span>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{ padding: '8px 14px', background: 'var(--color-sand)', fontSize: '14px', fontWeight: 700 }}
                  >
                    -
                  </button>
                  <span style={{ padding: '8px 16px', fontSize: '14px', fontWeight: 600 }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    style={{ padding: '8px 14px', background: 'var(--color-sand)', fontSize: '14px', fontWeight: 700 }}
                  >
                    +
                  </button>
                </div>
                <span style={{ fontSize: '12px', color: '#8A827A' }}>
                  ({product.stockCount} available)
                </span>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleAddToCart}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '14px' }}
                >
                  {addedNotice ? (
                    <>
                      <Check size={16} /> Added to Bag
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} /> Add to Bag
                    </>
                  )}
                </button>
                <button
                  onClick={handleInstantBuy}
                  className="btn btn-gold"
                  style={{ flex: 1, padding: '14px' }}
                >
                  Instant Checkout
                </button>
              </div>

              {/* Micro Guarantees */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '16px', fontSize: '11px', color: '#8A827A' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} color="var(--gold-primary)" /> Insured Transit
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Sparkles size={12} color="var(--gold-primary)" /> Velvet Gift Box Included
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
