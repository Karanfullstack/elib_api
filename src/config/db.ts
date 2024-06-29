import mongoose from 'mongoose'
import { config } from './config'

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Connected to databse successfully')
        })
        mongoose.connection.on('error', (err) => {
            console.log('Error connecting to databse', err)
        })
        const connection = await mongoose.connect(config.DATABASE_URL as string)
        console.log(connection)
    } catch (error) {
        console.log('Error connecting to databse', error)
        process.exit(1)
    }
}

export default connectDB
