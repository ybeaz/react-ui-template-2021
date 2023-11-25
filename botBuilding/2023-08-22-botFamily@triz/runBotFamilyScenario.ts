import { getReadFileToString } from '../../tools/getReadFileToString'
import { getReplacedSpacesInString } from '../../tools/getReplacedSpacesInString'
import { getPromptExample } from '../../tools/getPromptExample'
import {
  botFamilyConfig,
  BotFamilyConfigType,
  BotConfigType,
  PatternSrcType,
} from './botFamilyConfig'
import { getBotModel } from './getBotModel'
import { getWrittenPromptReturnAsync } from '../shared/getWrittenPromptReturnAsync'

/**
 * @description Function to runbotFamily@triz
 * @run ts-node botBuilding/botFamily@triz/runBotFamilyScenario.ts
 */

Object.keys(botFamilyConfig).forEach(async (botKey: string) => {
  const { isActive, arrFilt, model, temperature, patternsSrcs } =
    botFamilyConfig[botKey] as BotConfigType

  const fileOutputBaseName = botKey

  if (isActive) {
    const patternArrayActive = await patternsSrcs
      .filter((patternSrc: PatternSrcType) => patternSrc.isActive)
      .sort()
      .map(async (patternSrc: PatternSrcType) => {
        const { userSrcType, userSrc, assistantSrcType, assistantSrc } =
          patternSrc

        let output: Pick<PatternSrcType, 'userSrc' | 'assistantSrc'> = {
          userSrc,
          assistantSrc,
        }

        if (userSrcType === 'path') {
          let userSrcNext = await getReadFileToString(userSrc)
          userSrcNext = await getReplacedSpacesInString(userSrcNext)
          output = { ...output, userSrc: userSrcNext }
        }

        if (assistantSrcType === 'path') {
          let assistantSrcNext = await getReadFileToString(assistantSrc)
          assistantSrcNext = await getReplacedSpacesInString(assistantSrcNext)
          output = { ...output, assistantSrc: assistantSrcNext }
        }

        return output
      })

    const promptReturn =
      (await getBotModel({
        arrFilt,
        model,
        temperature,
        user01: (await patternArrayActive[0]).userSrc,
        assist01: (await patternArrayActive[0]).assistantSrc,
        user02: (await patternArrayActive[1]).userSrc,
        assist02: (await patternArrayActive[1]).assistantSrc,
        user03: (await patternArrayActive[2]).userSrc,
        assist03: (await patternArrayActive[2]).assistantSrc,
      })) || ''

    getWrittenPromptReturnAsync(
      {
        promptReturn,
        dirname: __dirname,
        fileBaseName: fileOutputBaseName,
        folderNameOut: 'output/',
      },
      { printRes: true }
    )
  }
})
