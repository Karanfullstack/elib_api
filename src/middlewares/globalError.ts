import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import { config } from '../config/config'

export const globalError = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500
    res.status(statusCode).json({
        message: err.message,
        stackError: config.ENV === 'dev' ? err.stack : undefined,
    })
}
