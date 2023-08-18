import chalk from 'chalk'
import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'

interface GetBotModelType {
  (
    getBotModelParams: {
      model: string
      user01: string
      assist01: string
      user02: string
      assist02: string
      user03: string
      assist03: string
    },
    options?: { printRes: boolean }
  ): Promise<string | undefined>
}

/**
 * @description Function to getBotModel
 * @import import { getBotModel } from './models/getBotModel'
 */

export const getBotModel: GetBotModelType = async (
  { model, user01, assist01, user02, assist02, user03, assist03 },
  options
) => {
  try {
    const propmtReturnObject = {
      model,
      messages: [
        {
          role: 'system',
          content:
            'Context: "NPM ReactJS, Typescript, programming" Language: "Use language based on the User question language" System_message: "Generate a response in the markdown format with typescript code snippet." ',
        },
        {
          role: 'user',
          content: `Task: Create TypeDoc and a Functional component in ReactJS. Instructions: ${user01}`,
        },
        {
          role: 'assistant',
          content: assist01,
        },
        {
          role: 'user',
          content: `Great, nice. This time the task is: Create TypeDoc and a Functional component in ReactJS. Instructions: ${user02}`,
        },
        {
          role: 'assistant',
          content: assist02,
        },
        {
          role: 'user',
          content: `Great, nice. This time the task is: Create TypeDoc and a Functional component in ReactJS. Instructions: ${user03}`,
        },
        {
          role: 'assistant',
          content: assist03,
        },
        {
          role: 'user',
          content: `Great, nice, I like it. This time the task is: {userText}`,
        },
        {
          role: 'system',
          content:
            'System_message: Generate a response in the markdown format with typescript code snippet. Instruction: Replace [@name] with the actual Functional Component name',
        },
      ],
      temperature: 0.1,
    }

    const getBotModelRes = await JSON.stringify({
      requestBody: propmtReturnObject,
      requestBodyLen: JSON.stringify(propmtReturnObject).length,
      promptExamples: [
        `Example 1.\\nCreate TypeDoc and a Functional component in ReactJS. Instructions: ${user01}`,
        `Example 2.\\nCreate TypeDoc and a Functional component in ReactJS. Instructions: ${user02}`,
        `Example 3.\\nCreate TypeDoc and a Functional component in ReactJS. Instructions: ${user03}`,
      ],
    })

    if (options?.printRes) {
      consoler('getBotModel', 'getBotModelRes', getBotModelRes)
    }

    return getBotModelRes
  } catch (error) {
    consolerError('getBotModel', error)
    return
  }
}
