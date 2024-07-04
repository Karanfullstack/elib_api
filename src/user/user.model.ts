import { Model, Schema, model, Document } from 'mongoose'
import { UserI } from './user.types'

interface User extends UserI, Document {}
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

const User: Model<User> = model<User>('User', userSchema)

export default User
