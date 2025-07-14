import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { forgotPasswordTemplate, passwordResetConfirmationTemplate, welcomeEmailTemplate } from './emailTemplate.js';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendWelcomeEmail = async (to, name, verificationCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Welcome to Our App!',
    html: welcomeEmailTemplate(name, verificationCode, to),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', error);
    throw error;
  }
};



export const sendForgotPasswordEmail = async (to, name, token) => {
  await transporter.sendMail({
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Reset Your Password',
    html: forgotPasswordTemplate(name, token),
  });
};

export const sendResetConfirmationEmail = async (to, name) => {
  await transporter.sendMail({
    from: `"Your App Name" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Password Reset Successful',
    html: passwordResetConfirmationTemplate(name),
  });
};