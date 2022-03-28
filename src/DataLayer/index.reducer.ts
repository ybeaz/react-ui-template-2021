import { IRootStore } from '../Interfaces/IRootStore'
import { IAction } from '../Interfaces/IAction'

import { TEMPLATE } from './reducers/TEMPLATE'
import { TOGGLE_LOADER_OVERLAY } from './reducers/TOGGLE_LOADER_OVERLAY'

import { rootStoreDefault } from './rootStoreDefault'

export interface IIndexReducer {
  (store: IRootStore, action: IAction): IRootStore
}

export const indexReducer: IIndexReducer = (
  store = rootStoreDefault,
  action = { type: 'DEFAULT' }
) => {
  const { type, data } = action

  const output = {
    TEMPLATE,
    TOGGLE_LOADER_OVERLAY,
  }

  // @ts-ignore
  return output[type] ? output[type](store, data) : store
}
