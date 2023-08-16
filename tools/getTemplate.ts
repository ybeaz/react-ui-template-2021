import chalk from 'chalk'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

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
