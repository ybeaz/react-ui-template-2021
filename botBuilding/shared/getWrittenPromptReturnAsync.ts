import { join } from 'path'
import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { isDirectory } from '../../tools/isDirectory'
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
  ): Promise<void>
}

/**
 * @description Function to getWrittenPromptReturnAsync
 * @import import { getWrittenPromptReturnAsync } from '../shared/getWrittenPromptReturnAsync'
 */

export const getWrittenPromptReturnAsync: getWrittenPromptReturnType = async (
  { promptReturn, dirname, fileBaseName, folderNameOut },
  options
) => {
  try {
    const dateTime = getDateString({ dash: true })
    const fileNameOut = `${fileBaseName}-${dateTime}.json`
    let pathDir = join(dirname, folderNameOut)
    let pathFull = join(dirname, folderNameOut, fileNameOut)

    let getWriteFileRes = ''
    if (promptReturn) {
      if (!(await isDirectory(pathDir))) {
        await getCreatedFolder(pathDir)
      }
      getWriteFileRes =
        (await getWritrenFileAsync(pathFull, promptReturn, {
          printRes: false,
        })) || {}
    }

    if (options?.printRes) {
      consoler(
        'getWrittenPromptReturnAsync [44]',
        'getWrittenPromptReturnRes',
        {
          ...JSON.parse(getWriteFileRes),
          dateTime,
        }
      )
    }
  } catch (error) {
    consolerError('getWrittenPromptReturnAsync', error)
    return
  }
}
