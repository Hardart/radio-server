import { Schema, model, InferSchemaType } from 'mongoose'

const CategorySchema = new Schema(
  {
    title: String,
    slug: String,
    preview: String,
    text: String,
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

CategorySchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Category = InferSchemaType<typeof CategorySchema>
export const Category = model('Category', CategorySchema)
