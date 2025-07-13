export const welcomeEmailTemplate = (name, verificationCode) => {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2 style="color: #4CAF50;">Welcome, ${name}!</h2>
      <p>Thank you for signing up. Your verification code is:</p>
      <p style="font-size: 24px; font-weight: bold;">${verificationCode}</p>
      <p>This code is valid for 24 hours. Please do not share this code with anyone.</p>
      <br/>
      <p style="font-size: 12px; color: #888;">If you did not request this, you can ignore this email.</p>
    </div>
  `;
};

export const forgotPasswordTemplate = (name, token) => {
  const resetLink = `https://yourfrontend.com/reset-password?token=${token}`; // Replace with your frontend URL

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

