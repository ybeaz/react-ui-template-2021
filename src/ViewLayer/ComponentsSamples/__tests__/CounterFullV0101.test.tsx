import * as React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import {
  CounterReact,
  CounterReactPropsType,
  handlersDefault,
} from '../CounterReactV0101'

const setStateMock = jest.fn()
const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
jest.mock('react', () => {
  const actualReact = jest.requireActual('react')
  return {
    ...actualReact,
    useState: useStateMock,
  }
})

const increment = (count: number, func: any) => {
  func(count + 1)
}

const decrement = (count: number, func: any) => {
  func(count - 1)
}

const counterReactProps: CounterReactPropsType = {
  title: 'Counter component',
  increment,
  decrement,
}

let useStateSpy: any

/**
 @function type jest.Describe
 @description Unit Test Suites to implement
  - Render Test
  - Props Test
  - Props Callbacks Test for arguments
  - Props Callbacks Test for calls number
  - Props Callbacks 2 Test for arguments
  - Props Callbacks 2 Test for calls number
  - Behavior Test
  - Conditional Rendering Test
  - Error Handling Test and Prop Validation Test
  - Hooks Usage Test for arguments
  - Hooks Usage Test for calls number
 */
describe('CounterReact', () => {
  beforeEach(() => {
    useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(jest.requireActual('react').useState)
  })

  afterEach(() => {
    useStateSpy.mockRestore()
    jest.clearAllMocks()
  })

  test('Render Test: checks rendering all elements with expected content', () => {
    const container = render(<CounterReact {...counterReactProps} />).container
    const title = container.getElementsByClassName('title')[0]
    const counterValue = container.getElementsByClassName('counterValue')[0]
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('Counter component')

    expect(counterValue).toBe(undefined)

    expect(incrementButton).toBeInTheDocument()
    expect(incrementButton).toHaveTextContent('Increment')

    expect(decrementButton).toBeInTheDocument()
    expect(decrementButton).toHaveTextContent('Decrement')
  })

  test('Props Test: tests display the correct values from props', () => {
    let counterReactProps: CounterReactPropsType = {
      title: 'The first title',
      increment,
      decrement,
    }

    let container = render(<CounterReact {...counterReactProps} />).container
    let title = container.getElementsByClassName('title')[0]
    expect(title).toHaveTextContent('The first title')

    counterReactProps = {
      title: 'The second title',
      increment,
      decrement,
    }
    container = render(<CounterReact {...counterReactProps} />).container
    title = container.getElementsByClassName('title')[0]
    expect(title).toHaveTextContent('The second title')
  })

  test('Props Callbacks Test for arguments: checks values of props of calls', () => {
    const incrementSpy = jest.spyOn(handlersDefault, 'increment')
    const decrementSpy = jest.spyOn(handlersDefault, 'decrement')

    const counterReactProps: CounterReactPropsType = {
      title: 'Hello Counters',
      increment,
      decrement,
    }

    const container = render(<CounterReact {...counterReactProps} />).container
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(incrementSpy).toHaveBeenCalledWith({
      incrementIn: increment,
      counterState: 0,
      setCounterState: expect.anything(),
    })

    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)
    expect(decrementSpy).toHaveBeenCalledWith({
      decrementIn: decrement,
      counterState: 0,
      setCounterState: expect.anything(),
    })

    incrementSpy.mockRestore()
    decrementSpy.mockRestore()
  })

  test('Props Callbacks Test for calls number: counts calls', () => {
    const incrementSpy = jest.spyOn(handlersDefault, 'increment')
    const decrementSpy = jest.spyOn(handlersDefault, 'decrement')

    const counterReactProps: CounterReactPropsType = {
      title: 'Hello Counters',
      increment,
      decrement,
    }

    const container = render(<CounterReact {...counterReactProps} />).container
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)

    expect(incrementSpy).toHaveBeenCalledTimes(1)
    expect(decrementSpy).toHaveBeenCalledTimes(2)

    incrementSpy.mockRestore()
    decrementSpy.mockRestore()
  })

  test('Props Callbacks 2 Test for arguments: checks values of props of calls', () => {
    const counterReactProps: CounterReactPropsType = {
      title: 'Counter component',
      increment,
      decrement,
    }
    const incrementSpy = jest.spyOn(counterReactProps, 'increment')
    const decrementSpy = jest.spyOn(counterReactProps, 'decrement')

    const container = render(<CounterReact {...counterReactProps} />).container
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(incrementSpy).toHaveBeenCalledWith(0, expect.anything())

    fireEvent.click(decrementButton)
    expect(decrementSpy).toHaveBeenCalledWith(1, expect.anything())

    incrementSpy.mockRestore()
    decrementSpy.mockRestore()
  })

  test('Props Callbacks 2 Test for calls number: counts calls', () => {
    const incrementMock = jest.fn()
    const decrementMock = jest.fn()

    const counterReactProps: CounterReactPropsType = {
      title: 'Counter component',
      increment: incrementMock,
      decrement: decrementMock,
    }
    const container = render(<CounterReact {...counterReactProps} />).container
    const counterValue = container.getElementsByClassName('counterValue')[0]
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(incrementMock).toHaveBeenCalledTimes(1)

    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)
    expect(decrementMock).toHaveBeenCalledTimes(2)
  })

  test('Behavior Test', async () => {
    const container = render(<CounterReact {...counterReactProps} />).container
    let counterValue = container.getElementsByClassName('counterValue')[0]
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    expect(counterValue).toEqual(undefined)

    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    fireEvent.click(incrementButton)
    counterValue = container.getElementsByClassName('counterValue')[0]
    expect(counterValue).toHaveTextContent('Counter Value: 3')

    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)
    counterValue = container.getElementsByClassName('counterValue')[0]
    expect(counterValue).toHaveTextContent('Counter Value: 1')
  })

  test('Conditional Rendering Test', async () => {
    const counterReactProps: CounterReactPropsType = {
      title: 'Hello Counters',
      increment,
      decrement,
    }

    const container = render(<CounterReact {...counterReactProps} />).container
    let counterValue = container.getElementsByClassName('counterValue')[0]
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    expect(counterValue).toEqual(undefined)

    fireEvent.click(incrementButton)
    counterValue = container.getElementsByClassName('counterValue')[0]
    expect(counterValue).toHaveTextContent('Counter Value: 1')

    fireEvent.click(decrementButton)
    counterValue = container.getElementsByClassName('counterValue')[0]
    expect(counterValue).toEqual(undefined)

    fireEvent.click(decrementButton)
    counterValue = container.getElementsByClassName('counterValue')[0]
    expect(counterValue).toHaveTextContent('Counter Value: -1')
  })

  test('Error Handling Test and Prop Validation Test', () => {
    const counterReactProps: CounterReactPropsType = {
      // @ts-expect-error
      title: 123,
      increment,
      decrement,
    }

    const container = render(
      // @ts-expect-error
      <CounterReact {...counterReactProps} increment={'string'} />
    ).container
    const title = container.getElementsByClassName('title')[0]
    expect(title).toHaveTextContent('Sorry for unexpected behavior')
  })

  test('Hooks Usage Test for arguments: checks values of props of calls', () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(useStateMock)

    const counterReactProps: CounterReactPropsType = {
      title: 'Hello Counters',
      increment,
      decrement,
    }

    const container = render(<CounterReact {...counterReactProps} />).container
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(setStateMock).toHaveBeenCalledWith(1)

    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)
    expect(setStateMock).toHaveBeenCalledWith(1)

    useStateSpy.mockRestore()
  })

  test('Hooks Usage Test for calls number: counts calls', () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    const useStateSpy = jest.spyOn(React, 'useState')
    useStateSpy.mockImplementation(useStateMock)

    const counterReactProps: CounterReactPropsType = {
      title: 'Hello Counters',
      increment,
      decrement,
    }

    const container = render(<CounterReact {...counterReactProps} />).container
    const incrementButton =
      container.getElementsByClassName('buttonIncrement')[0]
    const decrementButton =
      container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(setStateMock).toHaveBeenCalledTimes(1)

    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)
    expect(setStateMock).toHaveBeenCalledTimes(4)

    useStateSpy.mockRestore()
  })
})
