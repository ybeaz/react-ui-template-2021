import { promises as fs } from 'fs'

export const getListFilesDir = async (dir: string) => {
  return fs.readdir(dir)
}
