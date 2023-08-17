import { getReadFileToString } from '../tools/getReadFileToString'
import { join } from 'path'
import { consoler } from '../tools/consoler'
import { getWriteFile } from '../tools/getWriteFile'
import { getReplacedSpacesInString } from '../tools/getReplacedSpacesInString'
import { getPromptExample } from '../tools/getPromptExample'
import { getBotReactFcUnitTestModel } from './models/getBotReactFcUnitTestModel'

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
  ToDoListReactV0301Test:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ToDoListReactV0301.test.tsx',
}

/**
 * @description Function to getBotReactFcData
 * @run ts-node botBuilding/getBotReactFcUnitTestScenario.ts
 */

const folderNameOut = 'output/'
const fileNameOut = 'botReactFcUnitTestData.json'

const scenarioTree: Record<string, Record<string, any>> = {
  botReactFCUnitTestFull: {
    pathes: {
      component01:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ButtonReactV0101.tsx',
      unitTest01:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ButtonReactV0101.test.tsx',
      component02:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/CounterReactV0101.tsx',
      unitTest02:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/CounterReactV0101.test.tsx',
      component03:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ToDoListReactV0301.tsx',
      unitTest03:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ToDoListReactV0301.test.tsx',
    },
  },
}

Object.keys(scenarioTree).forEach(async (botKey: string) => {
  const bot = scenarioTree[botKey]

  const componentStr01 = await getReadFileToString(bot.pathes.component01)
  const component01 = await getReplacedSpacesInString(componentStr01)

  const unitTestStr01 = await getReadFileToString(bot.pathes.unitTest01)
  const unitTest01 = await getPromptExample(unitTestStr01)
  const assist01 = await getReplacedSpacesInString(unitTestStr01)

  const componentStr02 = await getReadFileToString(bot.pathes.component02)
  const component02 = await getReplacedSpacesInString(componentStr02)

  const unitTestStr02 = await getReadFileToString(bot.pathes.unitTest02)
  const unitTest02 = await getPromptExample(unitTestStr02)
  const assist02 = await getReplacedSpacesInString(unitTestStr02)

  const componentStr03 = await getReadFileToString(bot.pathes.component03)
  const component03 = await getReplacedSpacesInString(componentStr03)

  const unitTestStr03 = await getReadFileToString(bot.pathes.unitTest03)
  const unitTest03 = await getPromptExample(unitTestStr03)
  const assist03 = await getReplacedSpacesInString(unitTestStr03)

  const promptReturn =
    (await getBotReactFcUnitTestModel({
      component01,
      unitTest01,
      assist01,
      component02,
      unitTest02,
      assist02,
      component03,
      unitTest03,
      assist03,
    })) || ''

  const fileNameOut = `${botKey}-${
    JSON.parse(promptReturn).requestBodyLen
  }.json`
  let pathFull = join(__dirname, folderNameOut, fileNameOut)
  let getWriteFileRes =
    promptReturn &&
    (await getWriteFile(pathFull, promptReturn, {
      printRes: false,
    }))

  consoler(
    'getBotReactFcData [124]',
    'getWriteFileRes',
    JSON.parse(getWriteFileRes)
  )
})
