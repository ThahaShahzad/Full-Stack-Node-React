import mongoose, { Document } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { hash, genSalt, compare } from 'bcryptjs'

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
UserSchema.plugin(uniqueValidator)
interface IUser extends Document {
  email: string
  password: string
  firstName: string
  lastName: string
  isValidPassword(password: string): Promise<boolean>
}

UserSchema.pre<IUser>('save', async function (next: Function) {
  try {
    if (this.isNew) {
      const salt = await genSalt(10)
      const hashedPassword = await hash(this.password, salt)
      this.password = hashedPassword
    }
    next()
  } catch (error) {
    next(error)
  }
})

UserSchema.methods.isValidPassword = async function (password: string) {
  try {
    return await compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = mongoose.model<IUser>('User', UserSchema)

export default User
