import { IActionEvent } from '../../Interfaces/IActionEvent'
export const STOP_PROPAGATION: IActionEvent = (event, data) => {
  event.stopPropagation()
}
