import { CookieOptions, NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import User from '../user/user.model'
import { comparePassword, hashPassword } from '../utils/hash.service'
import { createToken } from '../utils/jwt.service'

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

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    let user
    try {
        user = await User.findOne({ email })
    } catch (error) {
        return next(createHttpError(400, 'Error in finding user in login'))
    }
    if (!user) {
        return next(createHttpError(400, 'User not found'))
    }
    let isPasswordMatch
    try {
        isPasswordMatch = await comparePassword(password, user.password)
    } catch (error) {
        return next(createHttpError(400, 'Error in comparing password'))
    }

    if (!isPasswordMatch) {
        return next(createHttpError(400, 'Invalid password'))
    }

    const options: CookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    }

    try {
        const token = 'Bearer ' + createToken(user)

        return res.status(200).cookie('accessToken', token, options).json({
            success: true,
            message: 'User logged in successfully',
            access_token: token,
        })
    } catch (error) {
        return next(createHttpError(400, 'Error creating token'))
    }
}

export { creaseUser, loginUser }
