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
