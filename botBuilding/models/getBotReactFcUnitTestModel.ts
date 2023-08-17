import chalk from 'chalk'
import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'

interface GetBotReactFcUnitTestModelType {
  (
    getBotReactFcUnitTestModelParams: {
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
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'Context: "NPM Jest unit tests for ReactJS, Typescript, programming" Language: "Use language based on the User question language" System_message: "Generate a response in the markdown format with typescript code snippet." ',
          },
          {
            role: 'user',
            content: `Task: Create TypeDoc and unit tests for the following ReactJS component. Instructions: ${unitTest01} Component: ${component01}`,
          },
          {
            role: 'assistant',
            content: assist01,
          },
          // {
          //   role: 'user',
          //   content: `Great, nice. This time the task is: Task: Create TypeDoc and unit tests for the following ReactJS component. Instructions: ${unitTest02} Component: ${component02}`,
          // },
          // {
          //   role: 'assistant',
          //   content: assist02,
          // },
          {
            role: 'user',
            content: `Great, nice. This time the task is: Create TypeDoc and unit tests for the following ReactJS component. Instructions: ${unitTest03} Component: ${component03}`,
          },
          {
            role: 'assistant',
            content: assist03,
          },
          {
            role: 'user',
            content: `Great, nice, I like it. This time the task is: Create TypeDoc and unit tests for the following ReactJS component. {userText}`,
          },
          {
            role: 'system',
            content:
              'System_message: Generate a response in the markdown format with typescript code snippet',
          },
        ],
        temperature: 0.1,
      }

      const getBotReactFcUnitTestModelRes = await JSON.stringify({
        requestBody: propmtReturnObject,
        requestBodyLen: JSON.stringify(propmtReturnObject).length,
        promptExamples: [
          `Example 1.\\nCreate TypeDoc and unit tests for the following ReactJS component. Instructions: ${unitTest01}\\nComponent: ...`,
          `Example 2.\\nCreate TypeDoc and unit tests for the following ReactJS component. Instructions: ${unitTest02}\\nComponent: ...`,
          `Example 3.\\nCreate TypeDoc and unit tests for the following ReactJS component. Instructions: ${unitTest03}\\nComponent: ...`,
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
