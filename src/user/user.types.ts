import { z } from 'zod'
import { Types } from 'mongoose'

export const UserEntity = z.object({
    _id: z.instanceof(Types.ObjectId).optional(),
    name: z.string().min(3),
    email: z.string().min(4),
    password: z.string(),
})

export type User = z.infer<typeof UserEntity>
