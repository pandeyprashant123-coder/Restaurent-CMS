// services/AuthService.js
import User from "../models/User.js"; // Import User model using ES module syntax
import jwt from "jsonwebtoken";

// Find user by Email
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

// Register a new user
export const registerUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

// export const setUserInfo = (user) => {
//   return jwt.sign(user, process.env.JWT_SECRET, {
//     expiresIn: "7d",
//   });
// };
