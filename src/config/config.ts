import { config as conf } from 'dotenv'

// dotenv called
conf()

const _configuration = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABSE_URI as string,
    ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET as string,
}

export const config = Object.freeze(_configuration)
