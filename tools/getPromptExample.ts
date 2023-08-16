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
    let getPromptExampleRes = str.split('/**')[1].split('*/')[0]
    getPromptExampleRes = getPromptExampleRes
      .split('\\n ')
      .slice(1, -1)
      .join('\\n')
    getPromptExampleRes = getPromptExampleRes

    if (options?.printRes) {
      consoler('getPromptExample', 'getPromptExampleRes', getPromptExampleRes)
    }

    return getPromptExampleRes
  } catch (error) {
    consolerError('getPromptExample', error)
    return
  }
}
