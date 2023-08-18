import { promises as fs } from 'fs'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface IsDirectoryType {
  (path: string, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to isDirectory
 * @import import { isDirectory } from './isDirectory'
 */
export const isDirectory: IsDirectoryType = async (path, options) => {
  try {
    const isDirectoryRes = await fs.stat(path)
    if (options?.printRes) {
      consoler('isDirectory', 'isDirectoryRes', isDirectoryRes)
    }
    return isDirectoryRes.isDirectory()
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      return false // Path does not exist
    } else {
      consolerError('isDirectory', error) // Other error (e.g., permission issues)
    }
  }
}
