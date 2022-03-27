import { execSync } from 'child_process'

export const getExtractedGitParam = (gitCommand: string): string => {
  let outcome = execSync(gitCommand, {
    encoding: 'utf8',
    timeout: 100,
  })
  const outcomeArr = JSON.stringify(outcome).replace(/"/g, '').split('\\n')
  return `"${outcomeArr[0]}"`
}
