import { getDetectedEnv } from '../Shared/getDetectedEnv'

const envType: string = getDetectedEnv()

/** @description Flag template */
export const isTemplate = (envTypeIn = envType) => false
