import { NextFunction, Request, Response } from 'express'
import User from '../user/user.model'
import createHttpError from 'http-errors'
import { hashPassword } from '../utils/hashPassword'
import { createToken } from '../utils/jwtService'

const creaseUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body
    const user = await User.findOne({ email })
    if (user) {
        return next(createHttpError(400, 'User already exists'))
    }
    const hashedPassword = await hashPassword(password)
    const newUser = await User.create({ email, password: hashedPassword, name })
    const token = createToken(newUser)

    return res.status(201).json({
        success: true,
        message: 'User created successfully',
        access_token: token,
    })
}

export { creaseUser }
