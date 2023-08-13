import { nanoid } from 'nanoid'
import React, { ReactElement, useState, useMemo } from 'react'

export type ListType = { id: string; name: string }

export type ToDoListReactPropsType = {
  list?: ListType[]
}

const listIn: ListType[] = [
  { id: 'id_0', name: 'list_Item_0' },
  { id: 'id_1', name: 'list_Item_2' },
  { id: 'id_2', name: 'list_Item_3' },
]

/**
 * @description Component Functional component on ReactJS to
 *      - take a list of tasks with default list values as props
 *      - display a numbered list of tasks from the list of tasks
 *      - input a name of the new task
 *      - add a new task to the list using useState
 *      - remove a task using useState
 * @import import { ToDoListReact } from '../ComponentsSamples/ToDoListReactV0301'
 */
export const ToDoListReact: React.FC<ToDoListReactPropsType> = ({
  list = listIn,
}: ToDoListReactPropsType) => {
  const [listState, setListState] = useState(list)
  const [inputValueState, setInputValueState] = useState('')

  const getRenderedList = (listInput: ListType[]): ReactElement => {
    const liItems = listInput.map((listItem: ListType) => (
      <li key={listItem.id} className='listLi'>
        {listItem.name}
        <button
          className='listRemove'
          onClick={() => handlers.removeItem(listItem.id)}
        >
          Remove
        </button>
      </li>
    ))

    return <ol className='listOl'>{liItems}</ol>
  }

  const renderedList = useMemo(() => getRenderedList(listState), [listState])

  const handlers: Record<string, (data?: any) => void> = {
    inputEvent(data) {
      setInputValueState(data)
    },
    addItem() {
      const listStateNext = [
        { id: nanoid(), name: inputValueState },
        ...listState,
      ]
      setListState(listStateNext)
      setInputValueState('')
    },
    clearInput() {
      setInputValueState('')
    },
    removeItem(data) {
      const listStateNext = listState.filter(
        (list: ListType) => list.id !== data
      )
      setListState(listStateNext)
    },
  }

  return (
    <div className='ToDoListReact'>
      <div className='inputWrapper'>
        <input
          className='inputItem'
          onChange={(event: any) => handlers.inputEvent(event.target.value)}
          value={inputValueState}
        />
        <button className='addItemButton' onClick={() => handlers.addItem()}>
          Add
        </button>
        <button
          className='clearInputButton'
          onClick={() => handlers.clearInput()}
        >
          Clear
        </button>
      </div>
      <div className='listWrapper'>{renderedList}</div>
    </div>
  )
}
