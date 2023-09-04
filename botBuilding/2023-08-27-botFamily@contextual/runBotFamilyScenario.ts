import { consoler } from '../../tools/consoler'
import { botFamilyConfigDefault } from './botFamilyConfigDefault'
import { getRunBotFamilyScenarioAsync } from '../shared/getRunBotFamilyScenarioAsync'

const BOT_FAMILY_CONFIG: Record<string, any> = {
  default: botFamilyConfigDefault,
}

/**
 * @description Function to runbotFamily@triz
 * @run ts-node botBuilding/2023-08-27-botFamily@contextual/runBotFamilyScenario.ts
 */
getRunBotFamilyScenarioAsync(
  { botFamilyConfig: BOT_FAMILY_CONFIG['default'], dirname: __dirname },
  { printRes: true }
)
