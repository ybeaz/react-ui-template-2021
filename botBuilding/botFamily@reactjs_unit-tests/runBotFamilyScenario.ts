import { getReadFileToString } from '../../tools/getReadFileToString'
import { getReplacedSpacesInString } from '../../tools/getReplacedSpacesInString'
import { getPromptExample } from '../../tools/getPromptExample'
import { getBotModel } from './getBotModel'
import { getWrittenPromptReturnAsync } from '../shared/getWrittenPromptReturnAsync'

const fileBaseName = 'botReactFcUnitTests'

const scenarioTree: Record<string, Record<string, any>> = {
  botReactFCUnitTestFull: {
    isActive: true,
    arrFilt: [3, 4],
    model: 'gpt-4-0314',
    temperature: 0.5,
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
    arrFilt: [],
    model: 'gpt-4-0314',
    temperature: 0.5,
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

/**
 * @description Function to runBotFamilyScenarioUnitTest
 * @run ts-node botBuilding/botFamily@reactjs_unit-tests/runBotFamilyScenario.ts
 */

Object.keys(scenarioTree).forEach(async (botKey: string) => {
  const { isActive, arrFilt, model, temperature, pathes } = scenarioTree[botKey]
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
      (await getBotModel({
        arrFilt,
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
      })) || ''

    getWrittenPromptReturnAsync(
      {
        promptReturn,
        dirname: __dirname,
        fileBaseName,
        folderNameOut: 'output/',
      },
      { printRes: true }
    )
  }
})
