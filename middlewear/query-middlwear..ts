// import { Response, NextFunction, Request } from 'express'
// import { SortOrder } from 'mongoose'
// import type { QueryParams } from '../types/custom-request'

// const BASE_QUERY = {
//   limit: 10,
//   sort: { createdAt: 'desc' },
//   filter: {
//     isPublished: { isPublished: '1' },
//   },
// }
// const filterKeys = ['categoryId', 'tags']
// const toNumber = ['page', 'limit']

// export function setFilter(_: Request, _: Response, next: NextFunction) {
//   // const queryObject = req.query as Record<string, string>

//   // const params = Object.entries(queryObject).reduce((acc, [key, value]) => {
//   //   // if (key == 'sort') acc['sort'] = value.split('_').reduce((acc: string, curr: SortOrder) => ({ [acc]: curr }))
//   //   // if (key == 'page') acc['page'] = parseInt(value)
//   //   if (key == 'limit') acc['limit'] = parseInt(value)
//   //   // if (toNumber.includes(key) && value) acc[key] = parseInt(value)
//   //   // if (typeof acc['filter'] == 'undefined' || !Array.isArray(acc['filter'])) acc['filter'] = []
//   //   // if (filterKeys.includes(key) && value) acc['filter'].push({ [key]: value })
//   //   return acc
//   // }, {} as QueryParams)
//   // console.log(params.filter)
//   // if (!params.filter?.length) params.filter = [{}]
//   // if (!params.limit) params.limit = BASE_QUERY.limit
//   // if (!params.sort) params.sort = BASE_QUERY.sort
//   // params.page = params.page ? params.page - 1 : 0
//   // req.body.filterParams = params
//   // console.log(params)

//   next()
// }
