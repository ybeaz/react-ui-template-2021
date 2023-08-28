import { consoler } from '../../tools/consoler'
import { botFamilyConfig } from './botFamilyConfig'
import { getRunBotFamilyScenarioAsync } from '../shared/getRunBotFamilyScenarioAsync'

/**
 * @description Function to runbotFamily@triz
 * @run ts-node botBuilding/2023-08-27-botFamily@contextual/runBotFamilyScenario.ts
 */
getRunBotFamilyScenarioAsync(
  { botFamilyConfig, dirname: __dirname },
  { printRes: true }
)
