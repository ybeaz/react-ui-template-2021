import { promises as fs } from 'fs'
import chalk from 'chalk'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getReadFileToStringType {
  (path: string, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getReadFileToString
 * @import import { getReadFileToString } from './getReadFileToString'
 */

export const getReadFileToString: getReadFileToStringType = async (
  path,
  options
) => {
  try {
    let getReadFileToStringRes = await fs.readFile(path, 'utf8')
    getReadFileToStringRes = JSON.stringify(getReadFileToStringRes)

    if (options?.printRes) {
      consoler(
        'getReadFileToString',
        'getReadFileToStringRes',
        getReadFileToStringRes
      )
    }

    return getReadFileToStringRes
  } catch (error) {
    consolerError('getReadFileToString', error)
    return
  }
}
