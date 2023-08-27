import { promises as fs } from 'fs'

import { consoler } from './consoler'
import { consolerError } from './consolerError'

import { getWritrenFileAsync } from './getWritrenFileAsync'

type getJsonToJsonLAsyncParams = {
  pathIn: string
  pathOut: string
}

interface getJsonToJsonLAsyncType {
  (
    getJsonToJsonLAsyncParams: getJsonToJsonLAsyncParams,
    options?: { printRes: boolean }
  ): Promise<string>
}

/**
 * @description Function to getJsonToJsonLAsync
 * @import import { getJsonToJsonLAsync } from './getJsonToJsonLAsync'
 */

export const getJsonToJsonLAsync: getJsonToJsonLAsyncType = async (
  getJsonToJsonLAsyncParams,
  options
) => {
  try {
    const { pathIn, pathOut } = getJsonToJsonLAsyncParams

    const readFileToStringRes = await fs.readFile(pathIn, 'utf8')
    const replacedSpacesInString = readFileToStringRes?.replace(
      /([\n\s]+)+/g,
      ' '
    )
    const replacedSpacesInString2 = replacedSpacesInString?.replace(
      /^\[\s([\s\S]*?)\s\]\s$/g,
      '$1'
    )
    const replacedSpacesInString3 = replacedSpacesInString2
      ?.split('}, { "messages":')
      .join('}\n{ "messages":')

    const getJsonToJsonLAsyncRes = await getWritrenFileAsync(
      pathOut,
      replacedSpacesInString3
    )

    if (options?.printRes) {
      consoler(
        'getJsonToJsonLAsync',
        'getJsonToJsonLAsyncRes',
        getJsonToJsonLAsyncRes
      )
    }

    return getJsonToJsonLAsyncRes
  } catch (error) {
    consolerError('getJsonToJsonLAsync', error)
    return
  }
}
