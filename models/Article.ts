import { Schema, model, InferSchemaType } from 'mongoose'

const ArticleSchema = new Schema(
  {
    title: String,
    slug: String,
    preview: String,
    content: String,
    url: String,
    isPublished: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
  },
  { timestamps: true, versionKey: false, toObject: { virtuals: true } }
)

ArticleSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    ret.category = ret.categoryId
    delete ret._id
    delete ret.__v
    delete ret.categoryId
  },
})

export type Article = InferSchemaType<typeof ArticleSchema>
export const Article = model('Article', ArticleSchema)
