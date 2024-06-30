import express, { Request, Response } from 'express'
import { globalError } from './middlewares/globalError'
import userRouter from './user/user.router'
import bookRouter from './book/book.router'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('<h1>Health check</h1>')
})

app.use('/api/users', userRouter)
app.use('/api/books', bookRouter)

app.use(globalError)
export default app
