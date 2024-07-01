import { NextFunction, Request, Response } from 'express'
import { uploadService } from '../utils/upload.service'

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] }
    const cover = await uploadService(files, 'coverImage')
    const pdffile = await uploadService(files, 'file')
    console.log(pdffile, cover)
    // console.log(result)
    return res.status(200).json({ message: 'Book created' })
}
