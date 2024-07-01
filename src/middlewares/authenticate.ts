import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { verifyToken } from '../utils/jwt.service'

interface AuthRequest extends Request {
    userId: string
}
export const authenticate = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return next()
    // try {
    //     const token = req.header('Authorization')
    //     if (!token) {
    //         return next(createHttpError(401, 'Authorized token is required'))
    //     }

    //     const parseToken = token.split(' ')[1]
    //     const decoded = verifyToken(parseToken)
    //     const _req = req as AuthRequest
    //     _req.userId = decoded.sub as string
    //     next()
    // } catch (error) {
    //     return next(createHttpError(401, 'Token expired'))
    // }
}
