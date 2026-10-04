import { Order } from '@/types';

export interface MailgunResponse {
  success: boolean;
  messageId?: string;
  mode: 'live' | 'preview_simulation';
  htmlPreview?: string;
  error?: string;
}

export function generateOrderReceiptHtml(order: Order): string {
  const itemsHtml = order.items
    .map(
      (item) => `
    <tr style="border-bottom: 1px solid #EAE5D9;">
      <td style="padding: 16px 8px; vertical-align: top;">
        <div style="font-weight: 600; color: #141416; font-size: 15px; font-family: 'Playfair Display', Georgia, serif;">
          ${item.name}
        </div>
        <div style="color: #8C827A; font-size: 13px; margin-top: 4px;">
          Category: <span style="text-transform: capitalize;">${item.category}</span> &bull; Metal: ${item.metal}
        </div>
      </td>
      <td style="padding: 16px 8px; text-align: center; color: #524B46; font-size: 14px; vertical-align: top;">
        ${item.quantity}
      </td>
      <td style="padding: 16px 8px; text-align: right; color: #141416; font-weight: 600; font-size: 15px; vertical-align: top;">
        $${(item.price * item.quantity).toLocaleString()}
      </td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Order Confirmation - ShopWithOlly</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F8F5F0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #2A2522;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F8F5F0; padding: 40px 16px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #FFFFFF; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #ECE7DE;">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #111113 0%, #1E1B18 100%); padding: 40px 32px; text-align: center;">
              <h1 style="margin: 0; color: #D4AF37; font-size: 30px; letter-spacing: 2px; font-family: 'Playfair Display', Georgia, serif; font-weight: 400; text-transform: uppercase;">
                ShopWithOlly
              </h1>
              <p style="margin: 8px 0 0 0; color: #D1C7BD; font-size: 12px; letter-spacing: 3px; text-transform: uppercase;">
                Fine Haute Joaillerie
              </p>
            </td>
          </tr>

          <!-- Gold Accent Bar -->
          <tr>
            <td height="3" style="background: linear-gradient(90deg, #A8862D, #F1D78A, #A8862D);"></td>
          </tr>

          <!-- Welcome & Thank You -->
          <tr>
            <td style="padding: 40px 36px 20px 36px;">
              <h2 style="margin: 0 0 12px 0; color: #171513; font-size: 22px; font-family: 'Playfair Display', Georgia, serif; font-weight: 500;">
                Thank You for Your Order, ${order.customer.fullName}
              </h2>
              <p style="margin: 0; color: #6B625B; font-size: 15px; line-height: 1.6;">
                We are meticulously preparing your fine jewelry. Each creation is hand-inspected, wrapped in our signature velvet keepsake case, and insured for safe transit to your doorstep.
              </p>
            </td>
          </tr>

          <!-- Order Summary Card -->
          <tr>
            <td style="padding: 10px 36px 30px 36px;">
              <div style="background-color: #FAF8F5; border-radius: 8px; border: 1px solid #ECE6DB; padding: 20px 24px;">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td style="color: #7A726A; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Order Reference</td>
                    <td style="text-align: right; color: #111113; font-weight: 700; font-size: 15px;">#${order.orderNumber}</td>
                  </tr>
                  <tr>
                    <td style="color: #7A726A; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding-top: 8px;">Order Date</td>
                    <td style="text-align: right; color: #111113; font-size: 14px; padding-top: 8px;">
                      ${new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </td>
                  </tr>
                  <tr>
                    <td style="color: #7A726A; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; padding-top: 8px;">Estimated Delivery</td>
                    <td style="text-align: right; color: #2E6B47; font-weight: 600; font-size: 14px; padding-top: 8px;">
                      2 - 4 Business Days (Insured)
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 0 36px 20px 36px;">
              <h3 style="margin: 0 0 16px 0; color: #171513; font-size: 17px; font-weight: 600; letter-spacing: 0.5px; border-bottom: 2px solid #111113; padding-bottom: 8px;">
                Selected Creations
              </h3>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                  <tr style="border-bottom: 1px solid #D6CEBE;">
                    <th align="left" style="color: #8C827A; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px;">Item</th>
                    <th align="center" style="color: #8C827A; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px;">Qty</th>
                    <th align="right" style="color: #8C827A; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding-bottom: 8px;">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- Cost Breakdown -->
          <tr>
            <td style="padding: 10px 36px 30px 36px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="color: #6B625B; font-size: 14px; padding: 6px 0;">Subtotal</td>
                  <td style="text-align: right; color: #141416; font-size: 14px; padding: 6px 0;">$${order.subtotal.toLocaleString()}</td>
                </tr>
                ${
                  order.discount > 0
                    ? `<tr>
                        <td style="color: #A36B2B; font-size: 14px; padding: 6px 0;">Discount (${order.discountCode || 'Promo'})</td>
                        <td style="text-align: right; color: #A36B2B; font-weight: 600; font-size: 14px; padding: 6px 0;">-$${order.discount.toLocaleString()}</td>
                      </tr>`
                    : ''
                }
                <tr>
                  <td style="color: #6B625B; font-size: 14px; padding: 6px 0;">Insured Shipping</td>
                  <td style="text-align: right; color: #141416; font-size: 14px; padding: 6px 0;">
                    ${order.shipping === 0 ? 'Complimentary' : `$${order.shipping}`}
                  </td>
                </tr>
                <tr>
                  <td style="color: #6B625B; font-size: 14px; padding: 6px 0;">Estimated Sales Tax</td>
                  <td style="text-align: right; color: #141416; font-size: 14px; padding: 6px 0;">$${order.tax.toLocaleString()}</td>
                </tr>
                <tr style="border-top: 1px solid #141416;">
                  <td style="color: #111113; font-size: 18px; font-weight: 700; padding: 16px 0 0 0; font-family: 'Playfair Display', Georgia, serif;">Total Paid</td>
                  <td style="text-align: right; color: #111113; font-size: 20px; font-weight: 700; padding: 16px 0 0 0; font-family: 'Playfair Display', Georgia, serif;">
                    $${order.total.toLocaleString()}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Shipping Destination -->
          <tr>
            <td style="padding: 0 36px 30px 36px;">
              <div style="background-color: #FAF8F5; border-radius: 8px; border: 1px solid #ECE6DB; padding: 20px 24px;">
                <h4 style="margin: 0 0 8px 0; color: #111113; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                  Delivery Destination
                </h4>
                <p style="margin: 0; color: #524B46; font-size: 14px; line-height: 1.5;">
                  <strong>${order.customer.fullName}</strong><br>
                  ${order.customer.address} ${order.customer.apartment ? `#${order.customer.apartment}` : ''}<br>
                  ${order.customer.city}, ${order.customer.state} ${order.customer.postalCode}<br>
                  ${order.customer.country}<br>
                  Phone: ${order.customer.phone}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer Note -->
          <tr>
            <td style="background-color: #171513; color: #A69D95; padding: 30px 36px; text-align: center; font-size: 12px; line-height: 1.6;">
              <p style="margin: 0 0 8px 0; color: #D4AF37; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                ShopWithOlly &bull; Atelier de Joaillerie
              </p>
              <p style="margin: 0 0 8px 0;">
                Questions regarding your piece? Contact our concierge at <a href="mailto:concierge@shopwitholly.com" style="color: #D4AF37; text-decoration: none;">concierge@shopwitholly.com</a>
              </p>
              <p style="margin: 0; color: #7A726A;">
                &copy; ${new Date().getFullYear()} ShopWithOlly. All Rights Reserved. Handcrafted with devotion.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function sendOrderConfirmationEmail(order: Order): Promise<MailgunResponse> {
  const apiKey = process.env.MAILGUN_API_KEY || '';
  const domain = process.env.MAILGUN_DOMAIN || '';
  const fromEmail = process.env.MAILGUN_FROM_EMAIL || `ShopWithOlly <orders@${domain || 'shopwitholly.com'}>`;
  
  const htmlContent = generateOrderReceiptHtml(order);

  // Check if live Mailgun credentials are configured
  const isConfigured = Boolean(
    apiKey && 
    domain && 
    !apiKey.includes('your-mailgun-api-key') && 
    !domain.includes('your-domain.com')
  );

  if (!isConfigured) {
    // Elegant Preview Mode for development/demo testing
    return {
      success: true,
      mode: 'preview_simulation',
      messageId: `preview_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      htmlPreview: htmlContent,
    };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('from', fromEmail);
    formData.append('to', order.customer.email);
    formData.append('subject', `✨ Order Confirmed: ShopWithOlly #${order.orderNumber}`);
    formData.append('html', htmlContent);

    const authHeader = 'Basic ' + Buffer.from(`api:${apiKey}`).toString('base64');

    const res = await fetch(`https://api.mailgun.net/v3/${domain}/messages`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Mailgun API response error:', res.status, errText);
      return {
        success: false,
        mode: 'live',
        error: `Mailgun HTTP ${res.status}: ${errText}`,
        htmlPreview: htmlContent,
      };
    }

    const data = await res.json();
    return {
      success: true,
      mode: 'live',
      messageId: data.id,
      htmlPreview: htmlContent,
    };
  } catch (err: unknown) {
    console.error('Mailgun dispatch error:', err);
    return {
      success: false,
      mode: 'live',
      error: err instanceof Error ? err.message : 'Unknown mail delivery exception',
      htmlPreview: htmlContent,
    };
  }
}
