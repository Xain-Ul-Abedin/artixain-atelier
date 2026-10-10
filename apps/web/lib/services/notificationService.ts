export interface OrderEmailParams {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  finalTotal: number;
}

export interface ShippingEmailParams {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  trackingNumber: string;
  courier: string;
}

export class NotificationService {
  /**
   * Dispatches Order Confirmation email via Resend API or logs fallback.
   */
  static async sendOrderConfirmationEmail(params: OrderEmailParams): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;

    const emailHtml = `
      <div style="font-family: 'Lexend', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181B; background-color: #FBFBF9; border-radius: 16px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #E5E5E0;">
          <h1 style="font-family: Georgia, serif; font-size: 24px; margin: 0; color: #0F1115;">ARTIXAIN ATELIER</h1>
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A059; margin-top: 4px;">Bespoke Work Order Confirmed</p>
        </div>
        
        <div style="padding: 24px 0;">
          <p style="font-size: 14px; line-height: 1.6;">Dear ${params.customerName},</p>
          <p style="font-size: 14px; line-height: 1.6;">Your bespoke gemstone bracelet order <strong>${params.orderNumber}</strong> has been received by our master stringing atelier. We have generated your physical assembly blueprint and allocated your Grade-A natural crystals.</p>
          
          <div style="background-color: #FFFFFF; border: 1px solid #E5E5E0; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="font-size: 12px; margin: 0 0 8px 0; color: #71717A;">Order Reference: <strong style="color: #0F1115;">${params.orderNumber}</strong></p>
            <p style="font-size: 12px; margin: 0 0 8px 0; color: #71717A;">Total Amount: <strong style="color: #C5A059;">$${params.finalTotal.toFixed(2)}</strong></p>
            <p style="font-size: 12px; margin: 0; color: #71717A;">Status: <span style="background-color: #DBEAFE; color: #1E40AF; padding: 2px 8px; border-radius: 12px; font-weight: bold; font-size: 10px;">[PLACED]</span></p>
          </div>
          
          <p style="font-size: 12px; color: #71717A; line-height: 1.6;">You will receive an automatic courier tracking update as soon as your bracelet passes final QC and tension knot inspection.</p>
        </div>
        
        <div style="text-align: center; border-top: 1px solid #E5E5E0; padding-top: 16px; font-size: 11px; color: #A1A1AA;">
          <p>© 2026 Artixain Atelier. Hand-strung in accordance with authentic mineralogical standards.</p>
        </div>
      </div>
    `;

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
            to: [params.customerEmail],
            subject: `[Order Confirmed] ${params.orderNumber} - Artixain Atelier`,
            html: emailHtml,
          }),
        });
        return response.ok;
      } catch {
        // Fallback to local logger
      }
    }

    console.log(`[EMAIL DISPATCH - CONFIRMATION] ${params.orderNumber} to ${params.customerEmail} (Total: $${params.finalTotal})`);
    return true;
  }

  /**
   * Dispatches Shipping Courier tracking update email.
   */
  static async sendShippingTrackingEmail(params: ShippingEmailParams): Promise<boolean> {
    const resendApiKey = process.env.RESEND_API_KEY;

    const emailHtml = `
      <div style="font-family: 'Lexend', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #18181B; background-color: #FBFBF9; border-radius: 16px;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #E5E5E0;">
          <h1 style="font-family: Georgia, serif; font-size: 24px; margin: 0; color: #0F1115;">ARTIXAIN ATELIER</h1>
          <p style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #059669; margin-top: 4px;">Atelier Dispatch & Courier Tracking</p>
        </div>
        
        <div style="padding: 24px 0;">
          <p style="font-size: 14px; line-height: 1.6;">Dear ${params.customerName},</p>
          <p style="font-size: 14px; line-height: 1.6;">Great news! Your custom bracelet <strong>${params.orderNumber}</strong> has passed final quality certification and has been dispatched via ${params.courier}.</p>
          
          <div style="background-color: #FFFFFF; border: 1px solid #E5E5E0; border-radius: 12px; padding: 16px; margin: 20px 0;">
            <p style="font-size: 12px; margin: 0 0 8px 0; color: #71717A;">Courier Service: <strong style="color: #0F1115;">${params.courier}</strong></p>
            <p style="font-size: 12px; margin: 0 0 8px 0; color: #71717A;">Tracking Number: <strong style="color: #059669; font-family: monospace;">${params.trackingNumber}</strong></p>
            <p style="font-size: 12px; margin: 0; color: #71717A;">Status: <span style="background-color: #D1FAE5; color: #065F46; padding: 2px 8px; border-radius: 12px; font-weight: bold; font-size: 10px;">[SHIPPED]</span></p>
          </div>
        </div>
        
        <div style="text-align: center; border-top: 1px solid #E5E5E0; padding-top: 16px; font-size: 11px; color: #A1A1AA;">
          <p>© 2026 Artixain Atelier. Hand-strung in accordance with authentic mineralogical standards.</p>
        </div>
      </div>
    `;

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
            to: [params.customerEmail],
            subject: `[Shipped] Your Artixain Strand is on the way (${params.trackingNumber})`,
            html: emailHtml,
          }),
        });
        return response.ok;
      } catch {
        // Fallback
      }
    }

    console.log(`[EMAIL DISPATCH - SHIPPED] ${params.orderNumber} to ${params.customerEmail} (Tracking: ${params.trackingNumber})`);
    return true;
  }
}
