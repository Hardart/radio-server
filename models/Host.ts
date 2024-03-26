import { Schema, model, InferSchemaType } from 'mongoose'

const HostSchema = new Schema(
  {
    firstName: String,
    secondName: String,
    description: String,
    avatar: String,
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

HostSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    delete ret._id
    ret.fullName = ret.secondName + ' ' + ret.firstName
  },
})

export type Host = InferSchemaType<typeof HostSchema>
export const Host = model('Host', HostSchema)
