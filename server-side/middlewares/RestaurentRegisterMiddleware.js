import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import * as AuthService from "../services/AuthServices.js";
const generateToken = (id, user_type) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }
  return jwt.sign({ id, user_type }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerRestaurant = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { phone, date_of_birth, password, confirm_password, email } = req.body;

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
      mobile: phone,
      date_of_birth,
      password,
      user_type: "vendor",
      email,
    });

    // const token = generateToken(user._id, user.user_type);
    // res
    //   .status(201)
    //   .json({ message: "Restaurant registered successfully", token, user });
    next();
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
