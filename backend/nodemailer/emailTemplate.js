export const welcomeEmailTemplate = (name, token, email) => {
  const verificationLink = `http://localhost:5173/verify-email?email=${encodeURIComponent(email)}&token=${token}`;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Welcome to Funbits, ${name}!</h2>
      <p>Thanks for signing up. Please confirm your email address by clicking the button below:</p>

      <a href="${verificationLink}" 
         style="display: inline-block; padding: 12px 24px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">
        Verify Email
      </a>

      <p style="margin-top: 20px;">If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all;">${verificationLink}</p>

      <hr style="margin-top: 30px;" />
      <p style="color: #777;">Cheers,<br/>The Funbits Team</p>
    </div>
  `;
};

export const forgotPasswordTemplate = (name, token) => {
  const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
      <h2>Hello ${name},</h2>
      <p>You requested to reset your password. Click the button below to continue:</p>

      <a href="${resetLink}" 
         style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">
        Reset Password
      </a>

      <p style="margin-top: 20px;">This link is valid for 15 minutes.</p>
      <p>If you didn’t request this, you can ignore this email.</p>

      <hr style="margin-top: 30px;" />
      <p style="color: #777;">– The Funbits Team</p>
    </div>
  `;
};

export const passwordResetConfirmationTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2>Hello ${name},</h2>
    <p>Your password has been changed successfully.</p>
    <p>If you did not perform this action, please contact our support team immediately.</p>

    <hr style="margin-top: 30px;" />
    <p style="color: #777;">– The Funbits Team</p>
  </div>
`;
