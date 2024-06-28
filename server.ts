import app from './src/app'
import { config } from './src/config/config'
import connectDB from './src/config/db'

const server = async () => {
    await connectDB()
    const PORT = config.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`)
    })
}

server()
