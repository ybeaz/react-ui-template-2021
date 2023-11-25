import { RoleType } from '../@types/RoleType'
import { ContentSrcType } from '../@types/ContentSrcType'
import { BotConfigType } from '../@types/BotConfigType'
import { consoler } from '../../tools/consoler'

type ConstantsType = {
  [key: string]: {
    isActive: boolean
    model: string
    temperature: number
    topic: string
    context: string
    sources: string
    mainInstruction: string
    language: string
  }
}

export type BotFamilyConfigType = Record<string, BotConfigType>

/**
 * @comments CONSTANTS - common/ static for all personalities
 *            contentSrc - varing for each object
 *            contentResFunc - function to build a string
 * @miscellaneous
 *            Language: "Use language based on the User question language"`
 */

const CONSTANTS: ConstantsType = {
  xxx_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4
    temperature: 0.1,
    topic: ``,
    context: ``,
    sources: ``,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  key_phrases_tagger: {
    isActive: true,
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4
    temperature: 0.33,
    topic: `Texs analysing and translation`,
    context: `Texs analysing and translation`,
    sources: ``,
    mainInstruction: 'PERFORM THE TASKS FOR THE TEXT',
    language: `Use language based on the User question language`,
  },
}

interface GetBotFamilyConfig {
  (CONSTANTS: ConstantsType, name: string): BotConfigType
}

/**
 * @import import { botFamilyConfig, BotFamilyConfigType, BotConfigType, PatternSrcType } from './botFamilyConfig'
 */
export const getBotFamilyConfig: GetBotFamilyConfig = (CONSTANTS, name) => ({
  profileName: name,
  isActive: true,
  arrFilt: [],
  model: CONSTANTS[name].model,
  temperature: CONSTANTS[name].temperature,
  patternsSrcs: [
    {
      isActive: true,
      position: 500,
      roleType: RoleType['system'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: ``,
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `SYSTEM_MESSAGE: You are an assistant designed to extact and tag key phrases.\\n
        CONTEXT: Texs analysing.\\n 
        LANGUAGE: ${CONST.language}.\\n 
        INSTRUCTIONS:\\n
        - If you don't understand the paragraph, you say \"Please, clarify\" or \"I am sorry, I don't understand\".\\n
        - Generate a response in the markdown markup language where possible.`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `---\\nTASKS:\\n
        1. Detect a key phrase in each sentence of the original text.\\n 
        2. Make each key phrase bold with markdown syntax (**) like this ...**<...>**...\\n 
        INSTRUCTIONS:\\n 
        - Use the following format: WITH KEY PHRASES:\\n\\n sentenses with tagged key phrases\\n 
        Now PERFORM THE TASKS FOR THE TEXT: \"English is a West Germanic language. It is originated in early medieval England. Today English is the most widely learned second language.\"`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['assistant'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `WITH KEY PHRASES:\\n\\nEnglish is a **West Germanic** language. It is originated in **early medieval** England. Today English is the most **widely learned second language**.`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `Well done. Now PERFORM THE TASKS FOR THE TEXT: \"Alan Turing, J. Presper Eckert, and John Mauchly were considered to be some of the major pioneers of computer technology. We give them a credit for their developments. Most of their efforts were focused on designing the first digital computer."`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['assistant'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `WITH KEY PHRASES:\\n\\n**Alan Turing, J. Presper Eckert, and John Mauchly** were considered to be some of the major pioneers of computer technology. We give them credit for their developments. Most of **their efforts were focused on designing the first digital computer**.`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `Well done. Now PERFORM THE TASKS FOR THE TEXT: \"If you read really intensively, the method should work. The biggest mistake anyone makes when studying a foreign language is that they do it little by little, not jumping into it head first. Language is not mathematics; one doesn’t need to learn it, one needs to get accustomed to it. It’s not about logic or memory; it’s about experience and skill. It rather resembles a sport that one should practice according to a certain schedule, because otherwise there’ll be no result. If you start reading in a foreign language at once and do it a lot, then fluency is only a matter of three or four months (for beginners)."`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['assistant'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `WITH KEY PHRASES:\\n\\nIf you **read really intensively**, the method should work. The biggest mistake anyone makes when studying a foreign language is that they do it **little by little**, not jumping into it head first. Language is not mathematics; one doesn’t need to **learn it**, one needs to get accustomed to it. It’s not about logic or memory; it’s about **experience and skill**. It rather resembles a sport that one should practice according to a certain schedule, because otherwise there’ll be no result. If you start reading in a foreign language at once and do it a lot, then **fluency** is only a matter of three or four months (for beginners).`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `Good job. Now PERFORM THE TASKS FOR THE TEXT: \"\${userText}\"`
      },
    },

    {
      isActive: true,
      position: 500,
      roleType: RoleType['system'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: ``,
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `INSTRUCTIONS:
          - Use the structure for your response suggested by the user`
      },
    },
  ],
})

export const botFamilyConfigCustomKeyPhrases = Object.keys(CONSTANTS)
  .filter((constKey: string) => CONSTANTS[constKey].isActive)
  .reduce((initObj, constKey: string) => {
    return { ...initObj, [constKey]: getBotFamilyConfig(CONSTANTS, constKey) }
  }, {})
