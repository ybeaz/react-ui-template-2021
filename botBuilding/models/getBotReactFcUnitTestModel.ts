import chalk from 'chalk'
import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'

interface GetBotReactFcUnitTestModelType {
  (
    getBotReactFcUnitTestModelParams: {
      model: string
      temperature: number
      component01: string
      unitTest01: string
      assist01: string
      component02: string
      unitTest02: string
      assist02: string
      component03: string
      unitTest03: string
      assist03: string
    },
    options?: { printRes: boolean }
  ): Promise<string | undefined>
}

/**
 * @description Function to getBotReactFcUnitTestModel
 * @import import { getBotReactFcUnitTestModel } from './models/getBotReactFcUnitTestModel'
 */

export const getBotReactFcUnitTestModel: GetBotReactFcUnitTestModelType =
  async (
    {
      model,
      temperature,
      component01,
      unitTest01,
      assist01,
      component02,
      unitTest02,
      assist02,
      component03,
      unitTest03,
      assist03,
    },
    options
  ) => {
    try {
      const propmtReturnObject = {
        model,
        messages: [
          {
            role: 'system',
            content:
              'Context: "NPM Jest unit tests for ReactJS, Typescript, programming" Language: "Use language based on the User question language"',
          },
          {
            role: 'user',
            content: `I have the following component: ${component01}, The task is to Create TypeDoc and unit tests for my ReactJS component. Instructions: ${unitTest01},Response format: plain text`,
          },
          {
            role: 'assistant',
            content: assist01,
          },
          {
            role: 'user',
            content: `Great, nice. This time I have the another component: ${component02}, The task is to Create TypeDoc and unit tests for my ReactJS component. Instructions: ${unitTest02}, Response format: plain text`,
          },
          {
            role: 'assistant',
            content: assist02,
          },
          {
            role: 'user',
            content: `Great, nice. This time I have the another component: ${component03}, The task is to Create TypeDoc and unit tests for my ReactJS component. Instructions: ${unitTest03}, Response format: plain text`,
          },
          {
            role: 'assistant',
            content: assist03,
          },
          {
            role: 'user',
            content: `Good, nice. This time I have the another component and instructions: \${userText}, The task is to Create TypeDoc and unit tests for my ReactJS component. Instructions: Response format: markdown format with typescript code snippet`,
          },
          {
            role: 'system',
            content:
              'System_message: Generate a response in the markdown format with typescript code snippet',
          },
        ],
        temperature,
      }

      const getBotReactFcUnitTestModelRes = await JSON.stringify({
        requestBody: propmtReturnObject,
        requestBodyLen: JSON.stringify(propmtReturnObject).length,
        promptExamples: [
          `Example 1.\\nComponent: ... \\nCreate unit tests for my ReactJS component. Instructions: ${unitTest01}.`,
          `Example 2.\\nComponent: ... \\nCreate unit tests for my ReactJS component. Instructions: ${unitTest02}`,
          `Example 3.\\nComponent: ... \\nCreate unit tests for my ReactJS component. Instructions: ${unitTest03}`,
        ],
      })

      if (options?.printRes) {
        consoler(
          'getBotReactFcUnitTestModel',
          'getBotReactFcUnitTestModelRes',
          getBotReactFcUnitTestModelRes
        )
      }

      return getBotReactFcUnitTestModelRes
    } catch (error) {
      consolerError('getBotReactFcUnitTestModel', error)
      return
    }
  }
