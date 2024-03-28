import { Schema, model, InferSchemaType } from 'mongoose'

const ArticleSchema = new Schema(
  {
    title: String,
    slug: String,
    image: String,
    content: String,
    publishAt: { type: Schema.Types.Date, default: new Date(), required: true },
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
    if (ret.category.slug) ret.url = `/${ret.category.slug}/${ret.slug}`
    delete ret._id
    delete ret.categoryId
  },
})

export type Article = InferSchemaType<typeof ArticleSchema>
export type ArticleWithID = Article & { id: string }
export const Article = model('Article', ArticleSchema)
