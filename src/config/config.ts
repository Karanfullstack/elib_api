import { config as conf } from 'dotenv'

// dotenv called
conf()

const _configuration = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABSE_URI,
    ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_URL: process.env.CLOUDINARY_URL,
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN,
}

export const config = Object.freeze(_configuration)
