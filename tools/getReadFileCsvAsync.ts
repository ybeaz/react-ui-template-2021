import * as csv from 'fast-csv'

import { consoler } from './consoler'
import { consolerError } from './consolerError'

export type GetReadFileCsvAsyncParamsType = { path: string }

export type GetReadFileCsvAsyncResType = Promise<any[]>

interface GetReadFileCsvAsyncType {
  (
    params: GetReadFileCsvAsyncParamsType,
    options?: { rowProcessor?: (row: any) => any; printRes: boolean }
  ): GetReadFileCsvAsyncResType
}

const getReadFileCsvPromise: GetReadFileCsvAsyncType = (params, options) => {
  return new Promise((resolve, reject) => {
    const { path } = params
    const rowProcessor =
      options && options.rowProcessor ? options.rowProcessor : undefined

    const res: any[] = []

    csv
      .parseFile(path, { headers: true })
      .on('error', reject)
      .on('data', (row: any) => {
        if (rowProcessor) {
          const obj = rowProcessor(row)
          if (obj) res.push(obj)
        } else {
          res.push(row)
        }
      })
      .on('end', () => {
        resolve(res)
      })
  })
}

/**
 * @description Function to getReadFileCsvAsync
 * @example file.csv
"id","joke"
1,"I can't hear what they're saying cuz I'm talking"
2,"Telling my daughter"
 * @import import { getReadFileCsvAsync } from './getReadFileCsvAsync'
 */
export const getReadFileCsvAsync: GetReadFileCsvAsyncType = async (
  params,
  options
) => {
  try {
    const res = await getReadFileCsvPromise(params, options)

    if (options?.printRes) {
      consoler('getReadFileCsvAsync', 'getReadFileCsvAsyncRes', res)
    }

    return res
  } catch (error) {
    consolerError('getReadFileCsvAsync', error)
    return []
  }
}
