'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const CartDrawer: React.FC = () => {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    shipping,
    total,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoFeedback(res);
    if (res.success) setPromoInput('');
  };

  const handleCheckoutNav = () => {
    setIsCartOpen(false);
    router.push('/checkout');
  };

  const freeShippingThreshold = 250;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="modal-overlay" style={{ justifyContent: 'flex-end', padding: 0 }} onClick={() => setIsCartOpen(false)}>
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          background: '#FFFFFF',
          boxShadow: 'var(--shadow-luxury)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideDrawer 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-sand)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--gold-dark)" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, color: 'var(--color-noir)' }}>
              Your Atelier Bag
            </h3>
            <span style={{ fontSize: '13px', color: '#8A827A' }}>({items.length})</span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-noir)',
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ padding: '14px 28px', background: '#FCFAF7', borderBottom: '1px solid #EFEAE1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
            <span>
              {remainingForFreeShipping > 0 ? (
                <>Add <strong>${remainingForFreeShipping.toLocaleString()}</strong> for complimentary insured shipping</>
              ) : (
                <strong style={{ color: '#2E6B47' }}>✨ You unlocked complimentary insured shipping!</strong>
              )}
            </span>
            <span style={{ fontWeight: 700 }}>{Math.round(shippingProgress)}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#EAE4D8', borderRadius: '3px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${shippingProgress}%`,
                height: '100%',
                background: 'var(--gold-metallic)',
                transition: 'width 0.4s ease',
              }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 10px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--color-sand)',
                  margin: '0 auto 16px auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9E968E',
                }}
              >
                <ShoppingBag size={28} />
              </div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', marginBottom: '8px' }}>
                Your bag is empty
              </h4>
              <p style={{ fontSize: '13px', color: '#8A827A', marginBottom: '24px', lineHeight: 1.5 }}>
                Explore our fine collections of handcrafted earrings, necklaces, watches, and bracelets.
              </p>
              <button onClick={() => setIsCartOpen(false)} className="btn btn-outline-dark btn-sm">
                Explore Creations
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #F5F1E9',
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      position: 'relative',
                      width: '74px',
                      height: '74px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      backgroundColor: '#F5F1E9',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="80px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-noir)', lineHeight: 1.3 }}>
                          {product.name}
                        </h4>
                        <span style={{ fontSize: '11px', color: '#8A827A', textTransform: 'capitalize' }}>
                          {product.category} &bull; {product.metal}
                        </span>
                      </div>
                      <button
                        onClick={() => removeItem(product.id)}
                        style={{ color: '#A39B93', padding: '4px', cursor: 'pointer' }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      {/* Quantity Stepper */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          border: '1px solid var(--border-light)',
                          borderRadius: '6px',
                          overflow: 'hidden',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          style={{ padding: '3px 10px', background: 'var(--color-sand)', fontSize: '13px' }}
                        >
                          -
                        </button>
                        <span style={{ padding: '3px 10px', fontSize: '12px', fontWeight: 600 }}>{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          style={{ padding: '3px 10px', background: 'var(--color-sand)', fontSize: '13px' }}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                        ${(product.price * quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer & Checkout */}
        {items.length > 0 && (
          <div
            style={{
              padding: '24px 28px',
              borderTop: '1px solid var(--border-light)',
              background: '#FFFFFF',
              boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
            }}
          >
            {/* Promo Code Applicator */}
            <div style={{ marginBottom: '18px' }}>
              {appliedPromo ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: '#FAF6ED',
                    border: '1px solid var(--gold-border)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--gold-dark)', fontWeight: 600 }}>
                    <Tag size={13} />
                    <span>Promo <strong>{appliedPromo}</strong> active</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    style={{ fontSize: '11px', color: '#9E968E', textDecoration: 'underline' }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. OLLYLUXE10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-light)',
                      fontSize: '12px',
                      outline: 'none',
                    }}
                  />
                  <button type="submit" className="btn btn-sm btn-outline-dark">
                    Apply
                  </button>
                </form>
              )}

              {promoFeedback && !appliedPromo && (
                <p style={{ fontSize: '11px', color: promoFeedback.success ? '#2E6B47' : '#B33927', marginTop: '6px' }}>
                  {promoFeedback.message}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#665F58' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: 'var(--color-noir)' }}>${subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9E6D24', fontWeight: 600 }}>
                  <span>Discount</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#665F58' }}>
                <span>Insured Shipping</span>
                <span style={{ fontWeight: 600, color: shipping === 0 ? '#2E6B47' : 'var(--color-noir)' }}>
                  {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '10px',
                  borderTop: '1px solid var(--border-light)',
                  fontSize: '16px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--color-noir)',
                }}
              >
                <span>Estimated Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleCheckoutNav}
              className="btn btn-gold"
              style={{ width: '100%', padding: '16px', borderRadius: 'var(--radius-sm)' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '12px', fontSize: '11px', color: '#8A827A' }}>
              <ShieldCheck size={13} color="var(--gold-primary)" />
              <span>Discreet insured shipping &bull; 30-day atelier returns</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
