export const CLICK_ADD_TODO = (store, data) => {
  const { todoList } = store

  const todoListNext = [...todoList, data]

  const storeNext = { ...store, todoList: todoListNext }

  return storeNext
}
