export type Article = {
  id: string
  title: string
  slug: string
  content: string
  tags: string[]
  category: string
  createdAt: string
  updatedAt: string
  publishAt: string
  isPublished: boolean
}

export type ArticleQuery = {
  limit?: string
  page?: string
  tag?: string
}
