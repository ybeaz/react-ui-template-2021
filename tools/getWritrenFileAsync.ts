import { promises as fs } from 'fs'
import chalk from 'chalk'
import { consoler } from './consoler'
import { consolerError } from './consolerError'

interface getWriteFileType {
  (pathFull: string, str: string, options?: { printRes: boolean }): Promise<any>
}

/**
 * @description Function to getWritrenFileAsync
 * @run ts-node tools/getWritrenFileAsync.ts
 * @import import { getWritrenFileAsync } from './getWritrenFileAsync'
 */

export const getWritrenFileAsync: getWriteFileType = async (
  pathFull,
  str,
  options
) => {
  try {
    // consoler('getWritrenFileAsync [30]', 'path', {
    //   pathFull,
    //   str,
    // })

    await fs.writeFile(pathFull, str, 'utf-8')

    // consoler('getWritrenFileAsync [46]', 'path', { pathFull, str })

    if (options?.printRes) {
      consoler('getWritrenFileAsync', 'getWriteFileRes', str)
    }

    return str
  } catch (error) {
    consolerError('getWritrenFileAsync', error)
    return
  }
}

/*
;(async () => {
  const pathFull =
    '/Users/admin/Dev/react-ui-template-2021/botBuilding/2023-08-27-botFamily@contextual/output/openai_api-2023-08-27-14-16.json'
  const str =
    '{"requestBody":{"model":"gpt-4","messages":[{"role":"system","content":"System_message: You are an assistant designed to help users answer their questions related to the #TOPIC: OpenAI (openai.com), ChatGPT, OpenAI Documentation, OpenAI API reference, OpenAI Examples, OpenAI API troubleshooting, OpenAI API debugging. Language: \\"Use language based on the User question language\\"."},{"role":"user","content":"--- INSTRUCTIONS: cite sources and give reasoning before sharing the final answer in the following format: REFERENCES: ...\\\\n REASONING: ...\\\\n ANSWER: ...\\\\n --- ## GIVE FACTUAL DATA ABOUT ${userText}:"},{"role":"system","content":"INSTRUCTIONS: - Only answer questions related to the #TOPIC. - If you\'re unsure of an answer, you say \\"I don\'t know\\" or \\"I\'m not sure\\" - Generate a response in the markdown markup language where possible. - Search for information in descending priorities in OpenAI platform content (platform.openai.com), OpenAI forum (community.openai.com), Stackoverflow site (stackoverflow.com), other question-answering and forum sites, articles and blogs about OpenAI - Use the structure for your response suggested by the user - Take a step-by-step approach in your response. Language: \\"Use language based on the User question language\\"."}],"temperature":0.1},"requestBodyLen":1283,"promptExamples":[""]}'

  getWritrenFileAsync(pathFull, str)
})()
*/
