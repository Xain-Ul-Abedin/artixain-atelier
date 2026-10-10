import { Gemstone } from '@artixain/shared';

export interface EmailOrderDetails {
  orderId: string;
  customerName: string;
  customerEmail: string;
  items: Array<{
    name: string;
    wristSizeCm: number;
    cordType: string;
    beadCount: number;
    unitPrice: number;
    quantity: number;
    token?: string;
  }>;
  finalTotal: number;
  cordCutLengthCm: number;
  shippingAddress: string;
}

export class EmailService {
  /**
   * Generates luxury HTML order confirmation for customer.
   */
  static generateCustomerReceiptHtml(details: EmailOrderDetails): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0F1115; color: #E4E4E7; margin: 0; padding: 40px 20px; }
    .card { max-width: 580px; margin: 0 auto; background: #161820; border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 36px; }
    .header { text-align: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 24px; }
    .eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; color: #C5A059; text-transform: uppercase; }
    .title { font-size: 24px; font-family: serif; color: #FFFFFF; margin: 8px 0 4px; }
    .order-pill { display: inline-block; padding: 4px 14px; background: rgba(197, 160, 89, 0.15); color: #C5A059; border-radius: 50px; font-size: 11px; font-weight: 700; margin-top: 10px; }
    .content { padding: 24px 0; }
    .item-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.04); font-size: 13px; }
    .total-row { display: flex; justify-content: space-between; padding-top: 16px; font-size: 16px; font-weight: 700; color: #FFFFFF; }
    .footer { text-align: center; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 20px; font-size: 11px; color: #71717A; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div class="eyebrow">Artixain Haute Joaillerie</div>
      <div class="title">Atelier Order Confirmed</div>
      <div class="order-pill">Order #${details.orderId}</div>
    </div>
    <div class="content">
      <p style="font-size: 13px; line-height: 1.6; color: #A1A1AA;">
        Dear ${details.customerName},<br>
        Your bespoke mineral formula has been scheduled for stringing in our atelier. Every gemstone is naturally sourced, cleansed, and calibrated to your exact ${details.items[0]?.wristSizeCm || 16.5}cm wrist circumference.
      </p>
      <div style="margin: 20px 0;">
        ${details.items
          .map(
            (it) => `
          <div class="item-row">
            <div>
              <strong>${it.quantity}x ${it.name}</strong><br>
              <span style="font-size: 11px; color: #71717A;">${it.beadCount} beads • ${it.wristSizeCm}cm</span>
            </div>
            <span>$${(it.unitPrice * it.quantity).toFixed(2)}</span>
          </div>
        `
          )
          .join('')}
        <div class="total-row">
          <span>Total Paid</span>
          <span style="color: #C5A059;">$${details.finalTotal.toFixed(2)}</span>
        </div>
      </div>
      <p style="font-size: 11px; color: #71717A; line-height: 1.5;">
        Shipping Destination: ${details.shippingAddress}
      </p>
    </div>
    <div class="footer">
      Artixain Atelier • Zero-Cost Cloud Pipeline • Handcrafted in Natural Gemstones
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Generates artisan stringing work-order slip for jeweler bench.
   */
  static generateArtisanWorkOrderHtml(details: EmailOrderDetails): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: monospace; background: #FFFFFF; color: #111111; margin: 0; padding: 20px; }
    .slip { max-width: 600px; margin: 0 auto; border: 2px solid #000; padding: 20px; }
    .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 16px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; font-size: 12px; }
    .box { border: 1px solid #000; padding: 8px; }
    .token { background: #EEE; padding: 8px; word-break: break-all; font-size: 11px; margin-top: 10px; }
  </style>
</head>
<body>
  <div class="slip">
    <div class="header">
      <h2 style="margin: 0; text-transform: uppercase;">Artixain Atelier Work Order Slip</h2>
      <div>ORDER: ${details.orderId}</div>
    </div>
    <div class="grid">
      <div class="box">
        <strong>TARGET WRIST:</strong> ${details.items[0]?.wristSizeCm || 16.5} cm<br>
        <strong>CORD CUT LENGTH:</strong> ${details.cordCutLengthCm} cm (+4.5cm Knot Allowance)
      </div>
      <div class="box">
        <strong>CORD TYPE:</strong> ${details.items[0]?.cordType || 'Silicone Stretch'}<br>
        <strong>CLIENT:</strong> ${details.customerName}
      </div>
    </div>
    <div style="font-size: 12px; margin-top: 10px;">
      <strong>STRAND RECIPE:</strong>
      <div class="token">${details.items[0]?.token || 'Standard Starter Formula'}</div>
    </div>
    <div style="margin-top: 20px; border-top: 1px dashed #000; padding-top: 10px; font-size: 10px; text-transform: uppercase;">
      <span style="display:inline-block;width:10px;height:10px;border:1px solid #000;margin-right:4px;vertical-align:middle;"></span> CORD CUT VERIFIED &bull; 
      <span style="display:inline-block;width:10px;height:10px;border:1px solid #000;margin-right:4px;vertical-align:middle;"></span> BEADS STRINGED &bull; 
      <span style="display:inline-block;width:10px;height:10px;border:1px solid #000;margin-right:4px;vertical-align:middle;"></span> DOUBLE SURGEON KNOT &bull; 
      <span style="display:inline-block;width:10px;height:10px;border:1px solid #000;margin-right:4px;vertical-align:middle;"></span> QC TENSILE TEST &bull; 
      <span style="display:inline-block;width:10px;height:10px;border:1px solid #000;margin-right:4px;vertical-align:middle;"></span> SHIPPED
    </div>
  </div>
</body>
</html>
    `.trim();
  }

  /**
   * Dispatches order notifications via Resend API or logs to console as fallback.
   */
  static async sendOrderNotifications(details: EmailOrderDetails): Promise<{ success: boolean; mode: string }> {
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      try {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: 'Artixain Atelier <orders@artixain.com>',
            to: details.customerEmail,
            subject: `Atelier Work Order Confirmed: #${details.orderId}`,
            html: this.generateCustomerReceiptHtml(details),
          }),
        });

        if (response.ok) {
          return { success: true, mode: 'resend_cloud' };
        }
      } catch (err) {
        console.warn('[WARN] Resend delivery failed, falling back to local dispatch log:', err);
      }
    }

    // Zero-Cost Local Console / Mock Dispatch Fallback
    console.log('[INFO] Zero-Cost Email Dispatch (Local Mock Fallback):');
    console.log(`[INFO] To: ${details.customerEmail} | Order: #${details.orderId} | Total: $${details.finalTotal.toFixed(2)}`);
    console.log(`[INFO] Atelier Cord Cut Allowance: ${details.cordCutLengthCm}cm`);
    return { success: true, mode: 'local_fallback' };
  }
}
