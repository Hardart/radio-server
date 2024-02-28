export type Article = {
  title: string
  slug: string
  content: string
  tags: string[]
  category: string
  createdAt: string
  updatedAt: string
}

export type ArticleQuery = {
  limit?: string
  page?: string
  tag?: string
}
