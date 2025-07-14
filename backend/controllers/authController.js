import bcrypt from "bcryptjs";
import dotenv from 'dotenv';
import nodemailer from "nodemailer"
import crypto from 'crypto';

import { User } from "../models/userModel.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";  
import { sendWelcomeEmail, sendForgotPasswordEmail, sendResetConfirmationEmail } from '../nodemailer/email.js';


dotenv.config();


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,   
    pass: process.env.EMAIL_PASS,   
  },
});

export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};


export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await newUser.save();

    await sendWelcomeEmail(email, name, verificationToken);

    generateTokenAndSetCookie(res, newUser._id);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name,
      },
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { email, token } = req.body;

  if (!email || !token) {
    return res.status(400).json({ success: false, message: "Email and token are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "Email already verified" });
    }

    if (
      user.verificationToken !== token ||
      user.verificationTokenExpiresAt < Date.now()
    ) {
      return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.status(200).json({ success: true, message: "Email verified successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    existingUser.lastLogin = Date.now();
    await existingUser.save();

    if (!existingUser.isVerified) {
  return res.status(403).json({ success: false, message: "Please verify your email first." });
}

    generateTokenAndSetCookie(res, existingUser._id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
      },
    });

 } catch (error) {
  res.status(500).json({ success: false, message: error.message });
}
};


export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) throw new Error("Email is required");

    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");

    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpiresAt = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    await sendForgotPasswordEmail(user.email, user.name, resetToken);

    res.status(200).json({ success: true, message: 'Reset email sent' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    if (!token || !newPassword) throw new Error("Token and new password are required");

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) throw new Error("Token is invalid or expired");

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    await sendResetConfirmationEmail(user.email, user.name);

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const checkAuth = async (req, res) => {
  try {
    // `req.user` is set by the verifyToken middleware
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User is authenticated",
      user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
