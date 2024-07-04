import express, { Request, Response } from 'express'
import { globalError } from './middlewares/globalError'
import userRouter from './user/user.router'
import bookRouter from './book/book.router'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { config } from './config/config'
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: config.FRONTEND_DOMAIN,
    })
)

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Health check</h1>')
})

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

app.use(globalError)
export default app
