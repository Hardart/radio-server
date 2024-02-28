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
  { timestamps: true, versionKey: false }
)

ArticleSchema.set('toObject', {
  versionKey: false,
  virtuals: true,
  transform: function (_, ret) {
    ret.category = ret.categoryId
    delete ret._id
    delete ret.__v
    delete ret.categoryId
    delete ret.category._id
    ret.url = `/${ret.category.slug}/${ret.slug}`
  },
})

ArticleSchema.set('toJSON', {
  versionKey: false,
  virtuals: false,
  transform: function (_, ret) {
    ret.category = ret.categoryId
    delete ret.__v
    delete ret.categoryId
    ret.url = `/${ret.category.slug}/${ret.slug}`
  },
})

export type Article = InferSchemaType<typeof ArticleSchema>
export const Article = model('Article', ArticleSchema)
