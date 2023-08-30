import { promises as fs } from 'fs'

import { consoler } from './consoler'
import { consolerError } from './consolerError'

export type GetTemplateParamsType = any

export type GetTemplateResType = Promise<any>

interface GetTemplateType {
  (
    params: GetTemplateParamsType,
    options?: { printRes: boolean }
  ): GetTemplateResType
}

/**
 * @description Function to getTemplate
 * @import import { getTemplate } from './getTemplate'
 */

export const getTemplate: GetTemplateType = async (params, options) => {
  try {
    const res = await ''

    if (options?.printRes) {
      consoler('getTemplate', 'getTemplateRes', res)
    }

    return res
  } catch (error) {
    consolerError('getTemplate', error)
    return
  }
}
