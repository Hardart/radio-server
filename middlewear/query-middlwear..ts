import { Response, NextFunction, Request } from 'express'
import { SortOrder } from 'mongoose'
import { QueryParams } from '../types/custom-request'

const BASE_QUERY = {
  limit: 10,
  sort: { createdAt: 'desc' },
}
const filterKeys = ['categoryId', 'isPublished', 'tags']

export function setFilter(req: Request, _: Response, next: NextFunction) {
  const queryObject = req.query as object
  const params = Object.entries(queryObject).reduce((acc, [key, value]) => {
    if (key == 'sort') acc['sort'] = value.split('_').reduce((acc: string, curr: SortOrder) => ({ [acc]: curr }))
    if (key == 'page') acc['page'] = parseInt(value)
    if (key == 'limit') acc['limit'] = parseInt(value)
    if (typeof acc['filter'] == 'undefined' || !Array.isArray(acc['filter'])) acc['filter'] = []
    if (filterKeys.includes(key)) acc['filter'].push({ [key]: value })
    return acc
  }, {} as QueryParams)

  if (!params.filter?.length) params.filter = [{}]
  if (!params.limit) params.limit = BASE_QUERY.limit
  if (!params.sort) params.sort = BASE_QUERY.sort
  params.page = params.page ? params.page - 1 : 0

  req.body.filterParams = params

  next()
}
