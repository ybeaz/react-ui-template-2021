import { promises as fs } from 'fs'
import { getReadFileToString } from '../tools/getReadFileToString'
import { join } from 'path'
import { consoler } from '../tools/consoler'
import { getWriteFile } from '../tools/getWriteFile'
import { getReplacedSpacesInString } from '../tools/getReplacedSpacesInString'
import { getPromptExample } from '../tools/getPromptExample'

const SOURCES_DICTIONARY: Record<string, string> = {
  ButtonReactV0101:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ButtonReactV0101.tsx',
  ButtonReactV0101Test:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ButtonReactV0101.test.tsx',
  CounterReactV0101:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/CounterReactV0101.tsx',
  CounterReactV0101Test:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/CounterReactV0101.test.tsx',
  ToDoListReactV0301:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ToDoListReactV0301.tsx',
  ToDoListReactV0301test:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ToDoListReactV0301.tsx',
}

/**
 * @description Function to getBotReactFcData
 * @run ts-node botBuilding/getBotReactFcScenario.ts
 */

const folderNameOut = 'output/'
const fileNameOut = 'botReactFcData.json'
const path01 = SOURCES_DICTIONARY.ButtonReactV0101
const path02 = SOURCES_DICTIONARY.CounterReactV0101
const path03 = SOURCES_DICTIONARY.ToDoListReactV0301

// const path = SOURCES_DICTIONARY.ButtonReactV0101Test
// const path = SOURCES_DICTIONARY.CounterReactV0101Test
// const path = SOURCES_DICTIONARY.ToDoListReactV0301test

;(async () => {
  type GetBotReactFcDataPropsType = {
    user01: string
    assist01: string
    user02: string
    assist02: string
    user03: string
    assist03: string
  }

  const getBotReactFcData = ({
    user01,
    assist01,
    user02,
    assist02,
    user03,
    assist03,
  }: GetBotReactFcDataPropsType): string => {
    const propmtReturnObject = {
      model: 'gpt-3.5-turbo',
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

    return JSON.stringify({
      requestBody: propmtReturnObject,
      promptExamples: [
        `Example 1.\\nCreate TypeDoc and a Functional component in ReactJS. Instructions: ${user01}`,
        `Example 2.\\nCreate TypeDoc and a Functional component in ReactJS. Instructions: ${user02}`,
        `Example 3.\\nCreate TypeDoc and a Functional component in ReactJS. Instructions: ${user03}`,
      ],
    })
  }

  const str01 = await getReadFileToString(path01)
  const user01 = await getPromptExample(str01)
  const assist01 = await getReplacedSpacesInString(str01)

  const str02 = await getReadFileToString(path02)
  const user02 = await getPromptExample(str02)
  const assist02 = await getReplacedSpacesInString(str02)

  const str03 = await getReadFileToString(path03)
  const user03 = await getPromptExample(str03)
  const assist03 = await getReplacedSpacesInString(str03)

  const promptReturn = getBotReactFcData({
    user01,
    assist01,
    user02,
    assist02,
    user03,
    assist03,
  })

  let pathFull = join(__dirname, folderNameOut, fileNameOut)
  let getWriteFileRes = await getWriteFile(pathFull, promptReturn, {
    printRes: false,
  })
  consoler(
    'getBotReactFcData [124]',
    'getWriteFileRes',
    JSON.parse(getWriteFileRes)
  )
})()
