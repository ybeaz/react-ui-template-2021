import { promises as fs } from 'fs'
import chalk from 'chalk'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getWriteFileType {
  (pathFull: string, str: string, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getWritrenFileAsync
 * @import import { getWritrenFileAsync } from './getWritrenFileAsync'
 */

export const getWritrenFileAsync: getWriteFileType = async (
  pathFull,
  str,
  options
) => {
  try {
    await fs.writeFile(pathFull, str)

    if (options?.printRes) {
      consoler('getWritrenFileAsync', 'getWriteFileRes', str)
    }

    return str
  } catch (error) {
    consolerError('getWritrenFileAsync', error)
    return
  }
}
