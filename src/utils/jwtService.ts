import jwt from 'jsonwebtoken'
import { UserI } from '../user/user.types'
import { config } from '../config/config'

export const createToken = (payload: UserI) => {
    return jwt.sign({ sub: payload._id }, config.JWT_SECRET, {
        expiresIn: '1d',
    })
}
