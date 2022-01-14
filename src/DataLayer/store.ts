import { createStore, Store } from 'redux'
import { indexReducer, IIndexReducer } from './index.reducer'

interface IConfigureStore {
  (indexReducer: IIndexReducer): Store
}

const configureStore: IConfigureStore = indexReducer2 => {
  const store2: Store = createStore(indexReducer2)
  return store2
}

export const store = configureStore(indexReducer)
