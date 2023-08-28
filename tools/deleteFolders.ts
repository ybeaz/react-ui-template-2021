import * as fs from 'fs'

import { deleteArr } from './config'

const deleteFolder = (path: string): void => {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectorySync()) {
    fs.readdirSync(path).forEach(function (file: any) {
      var curPath = path + '/' + file

      if (fs.lstatSync(curPath).isDirectorySync()) {
        // recurse
        deleteFolder(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })

    console.info(`deleted ${path} ...`)
    fs.rmdirSync(path)
  }
}

console.log('Cleaning working tree...')

deleteArr.forEach(item => deleteFolder(item))

console.log('Successfully cleaned working tree!')
