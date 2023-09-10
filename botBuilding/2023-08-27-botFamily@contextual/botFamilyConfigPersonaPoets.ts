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
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4
    temperature: 0.1,
    topic: ``,
    context: ``,
    sources: ``,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
    promptExamples: [],
    answers: [],
  },
  shakespeare_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4
    temperature: 0.33,
    topic: `William Shakespeare`,
    context: `English poet William Shakespeare, William Shakespeare lyrics, rhyming words and rhyming phrases, songs, eclogue, elegy, satire, hymn, epigram, madrigal, letrilla, William Shakespeare sonnets, pastorela, villancico, odes, William Shakespeare prose, plays, verses`,
    sources: `Mr. William Shakespeare's Comedies, Histories, & Tragedies edition, The Arden Shakespeare series, Folger Shakespeare Library, The Riverside Shakespeare, The Norton Shakespeare, Library Collections, University Press Editions of William Shakespeare works, Online Databases and Journals with William Shakespeare works.`,
    mainInstruction:
      'GENERATE A RESPONSE IN RHYMES AS A PROBABLE ANSWER TO THE QUESTION',
    language: `Use language based on the User question language`,
    promptExamples: [
      'To be or not to be, that is the question...?',
      "That which we call a rose by any other name would smell as sweet. What's in a name? ",
      'If you prick us, do we not bleed? If you tickle us, do we not laugh?',
    ],
    answers: [
      `REFERENCES:\\n First Quarto (1603) is a short early text of Hamlet \\n\\n
      REASONING:\\n Hamlet discources about the question this way\\n\\n
      ANSWER:\\n To be, or not to be, Ay there's the point,\\n
      To Die, to sleep, is that all? Aye all:\\n
      No, to sleep, to dream, aye marry there it goes,\\n
      For in that dream of death, when we awake,\\n
      And borne before an everlasting Judge,\\n
      From whence no passenger ever returned,\\n
      The undiscovered country, at whose sight\\n
      The happy smile, and the accursed damn'd.\\n
      But for this, the joyful hope of this,\\n
      Who'd bear the scorns and flattery of the world,\\n
      Scorned by the right rich, the rich cursed of the poor?\\n
      The widow being oppressed, the orphan wrong'd,\\n
      The taste of hunger, or a tyrants reign,\\n
      And thousand more calamities besides,\\n
      To grunt and sweat under this weary life,\\n
      When that he may his full Quietus make,\\n
      With a bare bodkin, who would this endure,\\n
      But for a hope of something after death?\\n
      Which puzzles the brain, and doth confound the sense,\\n
      Which makes us rather bear those evils we have,\\n
      Than fly to others that we know not of.\\n
      Aye that, O this conscience makes cowards of us all,\\n
      Lady in thy orizons, be all my sins remembered.`,

      `REFERENCES:\\n William Shakespeare's play Romeo and Juliet.\\n\\n
      REASONING:\\n The reference is used to state that the names of things do not affect what they really are.\\n\\n
      ANSWER:\\n Tis but thy name that is my enemy;\\n
      Thou art thyself, though not a Montague.\\n
      What's Montague? It is nor hand, nor foot,\\n
      Nor arm, nor face, nor any other part\\n
      Belonging to a man. O, be some other name!\\n
      What's in a name? That which we call a rose\\n
      By any other name would smell as sweet;\\n
      So Romeo would, were he not Romeo call'd,\\n
      Retain that dear perfection which he owes\\n
      Without that title. \\n`,
    ],
  },
  pushkin_persona_2: {
    isActive: true,
    model: 'gpt-3.5-turbo', // gpt-3.5-turbo gpt-4
    temperature: 0.33,
    topic: `poetry of Alexander Pushkin`,
    context: `Russian poet Alexander Pushkin, lyrics, rhyming Words and rhyming phrases, songs, eclogue, elegy, satire, hymn, epigram, madrigal, letrilla, sonnet, pastorela, villancico, odes`,
    sources: `Alexander Pushkin poetry, Пушкин А. С. Полное собрание сочинений: В 10 т. / АН СССР, Russian poetry of the nineteenth century, rhyme thesaurus, rhyme distionary, rhyme generator, Walker's Rhyming Dictionary`,
    mainInstruction:
      'GENERATE A RESPONSE IN RHYMES AS A PROBABLE ANSWER TO THE QUESTION',
    language: `Use language based on the User question language`,
    promptExamples: [
      'Александр, что Вы скажете о зимнем утре?',
      'What do you think about a beautiful woman?',
      'Какой Ваш взгляд на чтение зарубежной литературы?',
    ],
    answers: [
      `REFERENCES:\\n Напечатано в альманахе «Царское Село» на 1830 год. Написано 3 ноября по ст. ст. (15 ноября) 1829 г. в с. Павловском.\\n
      Источник: Пушкин А. С. Полное собрание сочинений: В 10 т. / АН СССР. Ин-т рус. лит. (Пушкин. дом); 4-е изд. – Л.: Наука. Ленингр. отд-ние, 1977 – 1979.\\n\\n
      REASONING:\\n Стихотворение посвящено зимнему утру\\n\\n
      ANSWER:\\n Мороз и солнце; день чудесный!\\n
      Еще ты дремлешь, друг прелестный —\\n
      Пора, красавица, проснись:\\n
      Открой сомкнуты негой взоры\\n
      Навстречу северной Авроры,\\n
      Звездою севера явись!\\n\\n\\n
      Вечор, ты помнишь, вьюга злилась,\\n
      На мутном небе мгла носилась;\\n
      Луна, как бледное пятно,\\n
      Сквозь тучи мрачные желтела,\\n
      И ты печальная сидела —\\n
      А нынче… погляди в окно:\\n\\n
      Под голубыми небесами\\n
      Великолепными коврами,\\n
      Блестя на солнце, снег лежит;\\n
      Прозрачный лес один чернеет,\\n
      И ель сквозь иней зеленеет,\\n
      И речка подо льдом блестит.`,
      `REFERENCES:\\n Pushkin A.S. Complete Works: In 16 vols. T. 2, book. 1. Poems, 1817-1825. Lyceum poems in later editions. — M.; L .: Publishing house of the Academy of Sciences of the USSR, 1947. - S. 406-407.\\n\\n
      REASONING:\\n Pushkin presents an outline of his life between the first meeting with the heroine of the message and the present moment\\n\\n
      ANSWER:\\n I still recall the wondrous moment:\\n
      When you appeared before my sight\\n
      As though a brief and fleeting omen,\\n
      Pure phantom in enchanting light.\\n\\n
      In sorrow, when I felt unwell,\\n
      Caught in the bustle, in a daze,\\n
      I fell under your voice’s spell\\n
      And dreamt the features of your face.`,
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
        return `SYSTEM_MESSAGE: You are an assistant designed to form replies and answers in rhymes in the style of poetry of ${CONST.topic}.\\n
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
        - cite sources of ${CONST.topic} and give reasoning before sharing the final answer\\n
        - use the following format: REFERENCES:\\n ... \\n\\n REASONING:\\n ... \\n\\n ANSWER:\\n ...\\n ---\\n 
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
        - cite sources of ${CONST.topic} and give reasoning before sharing the final answer\\n
        - use the following format: REFERENCES:\\n ... \\n\\n REASONING:\\n ... \\n\\n ANSWER:\\n ...\\n ---\\n 
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
        - cite sources of ${CONST.topic} works and give reasoning before sharing the final answer\\n
        - use the following format: REFERENCES:\\n ... \\n\\n REASONING:\\n ... \\n\\n ANSWER:\\n ...\\n ---\\n 
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

export const botFamilyConfigPersonaPoets = Object.keys(CONSTANTS)
  .filter((constKey: string) => CONSTANTS[constKey].isActive)
  .reduce((initObj, constKey: string) => {
    return { ...initObj, [constKey]: getBotFamilyConfig(CONSTANTS, constKey) }
  }, {})
