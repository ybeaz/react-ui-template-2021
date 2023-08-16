import chalk from 'chalk'
import util from 'util'

type ConsolerOptionsType = {
  headerColor: string
  logColor: string
  endLog: string
}

interface ConsolerType {
  (
    comment: string,
    entityName: string,
    entity: any,
    options?: ConsolerOptionsType
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
  const { headerColor, logColor, endLog } = options as ConsolerOptionsType

  const inspectedObject = util.inspect(entity, { depth: null })

  // @ts-ignore
  console.log(chalk.bold[headerColor](comment, entityName))
  // @ts-ignore
  console.log(chalk[logColor](inspectedObject))
  if (endLog) console.log(endLog)
}
