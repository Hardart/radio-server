import { Schema, model, InferSchemaType } from 'mongoose'

const ArticleSchema = new Schema(
  {
    title: String,
    slug: String,
    preview: String,
    content: String,
    publishAt: { type: Schema.Types.Date, default: new Date() },
    isPublished: { type: Boolean, default: false },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
    tags: [String],
  },
  { timestamps: true, versionKey: false }
)

ArticleSchema.set('toJSON', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    ret.category = ret.categoryId
    ret.url = `/${ret.category.slug}/${ret.slug}`
    delete ret._id
    delete ret.categoryId
  },
})

export type Article = InferSchemaType<typeof ArticleSchema>
export const Article = model('Article', ArticleSchema)
