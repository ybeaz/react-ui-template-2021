import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'

interface getUplodedFileAsyncType {
  (getUplodedFileAsyncParams, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getUplodedFileAsync
 * @import import { getUplodedFileAsync } from './getUplodedFileAsync'
 */

export const getUplodedFileAsync: getUplodedFileAsyncType = async (
  getUplodedFileAsyncParams,
  options
) => {
  try {
    const getUplodedFileAsyncRes = await ''

    if (options?.printRes) {
      consoler(
        'getUplodedFileAsync',
        'getUplodedFileAsyncRes',
        getUplodedFileAsyncRes
      )
    }

    return getUplodedFileAsyncRes
  } catch (error) {
    consolerError('getUplodedFileAsync', error)
    return
  }
}
