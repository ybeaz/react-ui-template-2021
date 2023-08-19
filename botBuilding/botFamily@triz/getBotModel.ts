import { consoler } from '../../tools/consoler'
import { consolerError } from '../../tools/consolerError'
import { getFilteredArrByIndexs } from '../../src/Shared/getFilteredArrByIndexs'

interface GetBotModelType {
  (
    getBotModelParams: {
      arrFilt: number[]
      model: string
      temperature: number
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
  {
    arrFilt,
    model,
    temperature,
    user01,
    assist01,
    user02,
    assist02,
    user03,
    assist03,
  },
  options
) => {
  try {
    const propmtReturnObject = {
      model,
      messages: getFilteredArrByIndexs(
        [
          {
            role: 'system',
            content:
              'Context: "TRIZ, Theory of Inventive Problem Solving, Ideal final result (IFR), Inventive principles, the matrix of contradictions, Evolution Patterns of technical systems, Laws of technical systems evolution, triz stages of evolution, data intepretation, inventing new solutions" Language: "Use language based on the User question language"',
          },
          {
            role: 'user',
            content: `${user01}`,
          },
          {
            role: 'assistant',
            content: assist01,
          },
          {
            role: 'user',
            content: `Отличный результат. ${user02}`,
          },
          {
            role: 'assistant',
            content: assist02,
          },
          {
            role: 'user',
            content: `Отличный результат. ${user03}`,
          },
          {
            role: 'assistant',
            content: assist03,
          },
          {
            role: 'user',
            content: `Отличный результат. \${userText}`,
          },
          {
            role: 'system',
            content:
              'System_message: Generate a response in the markdown format if applicable',
          },
        ],
        arrFilt
      ),
      temperature,
    }

    const getBotModelRes = await JSON.stringify({
      requestBody: propmtReturnObject,
      requestBodyLen: JSON.stringify(propmtReturnObject).length,
      promptExamples: [
        `Example 1.\n${user01}`,
        `Example 2.\n${user02}`,
        `Example 3.\n${user03}`,
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
