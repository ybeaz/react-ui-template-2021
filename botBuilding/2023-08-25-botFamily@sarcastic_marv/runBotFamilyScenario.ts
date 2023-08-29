import 'dotenv/config'
import OpenAI from 'openai'

import fs, { promises } from 'fs'
// import { FileContent, FileDeleted, FileObject, FileCreateParams, FileObjectsPage, Files } from 'openai'
import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { getJsonToJsonLAsync } from '../../tools/getJsonToJsonLAsync'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

/**
 * @description Scenario to teach a ChatGPT submodel
 * @run ts-node botBuilding/2023-08-25-botFamily@sarcastic_marv/runBotFamilyScenario.ts
 */

const openai = new OpenAI({ apiKey: OPENAI_API_KEY })

/* As a Hello Worls test */
// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   })

//   consoler('test [6]', 'completion', completion)
// }

// main()

;(async () => {
  try {
    /* Create a dataset.jsonl file */
    // const pathIn = __dirname + '/dataStore/dataset.json'
    // const pathOut = __dirname + '/dataStore/dataset.jsonl'
    // const getJsonToJsonLAsyncParams = { pathIn, pathOut }
    // await getJsonToJsonLAsync(getJsonToJsonLAsyncParams)
    // const file = fs.createReadStream(pathOut)

    /* Upload dataset file */
    // const fileCreateRes = await openai.files.create({
    //   file,
    //   purpose: 'fine-tune',
    // })
    // consoler('test [44]', 'fileCreateRes', fileCreateRes)

    /* Upload list uploaded files */
    const { object: filesObject, data: filesList } = await openai.files.list()
    consoler('test [48]', 'fileListRes', { filesObject, filesList })

    /* Returns the contents of the specified file */
    // const training_file = 'file-avD6LoUD7m2jXscDKemRufMr' // fileCreateRes.id
    // const filesContentRes = await openai.files.retrieveContent(training_file)
    // consoler('test [53]', 'filesContentRes', filesContentRes)

    /* Delete uploaded files, if we don't need them anymore */
    const filesListToDel: Record<string, any>[] = [] // filesList
    if (filesListToDel.length) {
      filesListToDel.forEach(async (fileObj: Record<string, any>) => {
        try {
          await openai.files.del(fileObj.id)
        } catch (error) {}
      })
    }

    /* DEPRECIATED. Create a model learning job */
    // const ftCreateBody = { training_file, model: 'gpt-3.5-turbo' }
    // consoler('test [63]', 'ftCreateBody', ftCreateBody)
    // const ftCreateRes = await openai.fineTunes.create(ftCreateBody, {})
    // consoler('test [65]', 'ftCreateRes', ftCreateRes)

    /* Retrieve information about trained models */
    // const fineTuneJobId = 'ftjob-maYrO1xS25fcuBeLh2UtMgGS'
    // const ftRetrieveRes = await openai.fineTunes.retrieve(fineTuneJobId, {})
    // consoler('test [70]', 'ftRetrieveRes', ftRetrieveRes)

    /* Get a list of jobs */
    const { object: ftObject, data: ftList } = await openai.fineTunes.list() // FineTuningJob.list(limit=10)
    consoler('test [74]', 'listRest', { ftObject, ftList })
  } catch (error) {
    consolerError('test [76]', error)
  }
})()
