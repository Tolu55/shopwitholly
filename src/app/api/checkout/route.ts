import { NextRequest, NextResponse } from 'next/server';
import { Order, OrderItem, CustomerDetails } from '@/types';
import { PRODUCTS, PROMO_CODES } from '@/data/products';
import { sendOrderConfirmationEmail } from '@/lib/mailgun';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, promoCode, paymentMethod } = body as {
      customer: CustomerDetails;
      items: { productId: string; quantity: number }[];
      promoCode?: string;
      paymentMethod: Order['paymentMethod'];
    };

    if (!customer || !customer.email || !customer.fullName || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Missing required customer or items details' },
        { status: 400 }
      );
    }

    // Server-side recalculation for absolute pricing integrity
    let subtotal = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) continue;
      subtotal += product.price * item.quantity;
      orderItems.push({
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
        metal: product.metal,
      });
    }

    if (orderItems.length === 0) {
      return NextResponse.json(
        { error: 'No valid products found in order' },
        { status: 400 }
      );
    }

    // Apply promo code if valid
    let discount = 0;
    if (promoCode && PROMO_CODES[promoCode.toUpperCase()]) {
      const rate = PROMO_CODES[promoCode.toUpperCase()];
      if (rate < 1) {
        discount = Math.round(subtotal * rate);
      } else {
        discount = Math.min(subtotal, rate);
      }
    }

    // Complimentary shipping above $250, otherwise $25
    const shipping = subtotal >= 250 ? 0 : 25;
    // Estimated tax 7%
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = Math.round(taxableAmount * 0.07);
    const total = taxableAmount + shipping + tax;

    const orderNumber = `OLLY-${Math.floor(10000 + Math.random() * 90000)}`;
    const orderId = `ord_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const order: Order = {
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      customer,
      items: orderItems,
      subtotal,
      discount,
      discountCode: promoCode ? promoCode.toUpperCase() : undefined,
      shipping,
      tax,
      total,
      status: 'confirmed',
      paymentMethod: paymentMethod || 'card',
    };

    // Send confirmation email via Mailgun
    const emailResult = await sendOrderConfirmationEmail(order);
    order.mailgunStatus = {
      sent: emailResult.success,
      messageId: emailResult.messageId,
      mode: emailResult.mode,
    };

    return NextResponse.json({
      success: true,
      order,
      emailStatus: emailResult,
    });
  } catch (error: unknown) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal checkout server error' },
      { status: 500 }
    );
  }
}
