import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import datasetSarcasm from './dataStore/dataset_sarcasm.json'
import datasetInit from './dataStore/dataset_init.json'
import { getWritrenFileAsync } from '../../tools/getWritrenFileAsync'
import { getPreparedDatasetSarcasticSync } from './getPreparedDatasetSarcasticSync'
import { ChatMessagesType } from '../@types/ChatMessagesType'
import { getJsonToJsonLAsync } from '../../tools/getJsonToJsonLAsync'
import { getJsonToJsonL2Async } from '../../tools/getJsonToJsonL2Async'
import { getReadFileCsvAsync } from '../../tools/getReadFileCsvAsync'
import {
  getPreparedDatasetJokesSync,
  JokeObjectType,
} from './getPreparedDatasetJokesSync'

type GetPreparedDatasetParamsType = {
  datasetInit: ChatMessagesType[]
  datasetSarcasm: any
  datasetCsvPath: JokeObjectType[]
  mode: string
}

interface getPreparedDatasetType {
  (params: any, options?: { printRes: boolean }): Promise<void>
}

/**
 * @description Function to getPreparedDataset
 * @run ts-node botBuilding/2023-08-25-botFamily@sarcastic_marv/getPreparedDataset.ts
 * @import import { getPreparedDataset } from './getPreparedDataset'
 */

export const getPreparedDataset: getPreparedDatasetType = async (
  params,
  options
) => {
  const { datasetInit, datasetSarcasm, datasetCsvPath, mode } = params

  try {
    if (mode === 'json') {
      // const datasetCsvInit = await getReadFileCsvAsync(
      //   { path: datasetCsvPath },
      //   { printRes: true }
      // )

      // const datasetCsv = getPreparedDatasetJokesSync({
      //   dataset: datasetCsvInit,
      // })

      // const datasetCsvInitLen = datasetCsvInit.length

      const sarcasmData: ChatMessagesType[] =
        getPreparedDatasetSarcasticSync(datasetSarcasm)

      const datasetData = [...datasetInit, ...sarcasmData]
      const datasetDataStr = JSON.stringify(datasetData)

      const datasetInitLen = datasetInit.length
      const sarcasmDataLen = sarcasmData.length
      const datasetDataLen = datasetData.length

      const pathFull = __dirname + '/dataStore/dataset.json'
      await getWritrenFileAsync(pathFull, datasetDataStr, {
        printRes: false,
      })

      consoler('getPreparedDataset [22]', 'sarcasmData', {
        datasetInitLen,
        sarcasmDataLen,
        totalLen: datasetInitLen + sarcasmDataLen,
        datasetDataLen,
        datasetCsvPath,
      })

      if (options?.printRes) {
        consoler('getPreparedDataset', 'getPreparedDatasetRes', datasetData)
      }
    } else if (mode === 'jsonl') {
      const pathIn = __dirname + '/dataStore/dataset.json'
      const pathOut = __dirname + '/dataStore/dataset.jsonl'
      const getJsonToJsonLAsyncParams = { pathIn, pathOut }
      await getJsonToJsonL2Async(getJsonToJsonLAsyncParams, { printRes: false })
    }
  } catch (error) {
    consolerError('getPreparedDataset', error)
  }
}

/* Run script to prepare both files */
;(async () => {
  const datasetCsvPath = __dirname + '/dataStore/dataset_shortjokes.csv'

  let mode: string = 'json'
  await getPreparedDataset({
    datasetInit,
    datasetSarcasm,
    datasetCsvPath,
    mode,
  })

  mode = 'jsonl'
  await getPreparedDataset({
    datasetInit,
    datasetSarcasm,
    datasetCsvPath,
    mode,
  })
})()
