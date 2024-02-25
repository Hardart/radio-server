import { Schema, model, InferSchemaType } from 'mongoose'

const TagSchema = new Schema(
  {
    title: String,
    slug: String,
    isPublished: { type: Boolean, default: false },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

TagSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Tag = InferSchemaType<typeof TagSchema>
export const Tag = model('Tag', TagSchema)
