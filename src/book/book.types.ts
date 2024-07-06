import { Request } from 'express'
import { z } from 'zod'
import { UserValidObjectIdSchema } from '../user/user.types'

export const BookSchema = z.object({
    title: z.string().min(4, 'title must be at least 4 character'),
    description: z.string(),
    author: UserValidObjectIdSchema.optional(),
    genere: z.string(),
    slug: z.string(),
})

export const UpdateBookSchema = z.object({
    title: z.string().min(4, 'title must be at least 4 characters').optional(),
    description: z.string().optional(),
    author: UserValidObjectIdSchema.optional(),
    genere: z.string().optional(),
    coverImage: z.object({ id: z.string(), secureUrl: z.string() }).optional(),
    file: z.object({ id: z.string(), secure_url: z.string() }).optional(),
})

const BookBaseSchema = BookSchema.extend({
    // _id: z.instanceof(Types.ObjectId)
    coverImage: z.object({ id: z.string(), secureUrl: z.string() }),
    file: z.object({ id: z.string(), secure_url: z.string() }),
})

type UpdateBookKeysI = keyof BookI
export type BookUpdatePayload = {
    [key in UpdateBookKeysI]?:
        | string
        | number
        | { id?: string; secure_url?: string }
} & Record<string, unknown>

export interface QueryType extends Request {
    query: {
        limit?: string
        page?: string
    }
    params: {
        id?: string
    }
}
export type BookI = z.infer<typeof BookBaseSchema>
