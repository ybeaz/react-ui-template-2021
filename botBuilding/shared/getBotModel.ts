import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { getFilteredArrByIndexs } from '../../src/Shared/getFilteredArrByIndexs'
import { getReplacedSpacesInString } from '../../tools/getReplacedSpacesInString'
import { PatternSrcType } from '../@types/PatternSrcType'
import { RoleType } from '../@types/RoleType'
import { BotConfigType } from '../@types/BotConfigType'

interface GetBotModelType {
  (getBotModelParams: BotConfigType, options?: { printRes: boolean }): Promise<
    string | undefined
  >
}

/**
 * @description Function to getBotModel
 * @import import { getBotModel } from './models/getBotModel'
 */

export const getBotModel: GetBotModelType = async (
  { arrFilt, model, temperature, patternsSrcs, promptExamples },
  options
) => {
  try {
    const messages = await Promise.all(
      patternsSrcs.map(async (patternSrc: PatternSrcType) => {
        const { roleType, contentSrc, contentResFunc } = patternSrc

        const content = await getReplacedSpacesInString(
          contentResFunc(contentSrc)
        )

        return {
          role: roleType,
          content,
        }
      })
    )

    const messagesFiltered = getFilteredArrByIndexs(messages, arrFilt)

    const propmtReturnObject = {
      model,
      messages: messagesFiltered,
      temperature,
    }

    const promptExamplesFromPatterns = patternsSrcs
      .filter((patternSrc: PatternSrcType) => {
        const { roleType, contentSrc } = patternSrc
        return (
          roleType === RoleType['user'] &&
          contentSrc !== 'PROGNOSIS/ FORECAST STEP'
        )
      })
      .map((patternSrc: PatternSrcType, index: number) => {
        const { contentSrc } = patternSrc
        return contentSrc
      })
      .filter((promptExample: string) => promptExample !== '')

    const getBotModelRes = JSON.stringify({
      requestBody: propmtReturnObject,
      requestBodyLen: JSON.stringify(propmtReturnObject).length,
      promptExamples: promptExamplesFromPatterns.length
        ? promptExamplesFromPatterns
        : promptExamples,
    })
      .split('\\\\n')
      .join('\\n')

    if (options?.printRes) {
      consoler('getBotModel', 'getBotModelRes', getBotModelRes)
    }

    return getBotModelRes
  } catch (error) {
    consolerError('getBotModel', error)
    return
  }
}
