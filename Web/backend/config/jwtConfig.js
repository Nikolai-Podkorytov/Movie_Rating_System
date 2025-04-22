// Configuration for JSON Web Token
// Retrieves secret from environment or falls back to a default
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'supersecretkey123'
};