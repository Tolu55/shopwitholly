import { NextRequest, NextResponse } from 'next/server';
import { sendOrderConfirmationEmail } from '@/lib/mailgun';
import { Order } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { order } = body as { order: Order };

    if (!order || !order.customer?.email) {
      return NextResponse.json(
        { error: 'Valid order payload with customer email is required' },
        { status: 400 }
      );
    }

    const result = await sendOrderConfirmationEmail(order);
    return NextResponse.json(result);
  } catch (err: unknown) {
    console.error('Send email API error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown mailgun delivery failure' },
      { status: 500 }
    );
  }
}
