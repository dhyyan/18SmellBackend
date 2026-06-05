/**
 * Premium, luxury email template for 18Smell verification
 * @param {string} name - User's name
 * @param {string} otpCode - Generated OTP
 * @returns {string} - Luxury HTML template
 */
export const buildLuxuryEmailTemplate = (name, otpCode) => {
    const recipientName = name ? name.split(' ')[0] : 'Cherished Guest';
    return `
    <div style="font-family: 'Montserrat', 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: auto; padding: 40px 30px; border: 1px solid #c5a880; background-color: #0b0b0c; color: #f5f5f7; border-radius: 8px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #c5a880; font-family: 'Cinzel', 'Playfair Display', Georgia, serif; font-size: 28px; letter-spacing: 7px; margin: 0; font-weight: 400; text-transform: uppercase;">18SMELL</h1>
        <p style="color: #8f8f94; font-size: 10px; letter-spacing: 3px; margin: 5px 0 0 0; text-transform: uppercase;">Haute Parfumerie</p>
      </div>
      
      <hr style="border: 0; border-top: 1px solid #2d2d30; margin-bottom: 30px;" />
      
      <div style="font-size: 15px; line-height: 1.8; color: #e1e1e6;">
        <p>Dear ${recipientName},</p>
        
        <p>Thank you for embarking on a sensory journey with 18Smell. To complete your account registration and unlock our curated collection of luxury artisanal fragrances, please verify your email address using the private code below:</p>
        
        <div style="text-align: center; margin: 40px 0;">
          <span style="font-family: 'Courier New', Courier, monospace; font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #c5a880; border: 1px solid #c5a880; padding: 15px 35px; background-color: #121215; border-radius: 4px; box-shadow: inset 0 0 10px rgba(197, 168, 128, 0.15); display: inline-block;">${otpCode}</span>
        </div>
        
        <p style="font-size: 14px; color: #a1a1aa; text-align: center;">This verification code is active for <strong>10 minutes</strong>. For security purposes, please do not share this code with anyone.</p>
      </div>
      
      <hr style="border: 0; border-top: 1px solid #2d2d30; margin-top: 40px; margin-bottom: 20px;" />
      
      <div style="text-align: center; font-size: 11px; color: #71717a; line-height: 1.6;">
        <p style="margin: 0;">If you did not initiate this request, you can safely ignore this email.</p>
        <p style="margin: 5px 0 0 0;">&copy; ${new Date().getFullYear()} 18Smell Fragrances. All rights reserved.</p>
      </div>
    </div>
  `;
};
