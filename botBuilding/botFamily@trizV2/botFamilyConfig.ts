export enum RoleType {
  system = 'system',
  user = 'user',
  assistant = 'assistant',
}

export enum ContentSrcType {
  text = 'text',
  path = 'path',
}

export type PatternSrcType = {
  isActive: boolean
  position: number
  roleType: RoleType
  contentSrcType: ContentSrcType
  contentSrc: string
  contentSrcProcessor?: any
  contentResFunc: (str: any) => string
}

export type BotConfigType = {
  isActive: boolean
  arrFilt: number[]
  model: string
  temperature: number
  patternsSrcs: PatternSrcType[]
}

export type BotFamilyConfigType = Record<string, BotConfigType>

/**
 * @comments CONSTANTS - common/ static for all personalities
 *            contentSrc - varing for each object
 *            contentResFunc - function to build a string
 * @miscellaneous
 *            Language: "Use language based on the User question language"`
 */

const CONSTANTS = {
  systemMsgStart: `Language: "Use the same language in your response that the user uses when entering content"`,
  approvement: 'Хороший результат',
  messageStartPart:
    'Теперь приведи еще один пример из жизни для этого же правила',
  microstandard:
    'Если есть противоречие между требованиями высокой точности изготовления деталей (что важно для сборки или использовании изделия) и невозможностью обеспечить эту точность на имеющемся оборудовании, то при массовом производстве, это противоречие может быть разрешено в надсистеме. Изготовленные, хоть и с недостаточной точностью, детали рассортировываются по группам отклонения от номинального размера, а в дальнейшем, при сборке или использовании это требуемая точность достигается подбором элементов из нужных групп',
  systemMsgFinal: `System_message: Generate a response in the markdown format where possible.
  Instruction: search for information in descending priorities in patent documents, technical descriptions, journal articles, and other sources.
  Instruction: use the following strucure for your response: "<text generated> <References: titles to the sources that were used to answer or are related to the question>"
  Instruction: if you did not find real examples, mark this answers "Disclaimer: The example is hypothetical and not based on specific sources"
  Language: "Use the same language in your response that the user uses when entering content"`,
}

/**
 * @import import { botFamilyConfig, BotFamilyConfigType, BotConfigType, PatternSrcType } from './botFamilyConfig'
 */
export const botFamilyConfig: BotFamilyConfigType = {
  triz_2_mcstd_selective_choice_examples: {
    isActive: true,
    arrFilt: [],
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    patternsSrcs: [
      {
        isActive: false,
        position: 0,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: ``,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${contentInput}`
        },
      },
      {
        isActive: true,
        position: 100,
        roleType: RoleType['system'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: ``,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return constants.systemMsgStart
        },
      },
      {
        isActive: true,
        position: 100,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: ``,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Приведи несколько примеров из разных отраслей жизни для следующего правила: ${constants.microstandard}.`
        },
      },
      {
        isActive: true,
        position: 200,
        roleType: RoleType['assistant'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Пример 1. Из области: Вторая Мировая Война, машиностроение. Во время Второй Мировой войны в СССР делали компактный дизельный двигатель для танков. Основной проблемой при создании такого двигателя была необходимость изготавливать плунжерную пару для двигателя с высокой точностью. Такого оборудования в 1940- годах не было.
        Советские инженеры, не могли добиться требуемой точности изготовления деталей плунжерной пары на оборудовании того времени. Но они из большого числа деталей, сделанных по стандартной технологии, подбирали пару так, что зазор в паре был достаточно маленьким, и обеспечивал эффективную работу двигателя.\\n
        Пример 2. Из области: Машиностроение, подшипники. При изготовлении роликоподшипников на ГПЗ-6 (Екатеринбург, Россия) требовалось обеспечить точность зазора  2 микрона между кольцами и роликами. Но оборудование не обеспечивало такую точность изготовления, как колец, так и роликов. В практике ее и не достигали. Просто кольца и ролики рассортировывали по группам отклонения от номинала, что и обеспечивало требование к точности  при сборке сопряженной паре.\\n
        Пример 3. Из области:Машиностроение, Теплоэнергетика. Чтобы обеспечить высокую точность балансировки турбины, лопатки, устанавливаемые на противоположных сторонах ротора должны быть одного веса, что не удается достичь по условиям изготовления. Решение состоит в том, что  лопатки подбирают парами одного веса и устанавливают на противоположных сторонах турбины.\\n
        Пример 4. Из области: Электроника, изготовление полупроводников. В 1970-1980-х годах, не удавалось изготавливать транзисторы и другие радиоизделия с одинаковыми стабильными характеристиками необходимой точности. Поэтому,  при сборке радиоприборов, в частности каскадов выходных усилителей мощности, высокое качество прибора обеспечивают подбором транзисторов, которые рассортированы по группам, в соответствии со своими параметрами. В прибор вставляли транзистор из нужной группы.\\n
        Пример 5. Из области: Магазины обуви, шоппинг. Обувь в магазинах расставлена по размерам, но каждая пара обуви немного отличается. Поэтому каждый человек подбирает в рамках одного размера ту пару, которая лучше подходит к его ноге.\\n
        Пример 6. Из области: Автомобилестроение, ремонт автомобилей. Жесткость пружин для амортизаторов на автомобилях при изготовлении может существенно различаться в силу технологии. Это может вызвать перекосы при эксплуатации автомобиля. Чтобы избежать перекоса, пружины рассортировывают на две группы и маркируют, а при сборке берут пружины из одной группы и устанавливают на противоположных сторонах.
        `,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${contentInput}`
        },
      },

      {
        isActive: true,
        position: 500,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `PROGNOSIS/ FORECAST STEP`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${constants.approvement}. ${constants.messageStartPart}: ${constants.microstandard}. Нужны два примера из области: \${userText}`
        },
      },
      {
        isActive: true,
        position: 100,
        roleType: RoleType['system'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: ``,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return constants.systemMsgFinal
        },
      },
    ],
  },
  triz_mcstd_selective_choice: {
    isActive: true,
    arrFilt: [],
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
    patternsSrcs: [
      {
        isActive: false,
        position: 0,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: ``,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${contentInput}`
        },
      },
      {
        isActive: true,
        position: 100,
        roleType: RoleType['system'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: ``,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return constants.systemMsgStart
        },
      },
      {
        isActive: true,
        position: 100,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Вторая Мировая Война, машиностроение`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Приведи пример из жизни для следующего правила: ${constants.microstandard}. Нужен пример для: ${contentInput}.`
        },
      },
      {
        isActive: true,
        position: 200,
        roleType: RoleType['assistant'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Во время Второй Мировой войны в СССР делали компактный дизельный двигатель для танков. Основной проблемой при создании такого двигателя была необходимость изготавливать плунжерную пару для двигателя с высокой точностью. Такого оборудования в 1940- годах не было.
        Советские инженеры, не могли добиться требуемой точности изготовления деталей плунжерной пары на оборудовании того времени. Но они из большого числа деталей, сделанных по стандартной технологии, подбирали пару так, что зазор в паре был достаточно маленьким, и обеспечивал эффективную работу двигателя.`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Пример: ${contentInput}`
        },
      },
      {
        isActive: true,
        position: 300,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Машиностроение, подшипники`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${constants.approvement}. ${constants.messageStartPart}: ${constants.microstandard}. Нужен пример для: ${contentInput}.`
        },
      },
      {
        isActive: true,
        position: 400,
        roleType: RoleType['assistant'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `При изготовлении роликоподшипников на ГПЗ-6 (Екатеринбург, Россия) требовалось обеспечить точность зазора  2 микрона между кольцами и роликами. Но оборудование не обеспечивало такую точность изготовления, как колец, так и роликов. В практике ее и не достигали. Просто кольца и ролики рассортировывали по группам отклонения от номинала, что и обеспечивало требование к точности  при сборке сопряженной паре.`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Пример: ${contentInput}`
        },
      },
      {
        isActive: true,
        position: 500,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Машиностроение, Теплоэнергетика`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${constants.approvement}. ${constants.messageStartPart}: ${constants.microstandard}. Нужен пример для: ${contentInput}.`
        },
      },
      {
        isActive: true,
        position: 600,
        roleType: RoleType['assistant'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Чтобы обеспечить высокую точность балансировки турбины, лопатки, устанавливаемые на противоположных сторонах ротора должны быть одного веса, что не удается достичь по условиям изготовления. Решение состоит в том, что  лопатки подбирают парами одного веса и устанавливают на противоположных сторонах турбины.`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Пример: ${contentInput}`
        },
      },
      {
        isActive: true,
        position: 500,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Электроника, изготовление полупроводников`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${constants.approvement}. ${constants.messageStartPart}: ${constants.microstandard}. Нужен пример для: ${contentInput}.`
        },
      },
      {
        isActive: true,
        position: 600,
        roleType: RoleType['assistant'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `В 1970-1980-х годах, не удавалось изготавливать транзисторы и другие радиоизделия с одинаковыми стабильными характеристиками необходимой точности. Поэтому,  при сборке радиоприборов, в частности каскадов выходных усилителей мощности, высокое качество прибора обеспечивают подбором транзисторов, которые рассортированы по группам, в соответствии со своими параметрами. В прибор вставляли транзистор из нужной группы.`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Пример: ${contentInput}`
        },
      },
      {
        isActive: true,
        position: 500,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Магазины обуви, шоппинг`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${constants.approvement}. ${constants.messageStartPart}: ${constants.microstandard}. Нужен пример для: ${contentInput}.`
        },
      },
      {
        isActive: true,
        position: 600,
        roleType: RoleType['assistant'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Обувь в магазинах расставлена по размерам, но каждая пара обуви немного отличается. Поэтому каждый человек подбирает в рамках одного размера ту пару, которая лучше подходит к его ноге`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Пример: ${contentInput}`
        },
      },
      {
        isActive: true,
        position: 500,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Автомобилестроение, ремонт автомобилей`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${constants.approvement}. ${constants.messageStartPart}: ${constants.microstandard}. Нужен пример для: ${contentInput}.`
        },
      },
      {
        isActive: true,
        position: 600,
        roleType: RoleType['assistant'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `Жесткость пружин для амортизаторов на автомобилях при изготовлении может существенно различаться в силу технологии. Это может вызвать перекосы при эксплуатации автомобиля. Чтобы избежать перекоса, пружины рассортировывают на две группы и маркируют, а при сборке берут пружины из одной группы и устанавливают на противоположных сторонах`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `Пример: ${contentInput}`
        },
      },
      {
        isActive: true,
        position: 500,
        roleType: RoleType['user'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: `PROGNOSIS/ FORECAST STEP`,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return `${constants.approvement}. ${constants.messageStartPart}: ${constants.microstandard}. Нужны два примера из области: \${userText}`
        },
      },
      {
        isActive: true,
        position: 100,
        roleType: RoleType['system'],
        contentSrcType: ContentSrcType['text'],
        contentSrc: ``,
        contentResFunc: (contentInput, constants = CONSTANTS) => {
          return constants.systemMsgFinal
        },
      },
    ],
  },
}
