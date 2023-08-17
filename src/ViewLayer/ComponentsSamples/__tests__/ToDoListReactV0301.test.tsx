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
 TypeDoc https://typedoc.org
 @function type jest.Describe
 @description Unit Test Suites to implement
  - Render Test
  - Props Test
  - Props Callbacks Test for arguments
  - Props Callbacks Test for calls number
  - Behavior Test
  - Conditional Rendering Test
  - Error Handling Test and Prop Validation Test
  - Hooks Usage Test for arguments
  - Hooks Usage Test for calls number
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

  test('Props Callbacks Test for arguments: checks values of props of calls', () => {
    const inputEventSpy = jest.spyOn(handlersDefault, 'inputEvent')
    const addItemSpy = jest.spyOn(handlersDefault, 'addItem')
    const clearInputSpy = jest.spyOn(handlersDefault, 'clearInput')
    const removeItemSpy = jest.spyOn(handlersDefault, 'removeItem')

    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const inputItem = container.getElementsByClassName('inputItem')[0]
    const addItemButton = container.getElementsByClassName('addItemButton')[0]
    const removeItem = container.getElementsByClassName('removeItem')[0]

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

    inputEventSpy.mockRestore()
    addItemSpy.mockRestore()
    clearInputSpy.mockRestore()
    removeItemSpy.mockRestore()
  })

  test('Props Callbacks Test for calls number: counts calls', () => {
    const inputEventSpy = jest.spyOn(handlersDefault, 'inputEvent')
    const addItemSpy = jest.spyOn(handlersDefault, 'addItem')
    const removeItemSpy = jest.spyOn(handlersDefault, 'removeItem')

    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const inputItem = container.getElementsByClassName('inputItem')[0]
    const addItemButton = container.getElementsByClassName('addItemButton')[0]
    const removeItem = container.getElementsByClassName('removeItem')[0]

    fireEvent.change(inputItem, { target: { value: 'New item' } })
    fireEvent.change(inputItem, { target: { value: 'New item2' } })
    fireEvent.change(inputItem, { target: { value: 'New item3' } })
    expect(inputEventSpy).toHaveBeenCalledTimes(3)

    fireEvent.click(addItemButton)
    fireEvent.click(addItemButton)
    expect(addItemSpy).toHaveBeenCalledTimes(2)

    fireEvent.click(removeItem)
    expect(removeItemSpy).toHaveBeenCalledTimes(1)

    inputEventSpy.mockRestore()
    addItemSpy.mockRestore()
    removeItemSpy.mockRestore()
  })

  test('Behavior Test', () => {
    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const inputItem = container.getElementsByClassName('inputItem')[0]
    const addItemButton = container.getElementsByClassName('addItemButton')[0]
    let clearInputButton =
      container.getElementsByClassName('clearInputButton')[0]
    let listLi = container.getElementsByClassName('listLi')
    const removeItem = container.getElementsByClassName('removeItem')[0]

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

  test('Conditional Rendering Test', () => {
    let toDoListReactProps: ToDoListReactPropsType = {
      list: [],
    }
    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(0)
  })

  test('Error Handling Test and Prop Validation Test', () => {
    let toDoListReactProps: ToDoListReactPropsType = {
      // @ts-expect-error
      list: 'not an array',
    }

    const container = render(
      // @ts-expect-error
      <ToDoListReact {...toDoListReactProps} unexpectedVar={'unexpectedVar'} />
    ).container
    const listLi = container.getElementsByClassName('listLi')
    expect(listLi.length).toBe(0)
  })

  test('Hooks Usage Test for arguments: checks values of props of calls', async () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(useStateMock)

    const useMemoMock = jest.fn((fn: any) => fn())
    const useMemoSpy = jest.spyOn(React, 'useMemo')
    useMemoSpy.mockImplementation(useMemoMock)

    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const inputItem = container.getElementsByClassName('inputItem')[0]

    fireEvent.change(inputItem, { target: { value: 'New item4' } })
    expect(setStateMock).toHaveBeenCalledWith('New item4')

    useMemoSpy.mockRestore()
  })

  test('Hooks Usage Test for calls number: counts calls', async () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(useStateMock)

    const useMemoMock = jest.fn((fn: any) => fn())
    const useMemoSpy = jest.spyOn(React, 'useMemo')
    useMemoSpy.mockImplementation(useMemoMock)

    const container = render(
      <ToDoListReact {...toDoListReactProps} />
    ).container
    const inputItem = container.getElementsByClassName('inputItem')[0]
    const addItemButton = container.getElementsByClassName('addItemButton')[0]
    const removeItem = container.getElementsByClassName('removeItem')[0]

    fireEvent.change(inputItem, { target: { value: 'New item4' } })
    fireEvent.click(addItemButton)
    fireEvent.change(inputItem, { target: { value: 'New item4' } })
    fireEvent.click(addItemButton)
    expect(setStateMock).toHaveBeenCalledTimes(2)

    fireEvent.click(removeItem)
    expect(setStateMock).toHaveBeenCalledTimes(3)

    expect(useMemoMock).toHaveBeenCalledTimes(1)

    useMemoSpy.mockRestore()
  })
})
