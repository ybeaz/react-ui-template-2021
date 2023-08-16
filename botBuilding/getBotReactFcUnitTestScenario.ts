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
const componentPath01 = SOURCES_DICTIONARY.ButtonReactV0101
const unitTestPath01 = SOURCES_DICTIONARY.ButtonReactV0101Test
const componentPath02 = SOURCES_DICTIONARY.CounterReactV0101
const unitTestPath02 = SOURCES_DICTIONARY.CounterReactV0101Test
const componentPath03 = SOURCES_DICTIONARY.ToDoListReactV0301
const unitTestPath03 = SOURCES_DICTIONARY.ToDoListReactV0301Test

;(async () => {
  const componentStr01 = await getReadFileToString(componentPath01)
  const component01 = await getReplacedSpacesInString(componentStr01)

  const unitTestStr01 = await getReadFileToString(unitTestPath01)
  const unitTest01 = await getPromptExample(unitTestStr01)
  const assist01 = await getReplacedSpacesInString(unitTestStr01)

  const componentStr02 = await getReadFileToString(componentPath02)
  const component02 = await getReplacedSpacesInString(componentStr02)

  const unitTestStr02 = await getReadFileToString(unitTestPath02)
  const unitTest02 = await getPromptExample(unitTestStr02)
  const assist02 = await getReplacedSpacesInString(unitTestStr02)

  const componentStr03 = await getReadFileToString(componentPath03)
  const component03 = await getReplacedSpacesInString(componentStr03)

  const unitTestStr03 = await getReadFileToString(unitTestPath03)
  const unitTest03 = await getPromptExample(unitTestStr03)
  const assist03 = await getReplacedSpacesInString(unitTestStr03)

  const promptReturn = await getBotReactFcUnitTestModel({
    component01,
    unitTest01,
    assist01,
    component02,
    unitTest02,
    assist02,
    component03,
    unitTest03,
    assist03,
  })

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
})()
