'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ShieldCheck, Lock, CreditCard, Sparkles, Check, Truck, AlertCircle } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { CustomerDetails } from '@/types';
import { saveOrderLocally } from '@/lib/db';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discount, appliedPromo, shipping, tax, total, clearCart } = useCart();
  const { user, loginWithGoogle } = useAuth();

  const [formData, setFormData] = useState<CustomerDetails>({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'google_pay' | 'apple_pay'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Autofill user details if logged in with Google
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.name,
        email: prev.email || user.email,
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage('Your atelier shopping bag is empty.');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      setErrorMessage('Please provide all required shipping and contact details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
          promoCode: appliedPromo,
          paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to process checkout transaction');
      }

      // Save order locally for instant client access and persistence
      saveOrderLocally(data.order);

      // Clear the shopping cart
      clearCart();

      // Navigate to order confirmation page
      router.push(`/order-success/${data.order.id}`);
    } catch (err: unknown) {
      console.error('Checkout error:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Checkout encountered an unexpected error.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !isSubmitting) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '28px', marginBottom: '12px' }}>
            Your Shopping Bag is Empty
          </h2>
          <p style={{ color: '#797169', fontSize: '14px', marginBottom: '24px' }}>
            Please select your desired fine earrings, necklaces, watches, or bracelets before proceeding to checkout.
          </p>
          <Link href="/" className="btn btn-gold">
            Return to Atelier Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-sand)', paddingBottom: '80px' }}>
      
      {/* Checkout Minimal Luxury Header */}
      <header style={{ background: '#FFFFFF', borderBottom: '1px solid var(--border-light)', padding: '18px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#665F58', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <ArrowLeft size={16} /> Return to Shop
          </Link>

          <Link href="/" style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            ShopWith<span style={{ color: 'var(--gold-primary)' }}>Olly</span>
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#2E6B47', fontWeight: 600 }}>
            <Lock size={14} /> 256-Bit Encrypted
          </div>
        </div>
      </header>

      {/* Main Checkout Grid */}
      <main className="container" style={{ marginTop: '36px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '40px', alignItems: 'start' }}>
          
          {/* Left Column: Form Fields */}
          <form onSubmit={handleSubmitOrder} style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
            
            {/* Express Google Checkout Banner */}
            {!user && (
              <div
                style={{
                  background: '#FFFFFF',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px 24px',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 700, marginBottom: '2px' }}>
                    Express Checkout with Google
                  </h4>
                  <p style={{ fontSize: '12px', color: '#797169' }}>
                    Autofill your name and email instantly.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => loginWithGoogle()}
                  className="btn btn-outline-dark btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google Autofill</span>
                </button>
              </div>
            )}

            {/* Error Message Alert */}
            {errorMessage && (
              <div style={{ background: '#FDF2F0', border: '1px solid #E57373', borderRadius: 'var(--radius-sm)', padding: '14px 18px', display: 'flex', gap: '10px', alignItems: 'center', color: '#B3261E', fontSize: '13px' }}>
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Step 1: Customer Information */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--color-noir)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  1
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600 }}>
                  Contact Information
                </h3>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Olivia Sterling"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address (for Mailgun receipt) *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="olivia@luxury.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Phone Number (for courier delivery updates) *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="+1 (555) 234-5678"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
            </div>

            {/* Step 2: Insured Delivery Address */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--color-noir)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  2
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600 }}>
                  Insured Delivery Address
                </h3>
              </div>

              <div className="form-group">
                <label className="form-label">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="e.g. 740 Park Avenue"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Apartment, Suite, Unit (optional)</label>
                <input
                  type="text"
                  name="apartment"
                  placeholder="Penthouse B"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label className="form-label">City *</label>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="New York"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State / Region</label>
                  <input
                    type="text"
                    name="state"
                    placeholder="NY"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Postal Code *</label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    placeholder="10021"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Country</label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Canada">Canada</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="United Arab Emirates">United Arab Emirates</option>
                </select>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'var(--color-noir)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                  3
                </span>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600 }}>
                  Payment Method
                </h3>
              </div>

              {/* Payment Selectors */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
                {[
                  { id: 'card', label: 'Credit Card', icon: <CreditCard size={16} /> },
                  { id: 'google_pay', label: 'Google Pay', icon: <span>GPay</span> },
                  { id: 'apple_pay', label: 'Apple Pay', icon: <span>Pay</span> },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    style={{
                      padding: '12px 8px',
                      borderRadius: 'var(--radius-sm)',
                      border: paymentMethod === m.id ? '2px solid var(--gold-primary)' : '1px solid var(--border-light)',
                      background: paymentMethod === m.id ? 'var(--gold-subtle)' : '#FFFFFF',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: 'var(--color-noir)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    {m.icon}
                    <span>{m.label}</span>
                  </button>
                ))}
              </div>

              {/* Credit Card inputs */}
              {paymentMethod === 'card' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'var(--color-sand)', padding: '18px', borderRadius: 'var(--radius-sm)' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Expiration (MM/YY)</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Security CVC</label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="form-input"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'google_pay' && (
                <div style={{ textAlign: 'center', padding: '24px', background: 'var(--color-sand)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: '13px', color: '#59524C', marginBottom: '8px' }}>
                    Google Cloud Console authenticated wallet ready.
                  </p>
                  <span style={{ fontSize: '12px', color: '#2E6B47', fontWeight: 600 }}>
                    &bull; Google Pay authorization will finalize on order confirmation
                  </span>
                </div>
              )}

              {paymentMethod === 'apple_pay' && (
                <div style={{ textAlign: 'center', padding: '24px', background: 'var(--color-sand)', borderRadius: 'var(--radius-sm)' }}>
                  <p style={{ fontSize: '13px', color: '#59524C', marginBottom: '8px' }}>
                    Apple Pay device biometric token ready.
                  </p>
                  <span style={{ fontSize: '12px', color: '#2E6B47', fontWeight: 600 }}>
                    &bull; Touch ID / Face ID verification simulation active
                  </span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-gold btn-lg"
              style={{ width: '100%', borderRadius: 'var(--radius-sm)', padding: '18px' }}
            >
              {isSubmitting ? (
                <span>Confirming Order with Atelier &amp; Mailgun...</span>
              ) : (
                <>
                  <Lock size={16} /> Complete Order &bull; ${total.toLocaleString()}
                </>
              )}
            </button>

          </form>

          {/* Right Column: Order Summary & Review */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '20px', fontWeight: 600, marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                Order Summary ({items.length})
              </h3>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '360px', overflowY: 'auto', marginBottom: '20px', paddingRight: '4px' }}>
                {items.map(({ product, quantity }) => (
                  <div key={product.id} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#F5F1E9', flexShrink: 0 }}>
                      <Image src={product.image} alt={product.name} fill sizes="60px" style={{ objectFit: 'cover' }} />
                      <span style={{ position: 'absolute', top: '2px', right: '2px', background: 'var(--color-noir)', color: '#FFF', fontSize: '10px', width: '18px', height: '18px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {quantity}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-noir)', lineHeight: 1.3 }}>
                        {product.name}
                      </h4>
                      <span style={{ fontSize: '11px', color: '#8A827A' }}>
                        {product.metal} &bull; Qty {quantity}
                      </span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                      ${(product.price * quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', borderTop: '1px solid var(--border-light)', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#665F58' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-noir)' }}>${subtotal.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9E6D24', fontWeight: 600 }}>
                    <span>Promotion ({appliedPromo})</span>
                    <span>-${discount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#665F58' }}>
                  <span>Discreet Insured Courier</span>
                  <span style={{ fontWeight: 600, color: shipping === 0 ? '#2E6B47' : 'var(--color-noir)' }}>
                    {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#665F58' }}>
                  <span>Estimated Sales Tax (7%)</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-noir)' }}>${tax.toLocaleString()}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '14px',
                    borderTop: '2px solid var(--color-noir)',
                    fontSize: '18px',
                    fontWeight: 700,
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--color-noir)',
                  }}
                >
                  <span>Grand Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

            </div>

            {/* Trust Badges Panel */}
            <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#4D4742' }}>
                <Truck size={16} color="var(--gold-primary)" />
                <span>Complimentary tracked armored transit with signature delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#4D4742' }}>
                <Sparkles size={16} color="var(--gold-primary)" />
                <span>Custom velvet keepsake presentation box &amp; certificate</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: '#4D4742' }}>
                <ShieldCheck size={16} color="var(--gold-primary)" />
                <span>Persisted in Supabase &bull; Verified by Mailgun Delivery</span>
              </div>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
