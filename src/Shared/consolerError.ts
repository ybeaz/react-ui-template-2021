import chalk from 'chalk'
import { consoler } from './consoler'

interface ConsolerType {
  (fileName: string, error: any): void
}

/**
 * @description Function to
 * @import import { consolerError } from './shared/utils/consolerError'
 */

export const consolerError: ConsolerType = (fileName, error) => {
  console.log('\n')
  console.log(chalk.bold.red(`--- FAILURE ${fileName} ---`))
  console.log('\n')
  consoler(fileName, 'Error', error)
  console.log('\n')
}
