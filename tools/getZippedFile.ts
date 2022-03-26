import * as fs from 'fs'
import archiver from 'archiver'
import * as zlib from 'zlib'
interface IGetZippedFile {
  (path: string, name: string): void
}

export const getZippedFile: IGetZippedFile = (path, name) => {
  const nameNoExt = name.split('.')[0]
  const pathJsFile = `${path}/${nameNoExt}.js`

  let data = fs.readFileSync(pathJsFile)
  data = zlib.gzipSync(data)
  fs.writeFileSync(`${pathJsFile}.zip`, data)
}

interface IGetZippedFile {
  (path: string, name: string): void
}

export const getArchivedFile: IGetZippedFile = (path, name) => {
  const nameNoExt = name.split('.')[0]
  const output = fs.createWriteStream(`${path}/${nameNoExt}.zip`)
  const archive = archiver('zip', {
    gzip: true,
    zlib: { level: 9 }, // Sets the compression level.
  })

  archive.on('error', function (err: any) {
    throw err
  })

  // pipe archive data to the output file
  archive.pipe(output)

  // append files
  archive.file(`${path}${name}`, { name })

  archive.finalize()
}
