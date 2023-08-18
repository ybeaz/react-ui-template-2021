import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'

interface GetTemplateType {
  (getTemplateParams, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getTemplate
 * @import import { getTemplate } from './getTemplate'
 */

export const getTemplate: GetTemplateType = async (
  getTemplateParams,
  options
) => {
  try {
    const getTemplateRes = await ''

    if (options?.printRes) {
      consoler('getTemplate', 'getTemplateRes', getTemplateRes)
    }

    return getTemplateRes
  } catch (error) {
    consolerError('getTemplate', error)
    return
  }
}
