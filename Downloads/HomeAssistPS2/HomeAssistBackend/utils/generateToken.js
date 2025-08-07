const jwt = require("jsonwebtoken");

/**
 * Generate a JWT token
 * @param {string} userId - The user ID to encode in the token
 * @param {string} expiresIn - Token expiration time (default: 30 days)
 * @returns {string} JWT token
 */
const generateToken = (userId, expiresIn = "30d") => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Generate a refresh token
 * @param {string} userId - The user ID to encode in the token
 * @returns {string} Refresh JWT token
 */
const generateRefreshToken = (userId) => {
  return jwt.sign(
    { id: userId, type: "refresh" },
    process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
    { expiresIn: "90d" }
  );
};

/**
 * Generate a verification token for email verification
 * @param {string} userId - The user ID to encode in the token
 * @returns {string} Verification JWT token
 */
const generateVerificationToken = (userId) => {
  return jwt.sign(
    { id: userId, type: "verification" },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

/**
 * Generate a password reset token
 * @param {string} userId - The user ID to encode in the token
 * @returns {string} Password reset JWT token
 */
const generatePasswordResetToken = (userId) => {
  return jwt.sign(
    { id: userId, type: "password-reset" },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

/**
 * Verify and decode a JWT token
 * @param {string} token - The JWT token to verify
 * @param {string} secret - The secret to verify against (optional, defaults to JWT_SECRET)
 * @returns {object} Decoded token payload
 */
const verifyToken = (token, secret = process.env.JWT_SECRET) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Decode a JWT token without verification (for inspection purposes)
 * @param {string} token - The JWT token to decode
 * @returns {object} Decoded token payload
 */
const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    throw new Error("Invalid token format");
  }
};

/**
 * Generate API key (for potential future use)
 * @param {string} userId - The user ID
 * @param {string} purpose - The purpose of the API key
 * @returns {string} API key
 */
const generateApiKey = (userId, purpose = "general") => {
  const payload = {
    id: userId,
    type: "api-key",
    purpose,
    issued: Date.now(),
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1y" });
};

/**
 * Check if a token is expired
 * @param {string} token - The JWT token to check
 * @returns {boolean} True if expired, false otherwise
 */
const isTokenExpired = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Get token expiration time
 * @param {string} token - The JWT token
 * @returns {Date|null} Expiration date or null if invalid
 */
const getTokenExpiration = (token) => {
  try {
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.exp) {
      return null;
    }

    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
};

/**
 * Extract user ID from token
 * @param {string} token - The JWT token
 * @returns {string|null} User ID or null if invalid
 */
const extractUserIdFromToken = (token) => {
  try {
    const decoded = jwt.decode(token);
    return decoded && decoded.id ? decoded.id : null;
  } catch (error) {
    return null;
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  generateVerificationToken,
  generatePasswordResetToken,
  generateApiKey,
  verifyToken,
  decodeToken,
  isTokenExpired,
  getTokenExpiration,
  extractUserIdFromToken,
};
