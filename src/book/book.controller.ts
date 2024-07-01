import { NextFunction, Request, Response } from 'express'
import { uploadService } from '../utils/upload.service'
import { BookI } from './book.types'
import BookModel from './book.model'
import createHttpError from 'http-errors'

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const files = req.files as Record<string, Express.Multer.File[]>
    const { title, description, genere, author } = req.body as BookI
        
    let cover
    let pdffile

    try {
        cover = await uploadService(files, 'coverImage')
        pdffile = await uploadService(files, 'file')
    } catch (error) {
        return next(createHttpError(400, 'Error uploading files'))
    }

    try {
        const book = await BookModel.create({
            title,
            description,
            coverImage: cover.secure_url,
            file: pdffile.secure_url,
            author,
            genere,
        })
        return res.status(200).json({ message: 'Book created', book: book })
    } catch (error) {
        return next(createHttpError(400, 'Error creating book'))
    }
}
