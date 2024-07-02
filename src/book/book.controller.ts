import { NextFunction, Request, Response } from 'express'
import { uploadService } from '../utils/upload.service'
import { BookI } from './book.types'
import BookModel from './book.model'
import createHttpError from 'http-errors'
import { AuthRequest } from '../middlewares/authenticate'

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const files = req.files as Record<string, Express.Multer.File[]>

    const { title, description, genere } = req.body as BookI
    let cover
    let pdffile

    try {
        cover = await uploadService(files, 'coverImage')
        pdffile = await uploadService(files, 'file')
    } catch (error) {
        console.log(error)
        return next(createHttpError(400, 'Error uploading files'))
    }
    const _req = req as AuthRequest
    try {
        const book = await BookModel.create({
            title,
            description,
            coverImage: {
                id: cover.public_id,
                secure_url: cover.secure_url,
            },
            file: {
                id: pdffile.public_id,
                secure_url: pdffile.secure_url,
            },
            author: _req.userId,
            genere,
        })

        return res.status(200).json({ message: 'Book created', book: book })
    } catch (error) {
        console.log(error)
        return next(createHttpError(400, 'Error creating book'))
    }
}
