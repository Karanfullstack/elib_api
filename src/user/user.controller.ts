import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import User from '../user/user.model'
import { hashPassword } from '../utils/hashPassword'
import { createToken } from '../utils/jwtService'

const creaseUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, name } = req.body

    let user
    try {
        user = await User.findOne({ email })
    } catch (error) {
        return next(createHttpError(400, 'Error Finding User '))
    }

    if (user) {
        return next(createHttpError(400, 'User already exists'))
    }
    const hashedPassword = await hashPassword(password)

    let newUser
    try {
        newUser = await User.create({
            email,
            password: hashedPassword,
            name,
        })
    } catch (error) {
        return next(createHttpError(400, 'Error creating user'))
    }
    try {
        const token = createToken(newUser)

        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            access_token: token,
        })
    } catch (error) {
        return next(createHttpError(400, 'Error creating token'))
    }
}

export { creaseUser }
