import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { z, ZodError } from 'zod'

const Validation = (schema: z.ZodObject<any, any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessage = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.')} is ${issue.message}`,
                }))

                return next(createHttpError(400, errorMessage[0]))
            } else {
                return res.json(createHttpError(400, 'Bad Request Validation'))
            }
        }
    }
}

export default Validation
