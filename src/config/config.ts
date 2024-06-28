import { config as conf } from 'dotenv'

conf()

const _configuration = {
    PORT: process.env.PORT,
}

export const config = Object.freeze(_configuration)
