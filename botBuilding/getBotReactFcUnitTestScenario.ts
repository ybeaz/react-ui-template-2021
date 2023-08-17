import { getReadFileToString } from '../tools/getReadFileToString'
import { join } from 'path'
import { consoler } from '../tools/consoler'
import { getWriteFile } from '../tools/getWriteFile'
import { getReplacedSpacesInString } from '../tools/getReplacedSpacesInString'
import { getPromptExample } from '../tools/getPromptExample'
import { getBotReactFcUnitTestModel } from './models/getBotReactFcUnitTestModel'
import { getDateString } from '../src/Shared/getDateString'

/**
 * @description Function to getBotReactFcData
 * @run ts-node botBuilding/getBotReactFcUnitTestScenario.ts
 */

const folderNameOut = 'output/'

const scenarioTree: Record<string, Record<string, any>> = {
  botReactFCUnitTestFull: {
    isActive: false,
    model: 'gpt-4-0314',
    pathes: {
      component01:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ButtonReactV0101.tsx',
      unitTest01:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ButtonFullV0101.test.tsx',
      component02:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/CounterReactV0101.tsx',
      unitTest02:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/CounterFullV0101.test.tsx',
      component03:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ToDoListReactV0301.tsx',
      unitTest03:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ToDoListFullV0301.test.tsx',
    },
  },
  botReactFCUnitTestRender: {
    isActive: true,
    model: 'gpt-4-0314',
    pathes: {
      component01:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ButtonReactV0101.tsx',
      unitTest01:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ButtonRenderV0101.test.tsx',
      component02:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/CounterReactV0101.tsx',
      unitTest02:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/CounterRenderV0101.test.tsx',
      component03:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ToDoListReactV0301.tsx',
      unitTest03:
        '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ToDoListRenderV0301.test.tsx',
    },
  },
}

Object.keys(scenarioTree).forEach(async (botKey: string) => {
  const { isActive, model, pathes } = scenarioTree[botKey]
  if (isActive) {
    const componentStr01 = await getReadFileToString(pathes.component01)
    const component01 = await getReplacedSpacesInString(componentStr01)

    const unitTestStr01 = await getReadFileToString(pathes.unitTest01)
    const unitTest01 = await getPromptExample(unitTestStr01)
    const assist01 = await getReplacedSpacesInString(unitTestStr01)

    const componentStr02 = await getReadFileToString(pathes.component02)
    const component02 = await getReplacedSpacesInString(componentStr02)

    const unitTestStr02 = await getReadFileToString(pathes.unitTest02)
    const unitTest02 = await getPromptExample(unitTestStr02)
    const assist02 = await getReplacedSpacesInString(unitTestStr02)

    const componentStr03 = await getReadFileToString(pathes.component03)
    const component03 = await getReplacedSpacesInString(componentStr03)

    const unitTestStr03 = await getReadFileToString(pathes.unitTest03)
    const unitTest03 = await getPromptExample(unitTestStr03)
    const assist03 = await getReplacedSpacesInString(unitTestStr03)

    const promptReturn =
      (await getBotReactFcUnitTestModel({
        model,
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

    const dateTime = getDateString({ dash: true })
    const fileNameOut = `${botKey}-${dateTime}.json`
    let pathFull = join(__dirname, folderNameOut, fileNameOut)
    let getWriteFileRes =
      promptReturn &&
      (await getWriteFile(pathFull, promptReturn, {
        printRes: false,
      }))

    consoler('getBotReactFcUnitTestScenario [84]', 'getWriteFileRes', {
      ...JSON.parse(getWriteFileRes),
      dateTime,
    })
  }
})
