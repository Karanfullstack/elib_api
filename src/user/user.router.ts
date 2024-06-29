import { Router } from 'express'
import { creaseUser } from './user.controller'
import Validation from '../middlewares/validations'
import { UserRegisterSchema } from './user.types'

const userRouter = Router()

userRouter.post('/register', Validation(UserRegisterSchema), creaseUser)

export default userRouter
