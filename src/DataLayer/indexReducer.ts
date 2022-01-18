import { storeDefault, IStoreDefault } from './storeDefault'

interface IIndexReducer {
  (store: IStoreDefault, action: { type: string; data?: any }): IStoreDefault
}

export const indexReducer: IIndexReducer = (
  store = storeDefault,
  action = { type: 'DEFAULT' }
) => {
  const { type, data } = action
  const output = {
    INPUT_TODO(data2: string | number) {
      return { ...store, todoInput: data2 }
    },
    ADD_TODO(data3: string | number) {
      const { todoList } = store
      const todoListNext = [...todoList, data3]

      return { ...store, todoList: todoListNext }
    },
    CLEAR_TODO() {
      return { ...store, todoList: [] }
    },
    DEFAULT() {
      return store
    },
  }

  return output[type] ? output[type](data) : output['DEFAULT']()
}
