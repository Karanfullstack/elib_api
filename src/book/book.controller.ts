import { NextFunction, Request, Response } from 'express'
import BookModel from './book.model'

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const book = await BookModel.find()
}
