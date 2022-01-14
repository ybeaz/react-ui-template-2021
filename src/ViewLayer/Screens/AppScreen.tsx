import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IStore } from '../../Interfaces/IStore'

import {
  CLEAR_ADD_TODO,
  INPUT_ADD_TODO,
  CLICK_ADD_TODO,
} from '../../DataLayer/index.actions'

import './AppScreen.less'

export const AppScreen = () => {
  const store: IStore = useSelector((store2: IStore) => store2)
  const { todoList, todoInput } = store
  const dispatch: any = useDispatch()

  const handleEvents = actionEvent => {
    const { typeEvent, data } = actionEvent

    const output = {
      CLEAR_ADD_TODO() {
        dispatch(CLEAR_ADD_TODO())
      },
      CLICK_ADD_TODO() {
        dispatch(CLICK_ADD_TODO(todoInput))
        dispatch(INPUT_ADD_TODO(''))
      },
      INPUT_ADD_TODO() {
        dispatch(INPUT_ADD_TODO(data))
      },
    }

    output[typeEvent]()
  }

  const getTodoList = todoList2 => {
    return todoList2.map(item => {
      return <li>{item}</li>
    })
  }

  return (
    <div className='AppScreen'>
      <h1>Hello in a brand new Todo App</h1>
      <div className='_inputBlock'>
        {' '}
        <input
          onChange={event =>
            handleEvents({
              typeEvent: 'INPUT_ADD_TODO',
              data: event.target.value,
            })
          }
          value={todoInput}
        />
        <button
          onClick={event =>
            handleEvents({
              typeEvent: 'CLICK_ADD_TODO',
            })
          }
        >
          OK
        </button>
      </div>
      <button onClick={event => handleEvents({ typeEvent: 'CLEAR_ADD_TODO' })}>
        CLEAR
      </button>
      <div>
        <ul>{getTodoList(todoList)}</ul>
      </div>
    </div>
  )
}
