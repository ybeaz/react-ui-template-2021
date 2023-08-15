import React, { ReactElement, useState, useMemo } from 'react'
// import { nanoid } from 'nanoid'
import { v4 as uuidv4 } from 'uuid'

const listDefault: ListType[] = [
  { id: 'id_0', name: 'list_Item_0' },
  { id: 'id_1', name: 'list_Item_2' },
  { id: 'id_2', name: 'list_Item_3' },
]

export const handlersDefault: Record<string, (handlersProps: any) => void> = {
  inputEvent({ data, setInputValueState }) {
    setInputValueState(data)
  },
  addItem({
    uuidv4,
    listState,
    setListState,
    inputValueState,
    setInputValueState,
  }) {
    if (!inputValueState) return
    const listStateNext = [
      { id: uuidv4(), name: inputValueState },
      ...listState,
    ]
    setListState(listStateNext)
    setInputValueState('')
  },
  clearInput({ setInputValueState }) {
    setInputValueState('')
  },
  removeItem({ data, listState, setListState }) {
    const listStateNext = listState.filter((list: ListType) => list.id !== data)
    setListState(listStateNext)
  },
}

export type ListType = { id: string; name: string }

export type ToDoListReactPropsType = {
  list?: ListType[]
  handlers?: Record<string, (handlersProps: any) => void>
}

/**
 * @description React functional component with an internal state to
        - display a numbered list of tasks from the component props
        - keep the list of tasks in the state of the component
        - display an input field for entering the name of the new task
        - display a button labeled "Add" next to the input field
        - ensure that clicking on the "Add" button adds an item from the input field on the top of the list of tasks
        - prevent adding an item from the input field on the top of the list of tasks if the input field is empty
        - make sure that when you click on the "Add" button, the input field is cleared
        - display a button labeled "Clear" next to the Add button if input field value is not empty (non-zero)
        - ensure that when you click on the "Clear" button, the input field is cleared
        - display buttons labeled "Remove" in the list of tasks next to the name of each task
        - provide that clicking on the "Remove" button removes the task in the corresponding line from the component view
        - ensure that clicking on the "Remove" button removes that task in the corresponding line from the state of the component
 * @props type ToDoListReactPropsType = {
            list?: ListType[]
            handlers?: Record<string, (handlersProps: any) => void>
          }
 * @import import { ToDoListReact } from '../ComponentsSamples/ToDoListReact'
 */
export const ToDoListReact: React.FunctionComponent<ToDoListReactPropsType> = ({
  list: listIn = listDefault,
  handlers = handlersDefault,
}: ToDoListReactPropsType) => {
  let list: ListType[] = []
  if (Array.isArray(listIn)) list = listIn

  const [listState, setListState] = useState(list)
  const [inputValueState, setInputValueState] = useState('')

  const getRenderedList = (listInput: ListType[]): ReactElement => {
    const liItems = listInput.map((listItem: ListType) => (
      <li key={listItem.id} className='listLi'>
        {listItem.name}
        <button
          className='removeItem'
          onClick={() =>
            handlers.removeItem({ data: listItem.id, listState, setListState })
          }
        >
          Remove
        </button>
      </li>
    ))

    return <ol className='listOl'>{liItems}</ol>
  }

  const renderedList = useMemo(() => getRenderedList(listState), [listState])

  return (
    <div className='ToDoListReact'>
      <div className='inputWrapper'>
        <input
          className='inputItem'
          onChange={(event: any) =>
            handlers.inputEvent({
              data: event.target.value,
              setInputValueState,
            })
          }
          value={inputValueState}
        />
        <button
          className='addItemButton'
          onClick={() =>
            handlers.addItem({
              uuidv4,
              listState,
              setListState,
              inputValueState,
              setInputValueState,
            })
          }
        >
          Add
        </button>
        {inputValueState ? (
          <button
            className='clearInputButton'
            onClick={() => handlers.clearInput({ setInputValueState })}
          >
            Clear
          </button>
        ) : null}
      </div>
      <div className='listWrapper'>{renderedList}</div>
    </div>
  )
}
