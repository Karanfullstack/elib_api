import { NextFunction, Request, Response } from 'express'

export const createBook = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log(req.files)
    return res.status(200).json({ message: 'Book created' })
}
