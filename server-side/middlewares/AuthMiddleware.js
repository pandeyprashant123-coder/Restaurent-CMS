import jwt from "jsonwebtoken";
import "dotenv/config";
// import authMiddleware from "./auth";

function getToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

export const isUser = (req, res, next) => {
  const token = getToken(req);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access! Please login to continue.",
    });
  }

  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    console.error(
      "JWT Secret Key is not defined in the environment variables."
    );
    return res.status(500).json({
      success: false,
      message: "Internal Server Error. Please try again later.",
    });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error("JWT Error:", err.message);
      const message =
        err.name === "TokenExpiredError"
          ? "Session expired. Please login again."
          : "Invalid token. Please login again.";

      return res.status(403).json({
        success: false,
        message,
      });
    }

    // Attach user information to the request
    req.user = {
      id: decoded.id,
      user_type: decoded.user_type,
    };

    next(); // Call next only after ensuring no response is sent
  });
};

export const authenticate = (req, res, next) => {
  try {
    // Extract the token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Authorization token is missing",
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request for further use
    req.user = {
      id: decoded.id,
      user_type: decoded.user_type,
      // email: decoded.email, // Add these if they exist in your token payload
      // name: decoded.name,
    };
    next();
  } catch (err) {
    // Handle different types of JWT errors
    switch (err.name) {
      case "JsonWebTokenError":
        return res.status(401).json({
          status: "error",
          message: "Invalid token",
        });
      case "TokenExpiredError":
        return res.status(401).json({
          status: "error",
          message: "Token has expired",
        });
      default:
        console.error("Some error:", err);
        return res.status(500).json({
          status: "error",
          message: "Internal server error during authentication",
        });
    }
  }
};
// isAdmin middleware
export const isAdmin = (req, res, next) => {
  const { user_type } = req.user;

  if (user_type === "admin") {
    return next(); // Ensure no response is sent after calling next()
  }

  return res.status(403).json({
    message: "Access forbidden: Not an admin",
  });
};
export const isRestroAdmin = (req, res, next) => {
  const { user_type } = req.user;

  if (user_type === "vendor") {
    return next(); // Ensure no response is sent after calling next()
  }

  return res.status(403).json({
    message: "Access forbidden: not a restaurant admin",
  });
};

export const isAdminOrRestroAdmin = (req, res, next) => {
  const { user_type } = req.user;

  if (user_type === "admin" || user_type === "vendor") {
    return next(); // Ensure no response is sent after calling next()
  }

  return res.status(403).json({
    message: "Access forbidden: Not an admin or restaurant admin",
  });
};

const AuthMiddleware = {
  isUser,
  isRestroAdmin,
  isAdmin,
  authenticate,
  isAdminOrRestroAdmin,
};

export default AuthMiddleware;
