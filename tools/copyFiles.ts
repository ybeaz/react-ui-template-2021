import ncp from 'ncp'

import { copyArr } from './config'

const copyFileDir = (src: string, dest: string) => {
  ncp(src, dest, function (err) {
    if (err) {
      return console.error(`[error with coping ${src}]`, err)
    }
    console.info(`copied ${src} ...`)
  })
}

copyArr.length &&
  copyArr.forEach(item => {
    if ('src' in item && 'dest' in item) copyFileDir(item['src'], item['dest'])
  })
