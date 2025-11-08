import dotenv from 'dotenv'

// create .env file to override default config values
dotenv.config({ path: [`./config/.env.${process.env.NODE_ENV}`, './config/.env'] })

export default {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || '',
}
