import childProcess from 'child_process'
import fs from 'fs'

function writeToEnv(key: string = '', value: string = '') {
  const empty = key === '' && value === ''

  if (empty) {
    fs.writeFile('.env.development', '', () => {})
  } else {
    fs.appendFile('.env.development', `${key}='${value.trim()}'\n`, err => {
      if (err) console.log(err)
    })
  }
}

// reset .env file
writeToEnv()

childProcess.exec('git rev-parse --abbrev-ref HEAD', (err, stdout) => {
  writeToEnv('REACT_APP_GIT_BRANCH', stdout)
})
childProcess.exec('git rev-parse --short HEAD', (err, stdout) => {
  writeToEnv('REACT_APP_GIT_SHA', stdout)
})

// trick typescript to think it's a module
// https://stackoverflow.com/a/56577324/9449426
export {}
