import { createStore, Store } from 'redux'

import { indexReducer } from './indexReducer'

const configureStore = (indexReducer2): Store => {
  const store2 = createStore(indexReducer2)
  return store2
}

export const store: Store = configureStore(indexReducer)
