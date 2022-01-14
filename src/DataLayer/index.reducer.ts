import { IStore } from '../Interfaces/IStore'
import { storeDefault } from './storeDefault'

import { CLEAR_ADD_TODO } from './reducers/CLEAR_ADD_TODO'
import { CLICK_ADD_TODO } from './reducers/CLICK_ADD_TODO'
import { INPUT_ADD_TODO } from './reducers/INPUT_ADD_TODO'

export interface IIndexReducer {
  (store: IStore, action: any): any
}

export const indexReducer: IIndexReducer = (
  store = storeDefault,
  action = { type: 'DEFAULT' }
) => {
  const { type, data } = action

  const output = {
    CLEAR_ADD_TODO,
    CLICK_ADD_TODO,
    INPUT_ADD_TODO,
  }

  return output[type] ? output[type](store, data) : store
}
