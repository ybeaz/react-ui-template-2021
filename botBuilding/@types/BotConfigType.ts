import { PatternSrcType } from './PatternSrcType'

export type BotConfigType = {
  profileName?: string
  isActive: boolean
  arrFilt: number[]
  model: string
  temperature: number
  patternsSrcs: PatternSrcType[]
  promptExamples?: string[]
}

export type BotFamilyConfigType = Record<string, BotConfigType>
