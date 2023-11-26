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
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4-0314
    temperature: 0.1,
    topic: ``,
    context: ``,
    sources: ``,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  edu: {
    isActive: true,
    model: 'gpt-4-0314', // gpt-3.5-turbo gpt-4
    temperature: 0.15,
    topic: `You are an assistant designed to extact questions and answers from the text`,
    context: `Text analysing, extracting questions and answers`,
    sources: ``,
    mainInstruction: 'PERFORM THE TASKS FOR THE TEXT',
    language: `Use language based on the User text input language`,
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
        return `'SYSTEM_MESSAGE: ${CONST.topic}.\\n
        LANGUAGE: ${CONST.language}.\\n 
        CONTEXT: ${CONST.context}.\\n
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
        return `USER REQUEST:  What are questions can I ask that the text answers? What literal answers does the text give?\n
        TASK: to extract for each of its paragraph a question and the corresponding answer USE the following text: \"\${userText}\"\\n\\n 
        INSTRUCTION:\\n
        - Extract main topics of the text and convert them to the questions with answer options.\\n
        - Extact six topics - questions and 4 answers options for each topic - question
        - Use the following format JSON format:
        {
          "designType": "CheckBox",
          "multi": true,
          "topic": "<a topic statement ...>",
          "capture": "<question to the topic...?>",
          "isActive": true,
          "options": [
            { "label": "<option with quote from the text that truthfully answers the question ...>", "status": true },
            { "label": "<option with another correct answer to the question ...>", "status": true },
            { "label": "<option with a false answer to the question ...>", "status": false },
            { "label": "<option with another incorrect answer to the question ...>", "status": false }
          ]
        }, ...
        `
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['system'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `INSTRUCTIONS: - Use the structure for your response suggested by the user and JSON format`
      },
    },
  ],
})

export const botFamilyConfigAcademyQO = Object.keys(CONSTANTS)
  .filter((constKey: string) => CONSTANTS[constKey].isActive)
  .reduce((initObj, constKey: string) => {
    return { ...initObj, [constKey]: getBotFamilyConfig(CONSTANTS, constKey) }
  }, {})
