import * as fs from 'fs'

import { getSplitedStrDirFile } from './getSplitedStrDirFile'
import { permissionArr } from './config'

const givePermission = (path: string) => {
  const { dir } = getSplitedStrDirFile(path)

  if (dir && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.chmodSync(path, 0o777)
}

permissionArr.forEach((item) => givePermission(item))
