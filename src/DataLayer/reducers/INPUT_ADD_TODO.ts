export const INPUT_ADD_TODO = (store, data) => {
  const storeNext = { ...store, todoInput: data }
  return storeNext
}
