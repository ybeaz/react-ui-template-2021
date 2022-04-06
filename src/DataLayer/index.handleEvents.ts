import { IHandleEventsInterface } from '../Interfaces/IHandleEventsInterface'
import { IActionEvent } from '../Interfaces/IActionEvent'

import { TEMPLATE } from './handlers/TEMPLATE'
import { SET_MODAL_FRAMES } from './handlers/SET_MODAL_FRAMES'
import { STOP_PROPAGATION } from './handlers/STOP_PROPAGATION'

export const handleEvents: IHandleEventsInterface = (event, props): void => {
  const { type: typeStore, typeEvent, data } = props
  const type = typeStore ? typeStore : typeEvent

  const output: Record<string, IActionEvent> = {
    TEMPLATE,
    SET_MODAL_FRAMES,
    STOP_PROPAGATION,
  }

  // @ts-ignore
  output[type] && output[type](event, data)
}
