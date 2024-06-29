import { NextFunction, Request, Response } from 'express'

const creaseUser = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        message: 'User created successfully',
    })
}

export { creaseUser }
