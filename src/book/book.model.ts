import { model, Schema, Document, Model } from 'mongoose'
import { BookI } from './book.types'

interface BookModelI extends Document, BookI {}
const BookSchema = new Schema<BookModelI, Document>(
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
            id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        file: {
            id: {
                type: String,
                required: true,
            },
            secure_url: {
                type: String,
                required: true,
            },
        },
        genere: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
)

const BookModel: Model<BookModelI> = model<BookModelI>('Book', BookSchema)

export default BookModel
