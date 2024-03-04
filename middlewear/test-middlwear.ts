import { Response, NextFunction, Request } from 'express'
import { SortOrder } from 'mongoose'
import type { QueryParams, Filter, Sort } from '../types/custom-request'
// const queryKeys = ['tags',]
const BASE_QUERY = {
  limit: 10,
  sort: { createdAt: 'desc' },
}

const toNumberKeys = ['page', 'limit'] as const
export const filterKeys = ['tags', 'publishDate', 'isPublished'] as const
export function decodeQuery(req: Request, res: Response, _: NextFunction) {
  const query = req.query
  const entries = Object.entries(query) as [string, string][]

  const queryBundle = entries.reduce((acc, [key, value]) => {
    if (!acc.filter && !Array.isArray(acc.filter)) acc.filter = [{ isPublished: '1' }]
    toNumberKeys.forEach(setNumberedKeys)
    filterKeys.forEach(setFilterQuery)
    setSortQuery()

    function setNumberedKeys(item: (typeof toNumberKeys)[number]) {
      if (item === key) acc[key] = Math.abs(parseInt(value))
    }

    function setFilterQuery(item: Filter) {
      if (item !== key) return
      if (key === 'isPublished') {
        acc.filter = acc.filter.map(f => {
          f.isPublished = value
          return f
        })
      } else if (key === 'publishDate') {
        if (Date.parse(value)) acc.filter.push({ [key]: new Date(value).toISOString() })
      } else {
        acc.filter.push({ [key]: value })
      }
    }

    function setSortQuery() {
      if (key === 'sort') {
        const [sortKey, sortValue] = value.split('_') as [Sort, SortOrder]
        console.log(sortValue)
        acc.sort = { [sortKey]: isSortOrder(sortValue) ? sortValue : 'desc' }
      }
    }

    return acc
  }, {} as QueryParams)

  queryBundle.page = !queryBundle.page || isNaN(queryBundle.page) ? 0 : queryBundle.page - 1
  if (!queryBundle.filter) queryBundle.filter = [{}]
  if (!queryBundle.limit || isNaN(queryBundle.limit)) queryBundle.limit = BASE_QUERY.limit
  if (!queryBundle.sort) queryBundle.sort = BASE_QUERY.sort
  console.log(queryBundle)
  return res.json('ok')
}

function isSortOrder(value: any): value is SortOrder {
  return value == 'desc' || value == 'asc'
}
