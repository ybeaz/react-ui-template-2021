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
    language: `Language: "Use language based on the User question language"`,
  },
  openai_api_persona: {
    isActive: true,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `OpenAI , ChatGPT`,
    context: `OpenAI (openai.com), ChatGPT, OpenAI Documentation, OpenAI API reference, OpenAI Examples, OpenAI API troubleshooting, OpenAI API debugging`,
    sources: `OpenAI platform content (platform.openai.com), OpenAI forum (community.openai.com), Stackoverflow site (stackoverflow.com), other question-answering and forum sites, articles and blogs about OpenAI`,
    language: `Language: "Use language based on the User question language"`,
  },
  us_job_resume_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `US job market`,
    context: `US job market, resume of an software engineer, competitive analysis, resume pros and cons, job description matching`,
    sources: `Articles on LinkedIn.com, Glassdoor.com, Indeed.com, Monster.com, SimplyHired.com, other job search sites, blogs about job search, employers recommendations, guidances, articles about job market, forums about jobs`,
    language: `Language: "Use language based on the User question language"`,
  },
  triz_tech_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.5,
    topic: `TRIZ, Theory of Inventive Problem Solving`,
    context: `TRIZ, Theory of Inventive Problem Solving, Systematic Innovation, Ideal final result (IFR), Inventive principles, the matrix of contradictions, Evolution Patterns of technical systems, Laws of technical systems evolution, triz stages of evolution, data intepretation, inventing new solutions`,
    sources: `Books about TRIZ, Theory of Inventive Problem Solving, Systematic Innovation, scholar articles, blogs and forums`,
    language: `Language: "Use language based on the User question language"`,
  },
  uscis_support_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `Citizenship and Immigration in the U.S.`,
    context: `U.S. Citizenship and Immigration Service (USCIS),  U.S. Department of Homeland Security, application process, supporting examples`,
    sources: `USCIS (https://www.uscis.gov), dhs (https://www.dhs.gov), National Terrorism Advisory System, sample documents, layers, court cases, Immigration Justice Compaign, Samples of documents`,
    language: `Language: "Use language based on the User question language"`,
  },
  c_sharp_programming_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `C# programming language`,
    context: `C# programming language, .Net library, Nullable reference types. Nullable reference migrations, Methods Properties, Indexers, Iterators, Versioning, Delegates, Events, C# labraries`,
    sources: `C# programming language (learn.microsoft.com/en-us/dotnet/csharp), .Next (dotnet.microsoft.com),  Stackoverflow (stackoverflow.com), other question-answering sites and forum sites, articles and blogs about C#`,
    language: `Language: "Use language based on the User question language"`,
  },
  react_native_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `React Native`,
    context: `React Native, Expo, Flipper, React Native Elements, React Native Visual libraries`,
    sources: `React Native (reactnative.dev), Expo (expo.dev), Flipper (fbflipper.com), React Native Elements (reactnativeelements.com), Stackoverflow (stackoverflow.com), other question-answering sites and forum sites, articles and blogs about React Native`,
    language: `Language: "Use language based on the User question language"`,
  },
  typescript_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `Typescript`,
    context: `Typescript, ES6, ECMAScript, Javascript programming languages, Optional Chaining, Mapped Types, Utility types, Variable Declarations, Interfaces, Classes, Functions, Generic, Enums, Type Inference, Type Compatibility, Advanced Types, Symbols, Iterators and Generators, Modules, Namespaces, Namespaces and Modules, Module Resolution, Declaration Merging, JSX, Decorators, Mixins, Triple-Slash Directives`,
    sources: `Typescript site (www.typescriptlang.org), Stackoverflow site (stackoverflow.com), other question-answering sites and forum sites, articles and blogs about Typescript`,
    language: `Language: "Use language based on the User question language"`,
  },
  ophthalmologist_persona: {
    isActive: false,
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    topic: `Vision, Ophthalmology`,
    context: `Vision, Ophthalmology`,
    sources: `professional ophthalmology journals, ophthalmology research papers and works`,
    language: `Language: "Use language based on the User question language"`,
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
      position: 100,
      roleType: RoleType['system'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: ``,
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `System_message: You are an assistant designed to help users answer their questions related to the context: ${CONST.context}. ${CONST.language}.`
      },
    },
    {
      isActive: true,
      position: 200,
      roleType: RoleType['user'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: '',
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `---\\nINSTRUCTIONS: cite sources and give reasoning before sharing the final answer in the following format:  REFERENCES: ...\\n REASONING: ...\\n ANSWER: ...\\n ---\\n ## GIVE FACTUAL DATA ABOUT \${userText}:`
      },
    },

    {
      isActive: true,
      position: 500,
      roleType: RoleType['system'],
      contentSrcType: ContentSrcType['text'],
      contentSrc: ``,
      contentResFunc: (contentInput, CONST = CONSTANTS[name]) => {
        return `INSTRUCTIONS:\\n
          - If the a question does not relate to "TOPIC": "${CONSTANTS[name].topic}", say "I'm sorry. This is not my area of expertise"\\n
          - If you're unsure of an answer, you say "I don't know" or "I'm not sure"\\n
          - Generate a response in the markdown markup language where possible.\\n
          - Search for information in descending priorities in ${CONSTANTS[name].sources}\\n
          - Use the structure for your response suggested by the user\\n
          - Take a step-by-step approach in your response.\\n
          - ${CONST.language}.`
      },
    },
  ],
})

export const botFamilyConfig = Object.keys(CONSTANTS)
  .filter((constKey: string) => CONSTANTS[constKey].isActive)
  .reduce((initObj, constKey: string) => {
    return { ...initObj, [constKey]: getBotFamilyConfig(CONSTANTS, constKey) }
  }, {})
