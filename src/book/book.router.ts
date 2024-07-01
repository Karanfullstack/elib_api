import { Router } from 'express'
import { createBook } from './book.controller'
import { upload } from '../middlewares/multer.middleare'
import Validation from '../middlewares/validations'
import { BookSchema } from './book.types'
import { authenticate } from '../middlewares/authenticate'

const bookRouter = Router()

bookRouter.post(
    '/',
    authenticate,
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'file', maxCount: 1 },
    ]),
    Validation(BookSchema),
    createBook
)

export default bookRouter
