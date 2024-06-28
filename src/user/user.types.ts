import { z } from 'zod'
import { Types } from 'mongoose'

export const UserEntity = z.object({
    _id: z.instanceof(Types.ObjectId),
    name: z.string(),
    email: z.string(),
    password: z.string(),
})

export type User = z.infer<typeof UserEntity>
