import { promises as fs } from 'fs'

import { consoler } from './consoler'
import { consolerError } from './consolerError'

export type GetTemplateAsyncParamsType = any

export type GetTemplateAsyncResType = Promise<any>

interface GetTemplateAsyncType {
  (
    params: GetTemplateAsyncParamsType,
    options?: { printRes: boolean }
  ): GetTemplateAsyncResType
}

/**
 * @description Function to getTemplateAsync
 * @import import { getTemplateAsync } from './getTemplateAsync'
 */

export const getTemplateAsync: GetTemplateAsyncType = async (
  params,
  options
) => {
  try {
    const res = await ''

    if (options?.printRes) {
      consoler('getTemplateAsync', 'res', res)
    }

    return res
  } catch (error: any) {
    consolerError('getTemplateAsync', error)
    return
  }
}
