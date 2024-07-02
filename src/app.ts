import express, { Request, Response } from 'express'
import { globalError } from './middlewares/globalError'
import userRouter from './user/user.router'
import bookRouter from './book/book.router'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
const app = express()
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Health check</h1>')
})

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

app.use(globalError)
export default app
