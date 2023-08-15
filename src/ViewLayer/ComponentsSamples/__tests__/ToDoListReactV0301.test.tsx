import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  ToDoListReact,
  ToDoListReactPropsType,
  ListType,
  handlersDefault,
} from '../ToDoListReactV0301'
import { timeout } from '../../../Shared/timeout'

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
let removeItems: NodeListOf<Element>
let removeItem: Node

/**
 * @description: Unit Test Suites that implement
       - Render Test
       - Props Test
       - Handlers Callbacks Test
       - Behavior Test
       - State Change Test
       - Conditional Rendering Test
       - Error Handling Test
       - Prop Validation Test
       - Hooks usage Test
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
    removeItems = container.getElementsByClassName('removeItem')
    removeItem = container.getElementsByClassName('removeItem')[0]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Render Test: ToDoListReact renders all elements with expected content', () => {
    expect(inputWrapper).toBeInTheDocument()
    expect(inputItem).toBeInTheDocument()
    expect(addItemButton).toBeInTheDocument()
    expect(addItemButton).toHaveTextContent('Add')

    expect(listWrapper).toBeInTheDocument()
    expect(listOl).toBeInTheDocument()
    expect(listLi.length).toBe(3)
    expect(removeItems.length).toBe(3)
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

  test('Handlers Callbacks Test: checks values handlers are called with', () => {
    const inputEventSpy = jest.spyOn(handlersDefault, 'inputEvent')
    const addItemSpy = jest.spyOn(handlersDefault, 'addItem')
    const clearInputSpy = jest.spyOn(handlersDefault, 'clearInput')
    const removeItemSpy = jest.spyOn(handlersDefault, 'removeItem')

    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    const useStateMockSpy = jest
      .spyOn(React, 'useState')
      .mockImplementation(useStateMock)

    container = render(<ToDoListReact {...toDoListReactProps} />).container
    inputItem = container.getElementsByClassName('inputItem')[0]
    addItemButton = container.getElementsByClassName('addItemButton')[0]
    removeItem = container.getElementsByClassName('removeItem')[0]

    fireEvent.change(inputItem, { target: { value: 'New item' } })
    expect(inputEventSpy).toHaveBeenCalledWith({
      data: 'New item',
      setInputValueState: expect.anything(),
    })

    fireEvent.click(addItemButton)
    expect(addItemSpy).toHaveBeenCalledWith({
      uuidv4: expect.anything(),
      listState: expect.anything(),
      setListState: expect.anything(),
      inputValueState: expect.anything(),
      setInputValueState: expect.anything(),
    })

    fireEvent.click(removeItem)
    expect(removeItemSpy).toHaveBeenCalledWith({
      data: 'id_0',
      listState: expect.anything(),
      setListState: expect.anything(),
    })
    useStateMockSpy.mockRestore()
  })

  test('Handlers Callbacks Test: checks number of times they are called', () => {
    const inputEventSpy = jest.spyOn(handlersDefault, 'inputEvent')
    const addItemSpy = jest.spyOn(handlersDefault, 'addItem')
    const removeItemSpy = jest.spyOn(handlersDefault, 'removeItem')

    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    const useStateMockSpy = jest
      .spyOn(React, 'useState')
      .mockImplementation(useStateMock)

    container = render(<ToDoListReact {...toDoListReactProps} />).container
    inputItem = container.getElementsByClassName('inputItem')[0]
    addItemButton = container.getElementsByClassName('addItemButton')[0]
    removeItem = container.getElementsByClassName('removeItem')[0]

    fireEvent.change(inputItem, { target: { value: 'New item' } })
    fireEvent.change(inputItem, { target: { value: 'New item' } })
    fireEvent.change(inputItem, { target: { value: 'New item' } })
    expect(inputEventSpy).toHaveBeenCalledTimes(3)

    fireEvent.click(addItemButton)
    fireEvent.click(addItemButton)
    expect(addItemSpy).toHaveBeenCalledTimes(2)

    fireEvent.click(removeItem)
    expect(removeItemSpy).toHaveBeenCalledTimes(1)

    useStateMockSpy.mockRestore()
  })

  test('Behavior Test and State Change Test: adds and removes items correctly', () => {
    container = render(<ToDoListReact {...toDoListReactProps} />).container
    inputItem = container.getElementsByClassName('inputItem')[0]
    addItemButton = container.getElementsByClassName('addItemButton')[0]
    listWrapper = container.getElementsByClassName('listWrapper')[0]
    listOl = container.getElementsByClassName('listOl')[0]
    listLi = container.getElementsByClassName('listLi')
    removeItem = container.getElementsByClassName('removeItem')[0]

    fireEvent.change(inputItem, { target: { value: 'New item' } })
    fireEvent.click(addItemButton)

    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(4)
    expect(listLi[0]).toHaveTextContent('New item')

    fireEvent.click(removeItem)
    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(3)

    fireEvent.change(inputItem, { target: { value: 'New item 2' } })
    clearInputButton = container.getElementsByClassName('clearInputButton')[0]
    fireEvent.click(clearInputButton)
    fireEvent.click(addItemButton)
    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(3)

    fireEvent.change(inputItem, { target: { value: 'New item 3' } })
    fireEvent.click(addItemButton)
    fireEvent.change(inputItem, { target: { value: 'New item 4' } })
    fireEvent.click(addItemButton)
    listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(5)
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

  test('Hooks usage Test: checks values useState and useMemo are called with and number of times they are called', async () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    const useStateMockSpy = jest
      .spyOn(React, 'useState')
      .mockImplementation(useStateMock)

    const useMemoMock = jest.fn((fn: any) => fn())
    const useMemoMockSpy = jest
      .spyOn(React, 'useMemo')
      .mockImplementation(useMemoMock)

    container = render(<ToDoListReact {...toDoListReactProps} />).container
    inputItem = container.getElementsByClassName('inputItem')[0]
    addItemButton = container.getElementsByClassName('addItemButton')[0]
    clearInputButton = container.getElementsByClassName('clearInputButton')[0]
    removeItem = container.getElementsByClassName('removeItem')[0]

    fireEvent.change(inputItem, { target: { value: 'New item' } })
    expect(setStateMock).toHaveBeenCalledWith('New item')

    fireEvent.click(addItemButton)
    expect(setStateMock).toHaveBeenCalledTimes(1)

    fireEvent.click(removeItem)
    expect(setStateMock).toHaveBeenCalledTimes(2)

    expect(useMemoMock).toHaveBeenCalledTimes(1)

    useStateMockSpy.mockRestore()
    useMemoMockSpy.mockRestore()
  })
})
