import { Router } from 'express'
import { createBook } from './book.controller'
import { upload } from '../middlewares/multer.middleare'
import Validation from '../middlewares/validations'

const bookRouter = Router()

bookRouter.post(
    '/',
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'file', maxCount: 1 },
    ]),
    createBook
)
// todo: schema refactor according to multer
export default bookRouter
