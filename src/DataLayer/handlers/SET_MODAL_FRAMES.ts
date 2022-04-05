import { store } from '../store'
import { IActionEvent } from '../../Interfaces/IActionEvent'
import { actionSync } from '../../DataLayer/index.action'

const { dispatch } = store

export const SET_MODAL_FRAMES: IActionEvent = (event, data) => {
  dispatch(actionSync.SET_MODAL_FRAMES(data))
}
