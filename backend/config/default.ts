/**
 * Create .env.development to override these values during development.
 * Create .env.production to override these values during production.
 */

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || '',
}
