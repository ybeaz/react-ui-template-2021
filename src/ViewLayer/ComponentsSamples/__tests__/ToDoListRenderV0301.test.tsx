import * as React from 'react'

import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  ToDoListReact,
  ToDoListReactPropsType,
  ListType,
  handlersDefault,
} from '../ToDoListReactV0301'
import { timeout } from '../../../Shared/timeout'

const setStateMock = jest.fn()
const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
jest.mock('react', () => {
  const actualReact = jest.requireActual('react')
  return {
    ...actualReact,
    useState: useStateMock,
  }
})

const list: ListType[] = [
  { id: 'id_0', name: 'list_Item_0' },
  { id: 'id_1', name: 'list_Item_2' },
  { id: 'id_2', name: 'list_Item_3' },
]

const toDoListReactProps: ToDoListReactPropsType = {
  list,
}

let useStateSpy: any

/**
 @function type jest.Describe
 @description Unit Test Suites to implement
  - Render Test
  - Props Test
 */
describe('ToDoListReact', () => {
  beforeEach(() => {
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(jest.requireActual('react').useState)
  })

  afterEach(() => {
    useStateSpy.mockRestore()
    jest.clearAllMocks()
  })

  test('Render Test: checks rendering all elements with expected content', () => {
    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const inputWrapper = container.getElementsByClassName('inputWrapper')[0]
    const inputItem = container.getElementsByClassName('inputItem')[0]
    const addItemButton = container.getElementsByClassName('addItemButton')[0]
    const listWrapper = container.getElementsByClassName('listWrapper')[0]
    const listOl = container.getElementsByClassName('listOl')[0]
    const listLi = container.getElementsByClassName('listLi')
    const removeItems = container.getElementsByClassName('removeItem')

    expect(inputWrapper).toBeInTheDocument()
    expect(inputItem).toBeInTheDocument()
    expect(addItemButton).toBeInTheDocument()
    expect(addItemButton).toHaveTextContent('Add')

    expect(listWrapper).toBeInTheDocument()
    expect(listOl).toBeInTheDocument()
    expect(listLi.length).toBe(3)
    expect(removeItems.length).toBe(3)
  })

  test('Props Test: tests display the correct values from props', () => {
    let toDoListReactProps: ToDoListReactPropsType = {
      list: [
        { id: 'id_3', name: 'list_Item_4' },
        { id: 'id_4', name: 'list_Item_5' },
      ],
    }

    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const listLi = container.getElementsByClassName('listLi')

    expect(listLi.length).toBe(2)
    expect(listLi[0]).toHaveTextContent('list_Item_4')
    expect(listLi[1]).toHaveTextContent('list_Item_5')
  })
})
