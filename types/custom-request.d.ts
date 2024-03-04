import type { Request } from 'express'
import { filterKeys } from '../middlewear/test-middlwear'

export type Filter = (typeof filterKeys)[number]
export type FilterQuery = Partial<Record<Filter, string | Date>>
export type Sort = 'createdAt' | 'updatedAt'
export type SortQuery = Partial<Record<Sort, SortOrder>>

export type QueryParams = {
  sort: SortQuery
  filter: FilterQuery[]
  page: number
  limit: number
}

export type CustomRequest = Request & { filterParams: QueryParams }
