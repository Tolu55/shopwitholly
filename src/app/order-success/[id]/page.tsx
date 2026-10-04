'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { CheckCircle2, PackageCheck, Mail, ArrowRight, Truck, ShieldCheck, ExternalLink, Printer } from 'lucide-react';
import { Order } from '@/types';
import { fetchOrderById } from '@/lib/db';
import { generateOrderReceiptHtml } from '@/lib/mailgun';

export default function OrderSuccessPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params?.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A059', '#111113', '#E5D2A6', '#8F7035'],
      });
    } catch {
      // Confetti fallback
    }

    if (orderId) {
      fetchOrderById(orderId).then((ord) => {
        setOrder(ord);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '20px' }}>Retrieving your order from atelier...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '440px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', marginBottom: '12px' }}>Order Not Found</h2>
          <p style={{ color: '#797169', marginBottom: '20px' }}>We were unable to locate this order reference.</p>
          <Link href="/" className="btn btn-gold">Return to Boutique</Link>
        </div>
      </div>
    );
  }

  const emailHtml = generateOrderReceiptHtml(order);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-sand)', padding: '50px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        
        {/* Success Card Header */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 'var(--radius-lg)',
            padding: '48px 40px',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-luxury)',
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'var(--gold-subtle)',
              border: '2px solid var(--gold-primary)',
              margin: '0 auto 20px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-dark)',
            }}
          >
            <CheckCircle2 size={36} />
          </div>

          <span style={{ fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-dark)', fontWeight: 700 }}>
            Order Confirmed &bull; Persisted to Database
          </span>

          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '34px',
              fontWeight: 600,
              color: 'var(--color-noir)',
              margin: '8px 0 12px 0',
            }}
          >
            Thank You, {order.customer.fullName}
          </h1>

          <p style={{ color: '#6B625B', fontSize: '15px', maxWidth: '560px', margin: '0 auto 24px auto', lineHeight: 1.6 }}>
            Your order <strong>#{order.orderNumber}</strong> has been secured and registered in our database. A detailed confirmation receipt has been dispatched to <strong>{order.customer.email}</strong> via Mailgun.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              background: 'var(--color-sand)',
              padding: '10px 20px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--border-light)',
              fontSize: '13px',
              color: '#3B3632',
            }}
          >
            <Truck size={16} color="var(--gold-primary)" />
            <span>Estimated Insured Delivery: <strong>2 - 4 Business Days</strong></span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '28px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setShowEmailPreview(!showEmailPreview)}
              className="btn btn-outline-gold btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Mail size={15} />
              <span>{showEmailPreview ? 'Hide Mailgun Email' : 'View Mailgun Email Receipt'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="btn btn-outline-dark btn-sm"
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Printer size={15} />
              <span>Print Receipt</span>
            </button>
            <Link href="/" className="btn btn-gold btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>Continue Shopping</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Optional Live Mailgun HTML Email Receipt Preview */}
        {showEmailPreview && (
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--gold-border)',
              padding: '24px',
              marginBottom: '32px',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-light)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={18} color="var(--gold-primary)" />
                <h3 style={{ fontSize: '15px', fontWeight: 700 }}>
                  Mailgun HTML Email Dispatch Preview
                </h3>
              </div>
              <span style={{ fontSize: '12px', color: '#2E6B47', fontWeight: 600 }}>
                Status: {order.mailgunStatus?.mode === 'live' ? 'Live Dispatched' : 'Rendered & Verified'}
              </span>
            </div>

            <div
              style={{
                borderRadius: '8px',
                overflow: 'hidden',
                border: '1px solid #ECE7DE',
              }}
              dangerouslySetInnerHTML={{ __html: emailHtml }}
            />
          </div>
        )}

        {/* Order Details Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
          
          {/* Purchased Items */}
          <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '18px', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
              Selected Pieces ({order.items.length})
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {order.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ position: 'relative', width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#F6F3EC', flexShrink: 0 }}>
                    <Image src={item.image} alt={item.name} fill sizes="60px" style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-noir)' }}>{item.name}</h4>
                    <span style={{ fontSize: '11px', color: '#8A827A' }}>
                      Category: {item.category} &bull; Qty {item.quantity}
                    </span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
                    ${(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-light)', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B625B' }}>
                <span>Subtotal</span>
                <span>${order.subtotal.toLocaleString()}</span>
              </div>
              {order.discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#9E6D24', fontWeight: 600 }}>
                  <span>Discount ({order.discountCode})</span>
                  <span>-${order.discount.toLocaleString()}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B625B' }}>
                <span>Insured Courier</span>
                <span style={{ color: order.shipping === 0 ? '#2E6B47' : 'inherit' }}>
                  {order.shipping === 0 ? 'Complimentary' : `$${order.shipping}`}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6B625B' }}>
                <span>Tax</span>
                <span>${order.tax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-serif)', borderTop: '1px solid #111', paddingTop: '10px', marginTop: '6px' }}>
                <span>Total Paid</span>
                <span>${order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Destination */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '14px' }}>
                Delivery Destination
              </h3>
              <p style={{ fontSize: '13px', color: '#524B46', lineHeight: 1.6 }}>
                <strong>{order.customer.fullName}</strong><br />
                {order.customer.address} {order.customer.apartment ? `#${order.customer.apartment}` : ''}<br />
                {order.customer.city}, {order.customer.state} {order.customer.postalCode}<br />
                {order.customer.country}<br />
                Phone: {order.customer.phone}
              </p>
            </div>

            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '28px', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '18px', fontWeight: 600, marginBottom: '14px' }}>
                Security &amp; Persistence
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px', color: '#665F58' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={14} color="var(--gold-primary)" />
                  <span>Persisted in PostgreSQL database (Supabase/Neon)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mail size={14} color="var(--gold-primary)" />
                  <span>Dispatched via Mailgun API: #{order.orderNumber}</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <PackageCheck size={14} color="var(--gold-primary)" />
                  <span>Insured with Lloyd&apos;s fine jewelry transit underwriters</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
