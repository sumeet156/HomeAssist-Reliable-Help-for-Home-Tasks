const jwt = require("jsonwebtoken");
const User = require("../models/User");

/**
 * Protect middleware - Verify JWT token and authenticate user
 */
const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Check for token in cookies (if using cookie-based auth)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from token
      const user = await User.findById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Token is valid but user no longer exists",
        });
      }

      // Check if user is active
      if (!user.isActive) {
        return res.status(401).json({
          success: false,
          message: "Your account has been deactivated",
        });
      }

      // Add user to request object
      req.user = user;
      next();
    } catch (jwtError) {
      if (jwtError.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token has expired",
        });
      } else if (jwtError.name === "JsonWebTokenError") {
        return res.status(401).json({
          success: false,
          message: "Invalid token",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Token verification failed",
        });
      }
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      success: false,
      message: "Server error in authentication",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

/**
 * Authorize middleware - Check if user has specific roles
 * @param {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    if (!roles.includes(req.user.accountType)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${roles.join(" or ")}`,
      });
    }

    next();
  };
};

/**
 * Optional auth middleware - Authenticate if token is provided, but don't fail if not
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // Check for token in cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    // If no token, continue without authentication
    if (!token) {
      return next();
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by ID from token
      const user = await User.findById(decoded.id);
      if (user && user.isActive) {
        req.user = user;
      }
    } catch (jwtError) {
      // If token is invalid, continue without authentication
      console.log("Optional auth: Invalid token provided");
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    // Continue without authentication on server error
    next();
  }
};

/**
 * Check if user is verified middleware
 */
const requireVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (!req.user.isEmailVerified) {
    return res.status(403).json({
      success: false,
      message: "Email verification required. Please check your email.",
    });
  }

  next();
};

/**
 * Check if user is a tasker and verified
 */
const requireTaskerVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Authentication required",
    });
  }

  if (req.user.accountType !== "tasker") {
    return res.status(403).json({
      success: false,
      message: "Tasker account required",
    });
  }

  if (!req.user.isVerified) {
    return res.status(403).json({
      success: false,
      message:
        "Tasker verification required. Please complete your profile and wait for approval.",
    });
  }

  next();
};

/**
 * Rate limiting middleware (basic implementation)
 */
const rateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    // Clean up old entries
    for (const [key, data] of requests.entries()) {
      if (now - data.timestamp > windowMs) {
        requests.delete(key);
      }
    }

    // Check current IP
    const userData = requests.get(ip);
    if (userData) {
      if (userData.count >= maxRequests) {
        return res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
          retryAfter: Math.ceil((userData.timestamp + windowMs - now) / 1000),
        });
      }
      userData.count++;
    } else {
      requests.set(ip, { count: 1, timestamp: now });
    }

    next();
  };
};

/**
 * API key authentication middleware (for potential future use)
 */
const authenticateApiKey = async (req, res, next) => {
  try {
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: "API key required",
      });
    }

    try {
      const decoded = jwt.verify(apiKey, process.env.JWT_SECRET);

      if (decoded.type !== "api-key") {
        return res.status(401).json({
          success: false,
          message: "Invalid API key type",
        });
      }

      // Find user by ID from API key
      const user = await User.findById(decoded.id);
      if (!user || !user.isActive) {
        return res.status(401).json({
          success: false,
          message: "API key is valid but user is not active",
        });
      }

      req.user = user;
      req.apiKey = decoded;
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: "Invalid API key",
      });
    }
  } catch (error) {
    console.error("API key auth error:", error);
    res.status(500).json({
      success: false,
      message: "Server error in API key authentication",
    });
  }
};

module.exports = {
  protect,
  authorize,
  optionalAuth,
  requireVerification,
  requireTaskerVerification,
  rateLimit,
  authenticateApiKey,
};
