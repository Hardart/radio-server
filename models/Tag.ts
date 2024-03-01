import { Schema, model, InferSchemaType } from 'mongoose'

const TagSchema = new Schema(
  {
    title: String,
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

TagSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id
    delete ret.__v
    ret.name = ret.title
  },
})

export type Tag = InferSchemaType<typeof TagSchema>
export const Tag = model('Tag', TagSchema)
