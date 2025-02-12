import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import * as AuthService from "../services/AuthServices.js";
// JWT Token Generator
import crypto from "crypto";

const generateToken = (id, user_type) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  return jwt.sign({ id, user_type }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    mobile,
    date_of_birth,
    password,
    confirm_password,
    email,
    fullName,
    user_type = "user",
  } = req.body;
  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if user already exists
    const existingUser = await AuthService.findUserByEmail(email);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email number already exists" });
    }

    // Register new user
    const user = await AuthService.registerUser({
      mobile,
      date_of_birth,
      password,
      user_type,
      email,
      first_name: fullName,
    });

    const token = generateToken(user._id, user.user_type);
    res
      .status(201)
      .json({ message: "User registered successfully", token, user });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await AuthService.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.user_type);
    res.status(200).json({ token, message: "Login successful", user });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
