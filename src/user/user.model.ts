import { Schema, model } from 'mongoose'
import { User } from './user.types'

const userSchema = new Schema<User>(
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
            minlength: 5,
            maxlength: 255,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
    },
    { timestamps: true }
)

const User = model<User>('User', userSchema)

export default User
