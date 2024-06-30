import { Types } from 'mongoose'
import { z } from 'zod'
import { UserValidObjectIdSchema } from '../user/user.types'

export const BookSchema = z.object({
    title: z.string().min(4, 'title must be at least 4 character'),
    description: z.string(),
    coverImage: z.any(),
    file: z.any(),
    author: UserValidObjectIdSchema,
    genere: z.string(),
})

const BookBaseSchema = BookSchema.extend({
    _id: z.instanceof(Types.ObjectId),
})

export type BookI = z.infer<typeof BookBaseSchema>
