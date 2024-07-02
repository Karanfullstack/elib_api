import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { AuthRequest } from '../middlewares/authenticate'
import { uploadService } from '../utils/upload.service'
import BookModel from './book.model'
import { BookI, BookUpdatePayload } from './book.types'
import { deleteCloudinaryImage } from '../utils/delete.service'

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

export const updateBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let book: BookI | null
    try {
        book = await BookModel.findOne({ _id: req.params.id })
    } catch (error) {
        return next(createHttpError(400, 'Error finding book'))
    }
    console.log(req.body)
    if (!book) return next(createHttpError(404, 'book not found'))

    const _req = req as AuthRequest
    if (book.author!.toString() !== _req.userId) {
        return next(createHttpError(403, 'you are not authorized'))
    }
    let payload: BookUpdatePayload = {}
    Object.keys(req.body).forEach((key) => {
        if (req.body[key]) {
            payload[key] = req.body[key]
        }
    })
    payload.author = _req.userId

    const files = req.files as Record<string, Express.Multer.File[]>
    try {
        if (files?.coverImage && files.coverImage[0]) {
            const updatedCoverImage = await uploadService(files, 'coverImage')
            if (updatedCoverImage) {
                await deleteCloudinaryImage(book.coverImage.id, 'image')
                payload.coverImage = {
                    id: updatedCoverImage.public_id,
                    secure_url: updatedCoverImage.secure_url,
                }
            }
        }
    } catch (error) {
        return next(createHttpError(400, 'Error uploading cover image'))
    }
    try {
        if (files?.file && files.file[0]) {
            const updatedFile = await uploadService(files, 'file')
            if (updatedFile) {
                await deleteCloudinaryImage(book.file.id, 'raw')
                payload.file = {
                    id: updatedFile.public_id,
                    secure_url: updatedFile.secure_url,
                }
            }
        }
    } catch (error) {
        return next(createHttpError(400, 'Error uploading pdf file'))
    }

    try {
        const updatedBook = await BookModel.findOneAndUpdate(
            {
                _id: req.params.id,
            },
            { $set: payload },
            { new: true, runValidators: true }
        )
        return res
            .status(201)
            .json({ message: 'Book updated', book: updatedBook })
    } catch (error) {
        console.log(error)
        return next(createHttpError(400, 'Error updating book'))
    }
}

// TODO NEED TO BE FIXED UPDATE BOOK CONTROLLER DATA NOT ABLE TO RECIEVE FROM REQUEST
