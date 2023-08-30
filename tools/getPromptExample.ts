import chalk from 'chalk'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getPromptExampleType {
  (str: string, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getPromptExample
 * @import import { getPromptExample } from './getPromptExample'
 */

export const getPromptExample: getPromptExampleType = async (str, options) => {
  try {
    let res = str.split('/**')[1].split('*/')[0]
    res = res.split('\\n ').slice(1, -1).join('\\n')
    res = res

    if (options?.printRes) {
      consoler('getPromptExample', 'res', res)
    }

    return res
  } catch (error) {
    consolerError('getPromptExample', error)
    return
  }
}
