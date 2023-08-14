import { promises as fs } from 'fs'

const SOURCES_DICTIONARY: Record<string, string> = {
  ButtonReactV0101:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/ButtonReactV0101.tsx',
  ButtonReactV0101Test:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/ButtonReactV0101.test.tsx',
  CounterReactV0101:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/CounterReactV0101.tsx',
  CounterReactV0101Test:
    '/Users/admin/Dev/react-ui-template-2021/src/ViewLayer/ComponentsSamples/__tests__/CounterReactV0101.test.tsx',
}

export const getReadFile = async (path: string) => {
  const data = await fs.readFile(path, 'utf8')
  return JSON.stringify(data)
}

/**
 * @description Tool to getStringFromFileTool
 * @import import { getStringFromFileTool } from ./Shared/getStringFromFileTool'
 */
;(async () => {
  const path = SOURCES_DICTIONARY.ButtonReactV0101

  let str = await getReadFile(path)
  str = str.replace(/\s\s+/g, ' ')
  console.info('getStringFromFileTool [25]', { str })
})()
