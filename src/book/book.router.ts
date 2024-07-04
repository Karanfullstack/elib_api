import { Router } from 'express'
import {
    createBook,
    deleteBook,
    getAllBooks,
    getSingleBook,
    updateBook,
} from './book.controller'
import { upload } from '../middlewares/multer.middleare'
import Validation from '../middlewares/validations'
import { BookSchema, UpdateBookSchema } from './book.types'
import { authenticate } from '../middlewares/authenticate'

const bookRouter = Router()

// create a book router
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
// update book router
bookRouter.put(
    '/:id',
    authenticate,
    upload.fields([
        { name: 'coverImage', maxCount: 1 },
        { name: 'file', maxCount: 1 },
    ]),
    Validation(UpdateBookSchema),
    updateBook
)

bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getSingleBook)
bookRouter.delete('/:id', deleteBook)
export default bookRouter
