import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'

interface getTemplateAsyncType {
  (getTemplateAsyncParams, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getTemplateAsync
 * @import import { getTemplateAsync } from './getTemplateAsync'
 */

export const getTemplateAsync: getTemplateAsyncType = async (
  getTemplateAsyncParams,
  options
) => {
  try {
    const getTemplateAsyncRes = await ''

    if (options?.printRes) {
      consoler('getTemplateAsync', 'getTemplateAsyncRes', getTemplateAsyncRes)
    }

    return getTemplateAsyncRes
  } catch (error) {
    consolerError('getTemplateAsync', error)
    return
  }
}
