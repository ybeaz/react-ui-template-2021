import chalk from 'chalk'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getReplacedSpacesInStringType {
  (str: string, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getReplacedSpacesInString
 * @import import { getReplacedSpacesInString } from './getReplacedSpacesInString'
 */

export const getReplacedSpacesInString: getReplacedSpacesInStringType = async (
  str,
  options
) => {
  try {
    const getReplacedSpacesInStringRes = str?.replace(/\s\s+/g, ' ')

    if (options?.printRes) {
      consoler(
        'getReplacedSpacesInString',
        'getReplacedSpacesInStringRes',
        getReplacedSpacesInStringRes
      )
    }

    return getReplacedSpacesInStringRes
  } catch (error) {
    consolerError('getReplacedSpacesInString', error)
    return
  }
}
