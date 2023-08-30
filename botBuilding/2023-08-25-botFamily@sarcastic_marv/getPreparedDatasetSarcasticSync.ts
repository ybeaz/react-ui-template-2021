import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { ChatMessagesType } from '../@types/ChatMessagesType'

interface getPreparedDatasetSarcasticSyncType {
  (datasetSarcasm: any, options?: { printRes: boolean }): ChatMessagesType[]
}

/**
 * @description Function to getPreparedDatasetSarcasticSync
 * @import import { getPreparedDatasetSarcasticSync } from './getPreparedDatasetSarcasticSync'
 */

export const getPreparedDatasetSarcasticSync: getPreparedDatasetSarcasticSyncType =
  (datasetSarcasm, options) => {
    const getPreparedDatasetSarcasticSyncRes = Object.keys(
      datasetSarcasm
    ).reduce((accum: any[], dialogKey: string) => {
      const { context, utterance: answer } = datasetSarcasm[dialogKey]

      const contextLen = context.length
      let question = context[contextLen - 1]
      if (contextLen > 1 && context[contextLen - 1] < 31)
        question = `${context[contextLen - 1]} ${context[contextLen - 2]}`

      let output = accum
      if (question.length > 31 && answer.length > 31) {
        const messages = {
          messages: [
            {
              role: 'system',
              content:
                'You are a sarcastic assistant that answers questions while adding entertaining sarcastic comments or a relevant joke.',
            },
            { role: 'user', content: question },
            {
              role: 'assistant',
              content: answer,
            },
          ],
        }

        output = [...accum, messages]
      }

      return output
    }, [])

    if (options?.printRes) {
      consoler(
        'getPreparedDatasetSarcasticSync',
        'getPreparedDatasetSarcasticSyncRes',
        getPreparedDatasetSarcasticSyncRes
      )
    }

    return getPreparedDatasetSarcasticSyncRes
  }
