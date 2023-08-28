import fs, { promises } from 'fs'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface isDirectorySyncType {
  (path: string, options?: { printRes: boolean }): boolean
}

/**
 * @description Function to isDirectorySync
 * @run ts-node tools/isDirectorySync.ts
 * @import import { isDirectorySync } from './isDirectorySync'
 */
export const isDirectorySync: isDirectorySyncType = (path, options) => {
  const stats = fs.statSync(path)
  const isDirectorySyncRes = stats.isDirectory()

  if (options?.printRes) {
    consoler('isDirectorySync', 'isDirectorySyncRes', isDirectorySyncRes)
  }
  return isDirectorySyncRes
}

/*
;(async () => {
  const path =
    '/Users/admin/Dev/react-ui-template-2021/botBuilding/2023-08-27-botFamily@contextual/output/'
  const isDirectorySyncRes = await isDirectorySync(path)
  consoler('isDirectorySync [31]', 'isDirectorySyncRes', isDirectorySyncRes)
})()
*/
