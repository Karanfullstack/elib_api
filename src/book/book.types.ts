import { Types } from 'mongoose'
import { z } from 'zod'
import User from '../user/user.model'

export const BookSchema = z.object({
    title: z.string().min(4, 'title must be at least 4 character'),
    description: z.string(),
    author: z.instanceof(User),
    coverImage: z.string(),
    file: z.string(),
    genere: z.string(),
})

const BookBaseSchema = BookSchema.extend({
    _id: z.instanceof(Types.ObjectId),
})

export type BookI = z.infer<typeof BookBaseSchema>
