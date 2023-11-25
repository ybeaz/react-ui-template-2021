import { getReadFileToString } from '../../tools/getReadFileToString'
import { consoler } from '../../tools/consoler'
import {
  botFamilyConfig,
  BotFamilyConfigType,
  BotConfigType,
  PatternSrcType,
  ContentSrcType,
} from './botFamilyConfig'
import { getBotModel } from './getBotModel'
import { getWrittenPromptReturnAsync } from '../shared/getWrittenPromptReturnAsync'

/**
 * @description Function to runbotFamily@triz
 * @run ts-node botBuilding/2023-08-23-botFamily@trizV2/runBotFamilyScenario.ts
 */

Object.keys(botFamilyConfig).forEach(async (botKey: string) => {
  const { isActive, arrFilt, model, temperature, patternsSrcs } =
    botFamilyConfig[botKey] as BotConfigType

  const fileOutputBaseName = botKey

  if (isActive) {
    const patternsSrcsActive: PatternSrcType[] = patternsSrcs
      .filter((patternSrc: PatternSrcType) => patternSrc.isActive)
      .sort()

    const patternsSrcsActiveMapped = await Promise.all(
      patternsSrcsActive.map(async (patternSrc: PatternSrcType) => {
        try {
          const { contentSrc, contentSrcType, contentResFunc } = patternSrc

          let contentSrcNext = contentSrc
          if (contentSrcType === ContentSrcType['path']) {
            contentSrcNext = await getReadFileToString(contentSrc)
          }

          const output = { ...patternSrc, contentSrc: contentSrcNext }

          return output
        } catch (error) {
          return patternSrc
        }
      })
    )

    const promptReturn =
      (await getBotModel({
        arrFilt: [],
        model,
        temperature,
        patternsSrcs: patternsSrcsActiveMapped,
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
