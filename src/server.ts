import app from './app'
import { config } from './config/config'
import connectDB from './config/db'

const server = async () => {
    const PORT = config.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
    await connectDB()
}

server()
