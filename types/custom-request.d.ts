import type { Request } from 'express'
import { filterKeys } from '../middlewear/query-middlwear'

export type Filter = (typeof filterKeys)[number]
export type FilterQuery = Partial<Record<Filter, string | string[]>>
export type Sort = 'createdAt' | 'updatedAt'
export type SortQuery = Partial<Record<Sort, SortOrder>>

export type QueryParams = {
  sort: SortQuery
  filter: FilterQuery[]
  page: number
  limit: number
}

export type CustomRequest = Request & { filterParams: QueryParams }
