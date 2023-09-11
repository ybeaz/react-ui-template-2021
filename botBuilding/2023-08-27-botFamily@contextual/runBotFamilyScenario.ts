import yargs from 'yargs'

import { consoler } from '../../tools/consoler'
import { botFamilyConfigDefault } from './botFamilyConfigDefault'
import { botFamilyConfigCustomCorrector } from './botFamilyConfigCustomCorrector'
import { botFamilyConfigCustomIlyaFrank } from './botFamilyConfigCustomIlyaFrank'
import { botFamilyConfigCustomKeyPhrases } from './botFamilyConfigCustomKeyPhrases'
import { botFamilyConfigPersonaPoets } from './botFamilyConfigPersonaPoets'
import { botFamilyConfigPersonaPoliticians } from './botFamilyConfigPersonaPoliticians'

import { getRunBotFamilyScenarioAsync } from '../shared/getRunBotFamilyScenarioAsync'

/* Define the command-line options using yargs */
const options: any = yargs.option('conf', {
  alias: 'c', // Alias for the -c option (use -c instead of --conf)
  describe: 'config name',
  type: 'string',
}).argv

const conf = options.conf

const BOT_FAMILY_CONFIG: Record<string, any> = {
  politicians: botFamilyConfigPersonaPoliticians,
  poets: botFamilyConfigPersonaPoets,
  kph: botFamilyConfigCustomKeyPhrases,
  ilf: botFamilyConfigCustomIlyaFrank,
  enc: botFamilyConfigCustomCorrector,
  default: botFamilyConfigDefault,
}

consoler('runBotFamilyScenario [29]', 'config', conf)

if (!conf || BOT_FAMILY_CONFIG[conf]) {
  let botFamilyConfig = conf
    ? BOT_FAMILY_CONFIG[conf]
    : BOT_FAMILY_CONFIG['default']

  /**
   * @description Function to runbotFamily@triz
   * @run ts-node botBuilding/2023-08-27-botFamily@contextual/runBotFamilyScenario.ts -c default
   */
  getRunBotFamilyScenarioAsync(
    { botFamilyConfig, dirname: __dirname },
    { printRes: true }
  )
} else {
  consoler(
    'runBotFamilyScenario [38]',
    'Error',
    `Please, check the option. You have used ${conf}`
  )
}
