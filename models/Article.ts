import { Schema, model, InferSchemaType } from 'mongoose'

const ArticleSchema = new Schema(
  {
    title: String,
    slug: String,
    preview: String,
    text: String,
    url: String,
    images: [String],
    isPublished: { type: Boolean, default: false },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

ArticleSchema.set('toJSON', {
  versionKey: false,
  transform: function (_, ret) {
    delete ret._id
    delete ret.__v
  },
})

export type Article = InferSchemaType<typeof ArticleSchema>
export const Article = model('Article', ArticleSchema)
