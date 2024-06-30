import { z } from 'zod'
import { Types } from 'mongoose'

export const UserBaseSchema = z.object({
    name: z.string().min(4, 'Name must be at least 4 chracter'),
    email: z.string().min(4, 'email  must be at least 4 chracter').email(),
    password: z.string().min(4, 'password must be at least 4 chracter'),
})

export const UserEntity = UserBaseSchema.extend({
    _id: z.instanceof(Types.ObjectId),
})

export const UserRegisterSchema = UserBaseSchema

export const UserLoginSchema = z.object({
    email: UserBaseSchema.shape.email,
    password: UserBaseSchema.shape.password,
})

export type UserI = z.infer<typeof UserEntity>
export type UserRegisterI = z.infer<typeof UserRegisterSchema>
export type UserLoginI = z.infer<typeof UserLoginSchema>
