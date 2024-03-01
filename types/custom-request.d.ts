import type { Request } from 'express'
type FilterQuery = { [key: string]: string | string[] }[]

export type QueryParams = {
  sort?: { [key: string]: SortOrder }
  filter: FilterQuery
  page: number
  limit: number
}

export type CustomRequest = Request & { filterParams: QueryParams }
