export const welcomeEmailTemplate = (name, token, email) => {
  const verificationLink = `http://localhost:5173/verify-email?email=${email}&token=${token}`;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Welcome to Our App, ${name}!</h2>
      <p>Thank you for registering. Please verify your email by clicking the link below:</p>
      <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>If the button doesn't work, copy and paste this link into your browser:</p>
      <p>${verificationLink}</p>
      <br/>
      <p>Cheers,<br/>The Team</p>
    </div>
  `;
};


export const forgotPasswordTemplate = (name, token) => {
const resetLink = `http://localhost:5173/reset-password?token=${token}`;

  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Hi ${name},</h2>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>This link is valid for 15 minutes.</p>
      <p>If you didn’t request this, you can safely ignore this email.</p>
      <p style="color: #888;">– Your App Team</p>
    </div>
  `;
};


export const passwordResetConfirmationTemplate = (name) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background: #f9f9f9;">
    <h2 style="color: #333;">Hi ${name},</h2>
    <p>Your password has been reset successfully. If this wasn’t you, please contact our support team immediately.</p>
    <br/>
    <p style="color: #888;">– Your App Team</p>
  </div>
`;

