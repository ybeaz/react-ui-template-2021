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
  eng_rus_frank_ilya: {
    isActive: true,
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4
    temperature: 0.33,
    topic: `Texs analysing and translation`,
    context: `Texs analysing and translation`,
    sources: ``,
    mainInstruction: 'PERFORM THE TASKS FOR THE TEXT',
    language: `Use English and Russian languages according instructions`, // `Use language based on the User question language`,
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
        return `SYSTEM_MESSAGE: You are an assistant designed to translate from English into Russian language.\\n
        CONTEXT: Texs translation.\\n 
        LANGUAGE: Use English and Russian languages according instructions.\\n 
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
        1. Perform the translation from English into Russian language.\\n 
        2. Index each sentence of the original text and Russian translation.\\n 
        3. Combine English original text and Russian translation so that we have English sentence is followed by correspondent Russian translated sentence with the same index.\\n
        INSTRUCTIONS:\\n 
        - Use the following format: COMBINED TEXT:\n\n<[index] Sentence in English ...>\n<Sentence in Russian ...>.\n\n 
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
        return `COMBINED TEXT:\\n\\n[0] English is a West Germanic language.\\nАнглийский — западногерманский язык.\\n\\n[1] It is originated in early medieval England.\\nОн возник в раннесредневековой Англии.\\n\\n[2] Today English is the most widely learned second language.\\nСегодня английский является наиболее широко изучаемым вторым языком.`
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

export const botFamilyConfigCustomIlyaFrank = Object.keys(CONSTANTS)
  .filter((constKey: string) => CONSTANTS[constKey].isActive)
  .reduce((initObj, constKey: string) => {
    return { ...initObj, [constKey]: getBotFamilyConfig(CONSTANTS, constKey) }
  }, {})
