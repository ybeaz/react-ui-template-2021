import { promises as fs } from 'fs'

export const getReadFile = async (path: string) => {
  const data = await fs.readFile(path, 'utf8')
  return JSON.stringify(data)
}

/**
 * @description Tool to getTxtToJsonTool
 * @import import { getTxtToJsonTool } from ./Shared/getTxtToJsonTool'
 */
;(async () => {
  // const path =
  //   '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ButtonReactV0101.tsx'
  // const path =
  //   '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ButtonReactV0101.test.tsx'
  // const path =
  //   '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/CounterReactV0101.tsx'
  // const path =
  //   '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/CounterReactV0101.test.tsx'
  const path =
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ToDoListReactV0301.tsx'
  const str = await getReadFile(path)
  console.info('getTxtToJsonTool [43]', { str })
})()
