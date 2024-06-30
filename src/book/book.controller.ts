import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }

    // const { title, description, author, coverImage, file, genere } = req.body
    console.log(req.body)
    console.log(files)
    return res.status(200).json({ message: 'Book created' })
}
