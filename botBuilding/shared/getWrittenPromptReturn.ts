import { join } from 'path'
import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { isDirectory } from '../../tools/isDirectory'
import { getCreatedFolder } from '../../tools/getCreatedFolder'
import { getWriteFile } from '../../tools/getWriteFile'
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
 * @description Function to getWrittenPromptReturn
 * @import import { getWrittenPromptReturn } from '../shared/getWrittenPromptReturn'
 */

export const getWrittenPromptReturn: getWrittenPromptReturnType = async (
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
        (await getWriteFile(pathFull, promptReturn, {
          printRes: false,
        })) || {}
    }

    if (options?.printRes) {
      consoler('getWrittenPromptReturn [44]', 'getWrittenPromptReturnRes', {
        ...JSON.parse(getWriteFileRes),
        dateTime,
      })
    }
  } catch (error) {
    consolerError('getWrittenPromptReturn', error)
    return
  }
}
