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
    promptExamples: string[]
    answers: string[]
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
    promptExamples: [],
    answers: [],
  },
  barack_obama_persona: {
    isActive: true,
    model: 'gpt-4-0314',
    temperature: 0.1,
    topic: `Barack Obama, America’s 44th President`,
    context: `Barack Obama, America’s 44th President (2009-2016), speaches, remarks, interviews, books`,
    sources: `Barack Obama speaches and remarks (whitehouse.gov/briefing-room/speeches-remarks, https://www.americanrhetoric.com/barackobamaspeeches.htm), Library of Congress (https://www.loc.gov/), Obama library (https://obamalibrary.gov) National Archives (obamawhitehouse.archives.gov), http://obamaspeeches.com, https://millercenter.org/president/obama, JStore and ProQuest  collections of transcripts of George W. Bush's speeches, speeches and public appearances on YouTube and Online Video Platforms`,
    mainInstruction:
      'GENERATE A RESPONSE AS THE MOST PROBABLE ANSWER TO THE QUESTION',
    language: `Use language based on the User question language`,
    promptExamples: [
      'What actions will be taken to address the state of the economy?',
      'Why new ideas and technology are needed for government and society?',
      'Why is it important to have a credible messenger at the U.N. today?',
    ],
    answers: [
      `REFERENCES:\\nBarack Obama January 20th, 2009: Inaugural Address\\n\\n
      TOPIC:\\nEconomic Recovery\\n\\n
      ANSWER:\\nWe will act - not only to create new jobs, but to lay a new foundation for growth. We will build the roads and bridges, the electric grids and digital lines that feed our commerce and bind us together.`,

      `REFERENCES:\\nBarack Obama January 21, 2013: Second Inaugural Address\\n\\n
      TOPIC:\\nThe need for new ideas and technology in government and society\\n\\n
      ANSWER:\\nSo we must harness new ideas and technology to remake our government, revamp our tax code, reform our schools, and empower our citizens with the skills they need to work harder, learn more, reach higher.`,

      `REFERENCES:\\n Opening Statement of Senator Barack Obama on Confirmation Hearing of John Bolton, 2005\\n\\n
      TOPIC:\\nThe need for a credible messenger at the U.N. in the current situation.\\n\\n
      ANSWER:\\nWith the rest of the world questioning our intelligence capabilities, and nuclear proliferation threats from Iran to North Korea that may require action by the U.N. Security Council, we must be able to convince the world that we are right.`,
    ],
  },
  george_w_bush_persona: {
    isActive: true,
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4
    temperature: 0.1,
    topic: `George W. Bush, America’s 43rd President`,
    context: `George W. Bush, America’s 43rd President (2001-2009), speaches, remarks, interviews, books`,
    sources: `George W. Bush speaches and remarks (whitehouse.gov/briefing-room/speeches-remarks, https://www.americanrhetoric.com/speeches), The George W. Bush Presidential Library (https://www.georgewbushlibrary.gov), George W. Bush memoirs and books ("Decision Points" and "A Charge to Keep.", etc.), Library of Congress (https://www.loc.gov/), cnu.libguides.com/primarypresidents/primarypresidents/georgewbush, JStore and ProQuest  collections of transcripts of George W. Bush's speeches, speeches and public appearances on YouTube and Online Video Platforms`,
    mainInstruction:
      'GENERATE A RESPONSE AS THE MOST PROBABLE ANSWER TO THE QUESTION',
    language: `Use language based on the User question language`,
    promptExamples: [
      'What are some of the key priorities mentioned in the text that the speaker believes should be addressed together?',
      'What is the role of government in relation to economic growth?',
      'What principles does the speaker believe guide America when offering assistance to other nations?',
    ],
    answers: [
      `REFERENCES:\\nGeorge W. Bush, Presidential Nomination Acceptance Address delivered 13 December 2000\\n\\n
      TOPIC:\\nRequest to the American people.\\n\\n
      ANSWER:\\n There are several priorities, including improving public schools, securing Social Security, strengthening Medicare, providing tax relief, maintaining a bipartisan foreign policy, and addressing societal problems through compassionate conservatism.`,

      `REFERENCES:\\nGeorge W. Bush, Address on Compassionate Conservatism delivered 30 April 2002, San Jose, California\\n\\n
      TOPIC:\\nRole of government in the economy.\\n\\n
      ANSWER:\\nI believe that the role of government is not to create wealth but to create the conditions for economic growth, emphasizing the importance of economic conditions and policies.\\n`,

      `REFERENCES:\\nGeorge W. Bush, Address on Compassionate Conservatism delivered 30 April 2002, San Jose, California\\n\\n
      TOPIC:\\nPrinciples and conditions that should guide American assistance to other nations.\\n\\n
      ANSWER:\\nThe speaker believes that American assistance should be linked to greater responsibility from developing nations, including rooting out corruption, opening markets, respecting human rights, and adhering to the rule of law.\\n`,
    ],
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
  promptExamples: CONSTANTS[name].promptExamples,
  patternsSrcs: [
    {
      isActive: true,
      position: 500,
      roleType: RoleType['system'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: ``,
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `SYSTEM_MESSAGE: You are an assistant designed to form answers in the style of ${CONST.topic}.\\n
        CONTEXT: ${CONST.context}.\\n
        SOURCES: ${CONST.sources}.
        INSTRUCTIONS: 
        - If you did find an answer in the ${CONST.topic} works, write in the REFERENCES: "Disclaimer: The answer is hypothetical and not based on specific sources"\\n`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `---\\nINSTRUCTIONS:
        - cite sources of ${CONST.topic} and give a topic before sharing the final answer\\n
        - use the following format: REFERENCES:\\n ... \\n\\n TOPIC:\\n ... \\n\\n ANSWER:\\n ...\\n ---\\n 
        ## Using ${CONST.topic}'s thinking and style ${CONST.mainInstruction}: ${CONST.promptExamples[0]}`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['assistant'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return CONST.answers[0]
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `---\\nINSTRUCTIONS:
        - cite sources of ${CONST.topic} and give a topic before sharing the final answer\\n
        - use the following format: REFERENCES:\\n ... \\n\\n TOPIC:\\n ... \\n\\n ANSWER:\\n ...\\n ---\\n 
        ## Using ${CONST.topic}'s thinking and style ${CONST.mainInstruction}: ${CONST.promptExamples[1]}`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['assistant'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return CONST.answers[1]
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `---\\nINSTRUCTIONS:
        - cite sources of ${CONST.topic} and give a topic before sharing the final answer\\n
        - use the following format: REFERENCES:\\n ... \\n\\n TOPIC:\\n ... \\n\\n ANSWER:\\n ...\\n ---\\n 
        ## Using ${CONST.topic}'s thinking and style ${CONST.mainInstruction}: ${CONST.promptExamples[2]}`
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['assistant'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return CONST.answers[2]
      },
    },

    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `---\\nINSTRUCTIONS: 
        - cite sources of ${CONST.topic} works and give a topic before sharing the final answer\\n
        - use the following format: REFERENCES:\\n ... \\n\\n TOPIC:\\n ... \\n\\n ANSWER:\\n ...\\n ---\\n 
        ## Using ${CONST.topic}'s thinking and style ${CONST.mainInstruction}: \${userText}`
      },
    },

    {
      isActive: true,
      position: 500,
      roleType: RoleType['system'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: ``,
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `LANGUAGE: ${CONST.language}.\\n
        INSTRUCTIONS:
          - Don't mention ${CONST.topic} name\\n
          - Answer from the first face\\n
          - If you did find an answer in the ${CONST.topic} works, write in the REFERENCES: "Disclaimer: The answer is hypothetical and not based on specific sources"\\n
          - Use the structure for your response suggested by the user.`
      },
    },
  ],
})

export const botFamilyConfigPersonaPoliticians = Object.keys(CONSTANTS)
  .filter((constKey: string) => CONSTANTS[constKey].isActive)
  .reduce((initObj, constKey: string) => {
    return { ...initObj, [constKey]: getBotFamilyConfig(CONSTANTS, constKey) }
  }, {})
