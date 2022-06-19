import { store } from '../store'
import { IActionEvent } from '../../Interfaces/IActionEvent'
import { actionSync, actionAsync } from '../../DataLayer/index.action'

const { dispatch, getState } = store

export const TEMPLATE: IActionEvent = (event, data) => {
  dispatch(
    actionAsync.TEMPLATE_ASYNC.REQUEST({
      id: data.id,
    })
  )
}
