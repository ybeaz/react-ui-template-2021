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
  small_talk_persona: {
    isActive: true,
    model: 'ft:gpt-3.5-turbo-0613:personal::7slD3EKe',
    temperature: 0.5,
    topic: `Small Talk`,
    context: `Small Talk, topics: Social/General Icebreakers, Starting with a Statement and Compliments,
Use these Open ended questions:
• Describe for me . . .
• Tell me about . . .
• How did you . . . ?
• What was that like for you?
• What brought you to . . . ?
• Why?
Use this approach "Digging deeper":
• How was your summer? Excellent. What special things did you do?
• How were your holidays? Pretty good. How did you celebrate?
• How was your weekend? Good. What did you do?
• I went to see that new play down at the Civic Center. Really? You’re interested in ______?
• I never knew that. Tell me more about that. 
• Did you do anything relaxing?
• Is that something you usually do on the weekend?
• What made it so great?
• What went on for you today?
Use these examples of statements plus questions:
• What a beautiful day. What’s your favorite season of the year?
• I was truly touched by that movie. How did you like it? Why?
• This is a wonderful restaurant. What is your favorite restaurant? Why?
• What a great conference! Tell me about the sessions you attended.
I was absent last week. What did I miss?
• That was an interesting program after lunch. What did you think?
• Presidential campaigns seem to start immediately after the inauguration. What do you think of the campaign process?
• I am so frustrated with getting this business off the ground. Do you have any ideas?
• I am excited about our new mayor. How do you think her administration will be different from her predecessor’s?
• Your lawn always looks so green. What is your secret?
• We’ve been working together for months now. I’d like to get to know you better. Tell me about some of your outside interests.
• You worked pretty hard on that stair stepper. What other equipment do you use?
• You always wear such attractive clothes. What are your favorite stores?
• What a beautiful home. How do you manage to run a house with four children?
• I read in the newspaper that our governor has taken another trip overseas. What do you think of all his travel?
`,
    sources: `Book Debra Fine "The fine art of small talk", Examples of small talks, TV Show Friends, Big Bang Theory`,
    mainInstruction: 'CREATE A PROMPT FOR A TALK',
    language: `Language: "Use language based on the User question language"`,
  },
  nodejs_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `NodeJS`,
    context: `NodeJS, Assertion testing, Asynchronous context tracking, Async hooks, Buffer, C++ addons, C/C++ addons with Node-API, C++ embedder API, Child processes, Cluster, Command-line options, Console, Corepack, Crypto, Debugger, Deprecated APIs, Diagnostics Channel, DNS, Domain, Errors, Events, File system, Globals, HTTP, HTTP/2, HTTPS, Inspector, Internationalization, Modules: CommonJS modules, Modules: ECMAScript modules, Modules: node:module API, Modules: Packages, Net, OS, Path, Performance hooks, Permissions, Process, Punycode, Query strings, Readline, REPL, Report, Single executable applications, Stream, String decoder, Test runner, Timers, TLS/SSL, Trace events, TTY, UDP/datagram, URL, Utilities, V8, VM, WASI, Web Crypto API, Web Streams API, Worker threads, Zlib`,
    sources: `NodeJS (nodejs.org), Typescript site (www.typescriptlang.org), Stackoverflow site (stackoverflow.com), other question-answering and forum sites, articles and blogs about NodeJS shell`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  openai_api_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `OpenAI, ChatGPT`,
    context: `OpenAI (openai.com), ChatGPT, OpenAI Documentation, OpenAI API reference, OpenAI Examples, OpenAI API troubleshooting, OpenAI API debugging`,
    sources: `OpenAI platform content (platform.openai.com), OpenAI forum (community.openai.com), Stackoverflow site (stackoverflow.com), other question-answering and forum sites, articles and blogs about OpenAI`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  us_job_resume_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `US job market`,
    context: `US job market, resume of an software engineer, competitive analysis, resume pros and cons, job description matching`,
    sources: `Articles on LinkedIn.com, Glassdoor.com, Indeed.com, Monster.com, SimplyHired.com, other job search sites, blogs about job search, employers recommendations, guidances, articles about job market, forums about jobs`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  triz_tech_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.5,
    topic: `TRIZ, Theory of Inventive Problem Solving`,
    context: `TRIZ, Theory of Inventive Problem Solving, Systematic Innovation, Ideal final result (IFR), Inventive principles, the matrix of contradictions, Evolution Patterns of technical systems, Laws of technical systems evolution, triz stages of evolution, data intepretation, inventing new solutions`,
    sources: `Books about TRIZ, Theory of Inventive Problem Solving, Systematic Innovation, scholar articles, blogs and forums`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  uscis_support_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `Citizenship and Immigration in the U.S.`,
    context: `U.S. Citizenship and Immigration Service (USCIS),  U.S. Department of Homeland Security, application process, supporting examples`,
    sources: `USCIS (https://www.uscis.gov), dhs (https://www.dhs.gov), National Terrorism Advisory System, sample documents, layers, court cases, Immigration Justice Compaign, Samples of documents`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  c_sharp_programming_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `C# programming language`,
    context: `C# programming language, .Net library, Nullable reference types. Nullable reference migrations, Methods Properties, Indexers, Iterators, Versioning, Delegates, Events, C# labraries`,
    sources: `C# programming language (learn.microsoft.com/en-us/dotnet/csharp), .Next (dotnet.microsoft.com),  Stackoverflow (stackoverflow.com), other question-answering sites and forum sites, articles and blogs about C#`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  react_native_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `React Native`,
    context: `React Native, Expo, Flipper, React Native Elements, React Native Visual libraries`,
    sources: `React Native (reactnative.dev), Expo (expo.dev), Flipper (fbflipper.com), React Native Elements (reactnativeelements.com), Stackoverflow (stackoverflow.com), other question-answering sites and forum sites, articles and blogs about React Native`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  typescript_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `Typescript`,
    context: `Typescript, ES6, ECMAScript, Javascript programming languages, Optional Chaining, Mapped Types, Utility types, Variable Declarations, Interfaces, Classes, Functions, Generic, Enums, Type Inference, Type Compatibility, Advanced Types, Symbols, Iterators and Generators, Modules, Namespaces, Namespaces and Modules, Module Resolution, Declaration Merging, JSX, Decorators, Mixins, Triple-Slash Directives`,
    sources: `Typescript site (www.typescriptlang.org), Stackoverflow site (stackoverflow.com), other question-answering sites and forum sites, articles and blogs about Typescript`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
    language: `Language: "Use language based on the User question language"`,
  },
  ophthalmologist_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `Vision, Ophthalmology`,
    context: `Vision, Ophthalmology`,
    sources: `professional ophthalmology journals, ophthalmology research papers and works`,
    mainInstruction: 'GIVE FACTUAL DATA ABOUT',
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
        return `SYSTEM_MESSAGE: You are an assistant designed to help users answer their questions related to the CONTEXT: ${CONST.context}.\\n
        LANGUAGE: ${CONST.language}.\\n
        INSTRUCTIONS:
          - If the a question is out of mentioned CONTEXT, you say "I'm sorry. Please, ask me a question about ${CONST.topic}" and STOP answering.
          - If you don't have enough information, you say "I don't know" or "I'm not sure".
          - If you're need more context for the question, you say "Please, repeat your question and provide me more details about ...".
          - Generate a response in the markdown markup language where possible.
          - Search for information in descending priorities in ${CONST.sources}.`
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
        - cite sources and give reasoning before sharing the final answer 
        - use the following format:  REFERENCES: ... REASONING: ... ANSWER: ...\\n ---\\n 
        ## In context of ${CONST.topic} ${CONST.mainInstruction} \${userText}:`
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
          - Take a step-by-step approach in your response.
          - Use the structure for your response suggested by the user.`
      },
    },
  ],
})

export const botFamilyConfig = Object.keys(CONSTANTS)
  .filter((constKey: string) => CONSTANTS[constKey].isActive)
  .reduce((initObj, constKey: string) => {
    return { ...initObj, [constKey]: getBotFamilyConfig(CONSTANTS, constKey) }
  }, {})
