import { promises as fs } from 'fs'

import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import datasetSarcasm from './dataStore/dataset_sarcasm.json'
import datasetInit from './dataStore/dataset_init.json'
import { getWritrenFileAsync } from '../../tools/getWritrenFileAsync'
import { getPreparedDatasetSarcasticSync } from './getPreparedDatasetSarcasticSync'
import { ChatMessagesType } from '../@types/ChatMessagesType'
import { getJsonToJsonLAsync } from '../../tools/getJsonToJsonLAsync'

interface getPreparedDatasetType {
  (sarcasmData: any, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getPreparedDataset
 * @run ts-node botBuilding/2023-08-25-botFamily@sarcastic_marv/getPreparedDataset.ts
 * @import import { getPreparedDataset } from './getPreparedDataset'
 */

export const getPreparedDataset: getPreparedDatasetType = async (
  datasets,
  options
) => {
  const { datasetInit, datasetSarcasm } = datasets

  try {
    const sarcasmDataInLen = Object.keys(datasetSarcasm).length
    let sarcasmData: ChatMessagesType[] =
      getPreparedDatasetSarcasticSync(datasetSarcasm)

    sarcasmData = [...datasetInit, ...sarcasmData]
    const sarcasmDataStr = JSON.stringify(sarcasmData)
    const sarcasmDataLen = sarcasmData.length

    // const pathFull = __dirname + '/dataStore/dataset.json'
    // await getWritrenFileAsync(pathFull, sarcasmDataStr, {
    //   printRes: false,
    // })

    consoler('getPreparedDataset [22]', 'sarcasmData', {
      sarcasmData,
      sarcasmDataInLen,
      sarcasmDataLen,
    })

    // const getPreparedDatasetRes = await ''
    const pathIn = __dirname + '/dataStore/dataset.json'
    const pathOut = __dirname + '/dataStore/dataset.jsonl'
    const getJsonToJsonLAsyncParams = { pathIn, pathOut }
    await getJsonToJsonLAsync(getJsonToJsonLAsyncParams)

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
  await getPreparedDataset({ datasetInit, datasetSarcasm })
})()
