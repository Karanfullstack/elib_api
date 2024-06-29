import { Router } from 'express'
import { creaseUser } from './user.controller'

const userRouter = Router()

userRouter.get('/register', creaseUser)

export default userRouter
