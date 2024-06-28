import { config as conf } from 'dotenv'

conf()

const _configuration = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABSE_URI as string,
}

export const config = Object.freeze(_configuration)
