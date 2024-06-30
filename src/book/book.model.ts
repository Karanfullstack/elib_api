import mongoose, { model, Schema } from 'mongoose'
import { BookI } from './book.types'

const BookSchema = new Schema<BookI>(
    {
        title: {
            type: String,
            required: true,
            minlength: 4,
        },
        description: {
            type: String,
            required: true,
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        coverImage: {
            type: String,
            required: true,
        },
        file: {
            type: String,
            required: true,
        },
        genere: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

const BookModel = model<BookI>('Book', BookSchema)

export default BookModel
