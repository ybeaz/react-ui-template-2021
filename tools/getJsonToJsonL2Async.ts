import { promises as fs } from 'fs'

const jsonTojsonl = require('json-to-jsonl')

/*

  // The array is top-level in my-file-1.json so don't have to specify getArray func:
  const response1 = jsonTojsonl('my-file-1.json')
  // { lines: 3, file: 'my-file-1.jsonl' }
 
  // The array is a value in the my-file-2.json object so we have to specify a getArray func:
  const response2 = jsonTojsonl('my-file-2.json', x => x.longList)
  // { lines: 4, file: 'my-file-2.jsonl' }
*/

import { consoler } from './consoler'
import { consolerError } from './consolerError'

import { getWritrenFileAsync } from './getWritrenFileAsync'

type GetJsonToJsonL2AsyncParams = {
  pathIn: string
  pathOut: string
}

interface GetJsonToJsonL2AsyncType {
  (
    params: GetJsonToJsonL2AsyncParams,
    options?: { printRes: boolean }
  ): Promise<string>
}

/**
 * @description Function to getJsonToJsonL2Async
 * @import import { getJsonToJsonL2Async } from './getJsonToJsonL2Async'
 */

export const getJsonToJsonL2Async: GetJsonToJsonL2AsyncType = async (
  params,
  options
) => {
  try {
    const { pathIn, pathOut } = params

    const readFileToStringRes = await fs.readFile(pathIn, 'utf8')

    const res = jsonTojsonl(pathIn)
    // const res = await getWritrenFileAsync(pathOut, replacedSpacesInString3)

    if (options?.printRes) {
      consoler('getJsonToJsonL2Async', 'getJsonToJsonL2AsyncRes', res)
    }

    return res
  } catch (error) {
    consolerError('getJsonToJsonL2Async', error)
    return
  }
}
