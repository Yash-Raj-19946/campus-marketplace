import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendVerificationMail } from "../config/mail.js";

/**
 * REGISTER
 */
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({
        msg: "Only BMSCE college email (@bmsce.ac.in) is allowed",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    await User.create({
      email,
      password: hashedPassword,
      isVerified: false,
      verificationToken,
    });

    await sendVerificationMail(email, verificationToken);

    res.status(201).json({
      msg: "Registration successful. Please verify your email.",
    });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * VERIFY EMAIL
 */
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).send("Invalid or expired verification link");
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.redirect(`${process.env.CLIENT_URL}/login`);
  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(400).send("Verification failed");
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    if (!user.isVerified) {
      return res.status(400).json({
        msg: "Please verify your email before logging in",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

/**
 * GET CURRENT USER  🔥 NEW
 */
export const getMe = async (req, res) => {
  try {
    // auth middleware already attached req.user
    res.json(req.user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
