import { Schema, model } from 'mongoose'
import { UserI } from './user.types'

const userSchema = new Schema<UserI>(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            minlength: 4,
            maxlength: 255,
        },
        password: {
            type: String,
            required: true,
            minlength: 4,
        },
    },
    { timestamps: true }
)

const User = model<UserI>('User', userSchema)

export default User
