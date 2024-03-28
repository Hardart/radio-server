import { Schema, model, InferSchemaType } from 'mongoose'

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: String,
    roles: { type: [String], default: ['user'], required: true },
  },
  {
    toObject: { virtuals: true },
    versionKey: false,
    timestamps: true,
    virtuals: {
      fullName: {
        get() {
          return this.lastName + ' ' + this.firstName
        },
      },
    },
  }
)

export type User = InferSchemaType<typeof UserSchema>
export const User = model('User', UserSchema)
