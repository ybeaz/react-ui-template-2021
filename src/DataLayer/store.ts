import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { indexReducer, IIndexReducer } from './index.reducer'
import indexSaga from './index.saga'

interface IConfigureStore {
  (indexReducer: IIndexReducer): Store
}

// @ts-ignore
const configureStore: IConfigureStore = indexReducer2 => {
  const sagaMiddleware = createSagaMiddleware()
  const middlewares: any[] = [thunk, sagaMiddleware]
  const store2 = createStore(
    // @ts-ignore
    indexReducer2,
    composeWithDevTools(applyMiddleware(...middlewares))
  )
  sagaMiddleware.run(indexSaga)
  return store2
}

export const store = configureStore(indexReducer)
