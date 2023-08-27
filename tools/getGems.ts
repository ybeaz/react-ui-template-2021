import { nanoid as nanoidFunc } from 'nanoid'
import { v4 as uuidv4Func } from 'uuid'
import { getDateString } from '../src/Shared/getDateString'

import { consoler } from './consoler'
import { consolerError } from './consolerError'

type getGemsOutType = {
  uuidv4: string
  nanoid: string
  dateTime: string
  timestamp: number
}

interface getGemsType {
  (options?: { printRes: boolean }): getGemsOutType | undefined
}

/**
 * @description Function to getGems
 * @import import { getGems } from './getGems'
 */

export const getGems: getGemsType = (options = { printRes: true }) => {
  try {
    const uuidv4 = uuidv4Func()
    const nanoid = nanoidFunc()
    const dateTime = getDateString()
    const timestamp = +new Date()

    const getGemsRes: getGemsOutType = { uuidv4, nanoid, dateTime, timestamp }

    if (options?.printRes) {
      consoler('getGems', 'getGemsRes', getGemsRes)
    }

    return getGemsRes
  } catch (error) {
    consolerError('getGems', error)
    return
  }
}

getGems()
