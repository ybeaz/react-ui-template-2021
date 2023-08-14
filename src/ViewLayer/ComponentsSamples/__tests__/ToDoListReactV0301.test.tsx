import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  ToDoListReact,
  ToDoListReactPropsType,
  ListType,
} from '../ToDoListReactV0301'

const list: ListType[] = [
  { id: 'id_0', name: 'list_Item_0' },
  { id: 'id_1', name: 'list_Item_2' },
  { id: 'id_2', name: 'list_Item_3' },
]

const toDoListReactProps: ToDoListReactPropsType = {
  list,
}

let container: any
let inputWrapper: Node
let inputItem: Node
let addItemButton: Node
let clearInputButton: Node
let listWrapper: Node
let listOl: Node
let listLi: NodeListOf<Element>
let listRemove: NodeListOf<Element>

/**
 * @description: Unit Test Suites that implement
 *      - Render Test
 *      - Props Test
 *      - Function Callbacks Test
 *      - Behavior Test
 *      - State Change Test
 *      - Conditional Rendering Test
 *      - Error Handling Test
 *      - Prop Validation Test
 *      - Hooks usage Test
 */
describe('ToDoListReact', () => {
  beforeEach(() => {
    container = render(<ToDoListReact {...toDoListReactProps} />).container
    inputWrapper = container.getElementsByClassName('inputWrapper')[0]
    inputItem = container.getElementsByClassName('inputItem')[0]
    addItemButton = container.getElementsByClassName('addItemButton')[0]
    clearInputButton = container.getElementsByClassName('clearInputButton')[0]
    listWrapper = container.getElementsByClassName('listWrapper')[0]
    listOl = container.getElementsByClassName('listOl')[0]
    listLi = container.getElementsByClassName('listLi')
    listRemove = container.getElementsByClassName('listRemove')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Render Test: ToDoListReact renders all elements with expected content', () => {
    expect(inputWrapper).toBeInTheDocument()
    expect(inputItem).toBeInTheDocument()
    expect(addItemButton).toBeInTheDocument()
    expect(addItemButton).toHaveTextContent('Add')
    expect(clearInputButton).toBeInTheDocument()
    expect(clearInputButton).toHaveTextContent('Clear')

    expect(listWrapper).toBeInTheDocument()
    expect(listOl).toBeInTheDocument()
    expect(listLi.length).toBe(3)
    expect(listRemove.length).toBe(3)
  })

  test('Props Test: displays the correct list items', () => {
    let toDoListReactProps: ToDoListReactPropsType = {
      list: [
        { id: 'id_3', name: 'list_Item_4' },
        { id: 'id_4', name: 'list_Item_5' },
      ],
    }
    container = render(<ToDoListReact {...toDoListReactProps} />).container
    listOl = container.getElementsByClassName('listOl')[0]
    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(2)
    expect(listLi[0]).toHaveTextContent('list_Item_4')
    expect(listLi[1]).toHaveTextContent('list_Item_5')
  })

  // test('Function Callbacks Test: checks function arguments', () => {
  //   const inputEventMock = jest.fn()
  //   const addItemMock = jest.fn()
  //   const clearInputMock = jest.fn()
  //   const removeItemMock = jest.fn()

  //   const handlers = {
  //     inputEvent: inputEventMock,
  //     addItem: addItemMock,
  //     clearInput: clearInputMock,
  //     removeItem: removeItemMock,
  //   }

  //   container = render(<ToDoListReact {...toDoListReactProps} />).container
  //   inputItem = container.getElementsByClassName('inputItem')[0]
  //   addItemButton = container.getElementsByClassName('addItemButton')[0]
  //   clearInputButton = container.getElementsByClassName('clearInputButton')[0]
  //   listRemove = container.getElementsByClassName('listRemove')

  //   fireEvent.change(inputItem, { target: { value: 'New item' } })
  //   expect(inputEventMock).toHaveBeenCalledWith('New item')

  //   fireEvent.click(addItemButton)
  //   expect(addItemMock).toHaveBeenCalledTimes(1)

  //   fireEvent.click(clearInputButton)
  //   expect(clearInputMock).toHaveBeenCalledTimes(1)

  //   fireEvent.click(listRemove[0])
  //   expect(removeItemMock).toHaveBeenCalledWith('id_0')
  // })

  test('Behavior Test and State Change Test: adds and removes items correctly', () => {
    container = render(<ToDoListReact {...toDoListReactProps} />).container
    inputItem = container.getElementsByClassName('inputItem')[0]
    addItemButton = container.getElementsByClassName('addItemButton')[0]
    clearInputButton = container.getElementsByClassName('clearInputButton')[0]
    listWrapper = container.getElementsByClassName('listWrapper')[0]
    listOl = container.getElementsByClassName('listOl')[0]
    listLi = container.getElementsByClassName('listLi')
    listRemove = container.getElementsByClassName('listRemove')

    fireEvent.change(inputItem, { target: { value: 'New item' } })
    fireEvent.click(addItemButton)

    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(4)
    expect(listLi[0]).toHaveTextContent('New item')

    fireEvent.click(listRemove[0])
    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(3)
  })

  test('Conditional Rendering Test: displays the correct list items conditionally', () => {
    let toDoListReactProps: ToDoListReactPropsType = {
      list: [],
    }
    container = render(<ToDoListReact {...toDoListReactProps} />).container
    listWrapper = container.getElementsByClassName('listWrapper')[0]
    listOl = container.getElementsByClassName('listOl')[0]
    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(0)
  })

  test('Error Handling Test and Prop Validation Test: displays default list items if the list is not an array', () => {
    let toDoListReactProps: ToDoListReactPropsType = {
      // @ts-ignore
      list: 'not an array',
    }

    // @ts-ignore
    container = render(<ToDoListReact {...toDoListReactProps} />).container
    listWrapper = container.getElementsByClassName('listWrapper')[0]
    listOl = container.getElementsByClassName('listOl')[0]
    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(0)
  })

  test('Hooks usage Test: checks values useState and useMemo are called with and number of times they are called', () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    const useMemoMock = jest.fn((fn: any) => fn())
    jest.spyOn(React, 'useMemo').mockImplementation(useMemoMock)

    container = render(<ToDoListReact {...toDoListReactProps} />).container
    inputItem = container.getElementsByClassName('inputItem')[0]
    addItemButton = container.getElementsByClassName('addItemButton')[0]
    clearInputButton = container.getElementsByClassName('clearInputButton')[0]
    listRemove = container.getElementsByClassName('listRemove')

    fireEvent.change(inputItem, { target: { value: 'New item' } })
    expect(setStateMock).toHaveBeenCalledWith('New item')

    fireEvent.click(addItemButton)
    expect(setStateMock).toHaveBeenCalledTimes(3)

    fireEvent.click(clearInputButton)
    expect(setStateMock).toHaveBeenCalledTimes(4)

    fireEvent.click(listRemove[0])
    expect(setStateMock).toHaveBeenCalledTimes(5)

    expect(useMemoMock).toHaveBeenCalledTimes(1)
  })
})
