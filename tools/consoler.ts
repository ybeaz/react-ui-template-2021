import chalk from 'chalk'
import util from 'util'

interface ConsolerType {
  (
    comment: string,
    entityName: string,
    entity: any,
    options?: { headerColor: string; logColor: string; endLog: string }
  ): void
}

const optionsDefault = { headerColor: 'cyan', logColor: 'gray', endLog: '\n' }

/**
 * @description Function to
 * @import import { consoler } from './consoler'
 */

export const consoler: ConsolerType = (
  comment,
  entityName,
  entity,
  options = optionsDefault
) => {
  const { headerColor, logColor, endLog } = options

  const inspectedObject = util.inspect(entity, { depth: null })

  console.log(chalk.bold[headerColor](comment, entityName))

  console.log(chalk[logColor](inspectedObject))
  if (endLog) console.log(endLog)
}
