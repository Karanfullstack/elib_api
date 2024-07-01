import { z } from 'zod'
import { Types } from 'mongoose'

const isValidObjectId = (value: string) => Types.ObjectId.isValid(value)

export const UserValidObjectIdSchema = z.custom(
    (value) => {
        if (typeof value === 'string' && isValidObjectId(value)) {
            return true
        }
        return false
    },
    {
        message: 'author must be a valid ObjectId',
    }
)

export const UserBaseSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 chracter'),
    email: z.string().min(4, 'email  must be at least 4 chracter').email(),
    password: z.string().min(4, 'password must be at least 4 chracter'),
})

export const UserEntity = UserBaseSchema.extend({
    _id: UserValidObjectIdSchema.optional(),
})

export const UserRegisterSchema = UserBaseSchema

export const UserLoginSchema = z.object({
    email: UserBaseSchema.shape.email,
    password: UserBaseSchema.shape.password,
})

export type UserI = z.infer<typeof UserEntity>
export type UserRegisterI = z.infer<typeof UserRegisterSchema>
export type UserLoginI = z.infer<typeof UserLoginSchema>
