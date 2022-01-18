import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './AppScreen.css'

import { IStoreDefault } from '../../DataLayer/storeDefault'

interface IHandleevents {
  (event: any, action: { type: string; data?: any }): void
}

interface IGetTodoList {
  (todoList2: (string | number)[]): React.ReactElement
}

export const AppScreen: React.FunctionComponent = () => {
  const dispatch = useDispatch()
  const { todoInput, todoList } = useSelector((store2: IStoreDefault) => store2)

  const handleEvents: IHandleevents = (event, action) => {
    const { type, data } = action

    const output = {
      INPUT_TODO(data2: string | number) {
        dispatch({ type: 'INPUT_TODO', data: data2 })
      },
      ADD_TODO() {
        dispatch({ type: 'ADD_TODO', data: todoInput })
        dispatch({ type: 'INPUT_TODO', data: '' })
      },
      CLEAR_TODO() {
        dispatch({ type: 'CLEAR_TODO' })
      },
      DEFAULT() {
        console.info('AppScreen [26]', 'you fired unknown event action')
      },
    }

    output[type] ? output[type](data) : output['DEFAULT']()
  }

  const getTodoList: IGetTodoList = todoList2 => {
    const list = todoList2.map((item: string | number, i: number) => (
      <li key={`key-${i}`}>{item}</li>
    ))

    return <ul>{list}</ul>
  }

  return (
    <div className='AppScreen'>
      <h1>You are welcome to a brand new React app</h1>
      <div className='__inputBlock'>
        <input
          onChange={event =>
            handleEvents(event, {
              type: 'INPUT_TODO',
              data: event.target.value,
            })
          }
          value={todoInput}
        />
        <button onClick={event => handleEvents(event, { type: 'ADD_TODO' })}>
          OK
        </button>
      </div>
      <button onClick={event => handleEvents(event, { type: 'CLEAR_TODO' })}>
        Clear
      </button>
      <div>{getTodoList(todoList)}</div>
    </div>
  )
}
