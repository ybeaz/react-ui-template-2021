import { getListFilesDir } from './getListFilesDir'
import { getZippedFile } from './getZippedFile'
import { pathToZipFiles } from './config'

const getZippedFiles = async (
  srcPathNames: string = pathToZipFiles
): Promise<void> => {
  const files = await getListFilesDir(srcPathNames)

  const filesJs = files.filter((file) => {
    let output = false
    const fileArr = file.split('.')
    const ext = [...fileArr].pop()

    if (ext === 'js' && fileArr.length === 2) output = true

    return output
  })

  filesJs.forEach((file, index) => {
    getZippedFile(srcPathNames, file)
    console.info(index, 'getZippedFile', file)
  })
}

getZippedFiles()
