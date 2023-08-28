import { join } from 'path'
import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { isDirectorySync } from '../../tools/isDirectorySync'
import { getCreatedFolder } from '../../tools/getCreatedFolder'
import { getWritrenFileAsync } from '../../tools/getWritrenFileAsync'
import { getDateString } from '../../src/Shared/getDateString'

type getWrittenPromptReturnParams = {
  promptReturn: string
  dirname: string
  fileBaseName: string
  folderNameOut: string
}

interface getWrittenPromptReturnType {
  (
    getWrittenPromptReturnParams: getWrittenPromptReturnParams,
    options?: { printRes: boolean }
  ): Promise<any>
}

/**
 * @description Function to getWrittenPromptReturnAsync
 * @import import { getWrittenPromptReturnAsync } from '../shared/getWrittenPromptReturnAsync'
 */

export const getWrittenPromptReturnAsync: getWrittenPromptReturnType = async (
  { promptReturn, dirname, fileBaseName, folderNameOut },
  options
) => {
  let getWrittenPromptReturnRes: Promise<any>

  try {
    const dateTime = getDateString({ dash: true })
    const fileNameOut = `${fileBaseName}-${dateTime}.json`
    let pathDir = join(dirname, folderNameOut)
    let pathFull = join(dirname, folderNameOut, fileNameOut)

    let getWriteFileRes = ''
    if (promptReturn) {
      const isDirectorySyncRes = isDirectorySync(pathDir, {
        printRes: false,
      })

      if (!isDirectorySyncRes) {
        await getCreatedFolder(pathDir)
      }

      getWriteFileRes =
        (await getWritrenFileAsync(pathFull, promptReturn, {
          printRes: false,
        })) || {}
    }

    getWrittenPromptReturnRes = {
      ...JSON.parse(getWriteFileRes),
      dateTime,
    }

    if (options?.printRes) {
      consoler(
        'getWrittenPromptReturnAsync [44]',
        'getWrittenPromptReturnRes',
        getWrittenPromptReturnRes
      )
    }
    return getWrittenPromptReturnRes
  } catch (error) {
    consolerError('getWrittenPromptReturnAsync', error)
    return { error }
  }
}
