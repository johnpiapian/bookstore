import type { NextConfig } from 'next'

/**
 * .env for default environment variables + overrides (.env.development, .env.production)
 */
const defaultEnv = {
  WELCOME: process.env.WELCOME || "Welcome to the Bookstore!",
}

const nextConfig: NextConfig = {
  env: defaultEnv,
};

export default nextConfig;
