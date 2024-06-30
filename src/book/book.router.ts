import { Router } from 'express'
import { createBook } from './book.controller'
import { upload } from '../middlewares/multer.middleare'
import Validation from '../middlewares/validations'
import { BookSchema } from './book.types'

const bookRouter = Router()

bookRouter.post(
    '/',

    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'file', maxCount: 1 },
    ]),
    Validation(BookSchema),
    createBook
)
// todo: schema refactor according to multer
export default bookRouter
