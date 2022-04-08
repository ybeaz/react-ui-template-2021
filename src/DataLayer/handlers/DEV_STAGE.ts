import { store } from '../store'
import { IActionEvent } from '../../Interfaces/IActionEvent'
import { DICTIONARY } from '../../Constants/dictionary.const'

const { getState } = store

export const DEV_STAGE: IActionEvent = (event, data) => {
  const {
    globalVars: { language },
  } = getState()
  const message = DICTIONARY.weAreWorkingOnThis[language]
  alert(message)
}
