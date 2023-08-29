import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import sarcasmDataInit from './dataStore/sarcasm_data_init.json'
import dataset_2023_08_27 from './dataStore/dataset_2023-08-27.json'
import { getWritrenFileAsync } from '../../tools/getWritrenFileAsync'

interface getPreparedDatasetType {
  (sarcasmData: any, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getPreparedDataset
 * @run ts-node botBuilding/2023-08-25-botFamily@sarcastic_marv/getPreparedDataset.ts
 * @import import { getPreparedDataset } from './getPreparedDataset'
 */

export const getPreparedDataset: getPreparedDatasetType = async (
  sarcasmDataIn,
  options
) => {
  try {
    const sarcasmDataInLen = Object.keys(sarcasmDataIn).length
    let sarcasmData = Object.keys(sarcasmDataIn).reduce(
      (accum: any[], dialogKey: string) => {
        const { context, utterance: answer } = sarcasmDataIn[dialogKey]

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
                  'You are a sarcastic assistant that answers questions while adding entertaining sarcastic comments.',
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
      },
      []
    )

    sarcasmData = [...dataset_2023_08_27, ...sarcasmData]
    const sarcasmDataStr = JSON.stringify(sarcasmData)
    const sarcasmDataLen = sarcasmData.length

    const pathFull = __dirname + '/dataStore/dataset.json'
    await getWritrenFileAsync(pathFull, sarcasmDataStr, {
      printRes: false,
    })

    consoler('getPreparedDataset [22]', 'sarcasmData', {
      sarcasmData,
      sarcasmDataInLen,
      sarcasmDataLen,
    })

    // const getPreparedDatasetRes = await ''
    // const pathIn = __dirname + '/dataStore/sarcasmData2.json'
    // const pathOut = __dirname + '/dataStore/dataset2.jsonl'
    // const getJsonToJsonLAsyncParams = { pathIn, pathOut }
    // const getPreparedDatasetRes = await getJsonToJsonLAsync(
    //   getJsonToJsonLAsyncParams
    // )

    if (options?.printRes) {
      consoler('getPreparedDataset', 'getPreparedDatasetRes', sarcasmData)
    }

    return sarcasmData
  } catch (error) {
    consolerError('getPreparedDataset', error)
    return
  }
}
;(async () => {
  await getPreparedDataset(sarcasmDataInit)
})()
