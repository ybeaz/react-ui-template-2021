import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { getWrittenPromptReturnAsync } from './getWrittenPromptReturnAsync'
import { getBotModel } from './getBotModel'
import { getReadFileToString } from '../../tools/getReadFileToString'
import { BotConfigType, BotFamilyConfigType } from '../@types/BotConfigType'
import { PatternSrcType } from '../@types/PatternSrcType'
import { ContentSrcType } from '../@types/ContentSrcType'
import { getWritrenFilePathAsync } from '../../tools/getWritrenFileAsync'

type getRunBotFamilyScenarioAsyncParams = {
  botFamilyConfig: BotFamilyConfigType
  dirname: string
}

type getRunBotFamilyScenarioAsyncResType = any

interface getRunBotFamilyScenarioAsyncType {
  (
    getRunBotFamilyScenarioAsyncParams: getRunBotFamilyScenarioAsyncParams,
    options?: { printRes: boolean }
  ): getRunBotFamilyScenarioAsyncResType
}

/**
 * @description Function to getRunBotFamilyScenarioAsync
 * @import import { getRunBotFamilyScenarioAsync } from '../shared/getRunBotFamilyScenarioAsync'
 */
export const getRunBotFamilyScenarioAsync: getRunBotFamilyScenarioAsyncType =
  async (getRunBotFamilyScenarioAsyncParams, options) => {
    const { botFamilyConfig, dirname } = getRunBotFamilyScenarioAsyncParams

    let getRunBotFamilyScenarioAsyncRes: getRunBotFamilyScenarioAsyncResType =
      {}

    try {
      await Promise.all(
        Object.keys(botFamilyConfig)
          .filter((botKey: string) => botFamilyConfig[botKey].isActive)
          .map(async (botKey: string) => {
            try {
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
                      const { contentSrc, contentSrcType, contentResFunc } =
                        patternSrc

                      let contentSrcNext = contentSrc
                      if (contentSrcType === ContentSrcType['path']) {
                        contentSrcNext = await getReadFileToString(contentSrc)
                      }

                      const output = {
                        ...patternSrc,
                        contentSrc: contentSrcNext,
                      }

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

                getRunBotFamilyScenarioAsyncRes[fileOutputBaseName] =
                  await getWrittenPromptReturnAsync(
                    {
                      promptReturn,
                      dirname,
                      fileBaseName: fileOutputBaseName,
                      folderNameOut: 'output/',
                    },
                    { printRes: false }
                  )
              }
            } catch (error) {}
          })
      )

      if (options?.printRes) {
        consoler(
          'getRunBotFamilyScenarioAsync',
          'getRunBotFamilyScenarioAsyncRes',
          getRunBotFamilyScenarioAsyncRes
        )
      }

      return getRunBotFamilyScenarioAsyncRes
    } catch (error) {
      consolerError('getRunBotFamilyScenarioAsync', error)
      return
    }
  }
