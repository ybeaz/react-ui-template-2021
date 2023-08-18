import { promises as fs } from 'fs'
import chalk from 'chalk'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getReadFileJsonType {
  (path: string, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getReadFileJson
 * @import import { getReadFileJson } from './getReadFileJson'
 */

export const getReadFileJson: getReadFileJsonType = async (path, options) => {
  try {
    let getReadFileJsonRes = await fs.readFile(path, 'utf8')
    getReadFileJsonRes = JSON.parse(getReadFileJsonRes)

    if (options?.printRes) {
      consoler('getReadFileJson', 'getReadFileJsonRes', getReadFileJsonRes)
    }

    return getReadFileJsonRes
  } catch (error) {
    consolerError('getReadFileJson', error)
    return
  }
}
