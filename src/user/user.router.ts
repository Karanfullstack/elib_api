import { Router } from 'express'
import { creaseUser, loginUser } from './user.controller'
import Validation from '../middlewares/validations'
import { UserLoginSchema, UserRegisterSchema } from './user.types'

const userRouter = Router()

userRouter.post('/register', Validation(UserRegisterSchema), creaseUser)
userRouter.post('/login', Validation(UserLoginSchema), loginUser)

export default userRouter
