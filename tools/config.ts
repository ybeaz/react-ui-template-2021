export const dir = './build'

export const deleteArr = ['./build']

export const copyArr = [
  { src: `public/index.html`, dest: 'build/index.html' },
  { src: `public/manifest.json`, dest: 'build/manifest.json' },
  { src: `public/favicon.ico`, dest: 'build/favicon.ico' },
  { src: `public/logo192.png`, dest: 'build/logo192.png' },
  { src: `public/robots.txt`, dest: 'build/robots.txt' },
]

export const permissionArr = ['.build/robots.txt']

export const pathToZipFiles = './src/lambda'
