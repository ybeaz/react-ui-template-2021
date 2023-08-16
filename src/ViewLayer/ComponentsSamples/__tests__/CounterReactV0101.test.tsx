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
 * @description: Unit Test Suites that implement
       - Render Test
       - Props Test,
       - Functions Callbacks Test
       - Handlers Callbacks Test
       - Behavior Test, State Change Test,
       - Conditional Rendering Test
       - Error Handling Test, Prop Validation Test,
       - Hooks usage Test
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

  test('Render Test: CounterReact renders all elements with expected content', () => {
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

  test('Props Test: displays the correct title', () => {
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

  test('Function Callbacks Test: checks function arguments', () => {
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

  test('Function Callbacks Test: counts increments and decrements calls', () => {
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

  test('Handlers Callbacks Test: checks values handlers are called with', () => {
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

  test('Handlers Callbacks Test: checks number of times they are called', () => {
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

  test('Conditional Rendering Test: displays the coorrect component conditionally', async () => {
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

  test('Behavior Test and State Change Test: displays the coorrect counter value', async () => {
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

  test('Error Handling Test and Prop Validation Test: displays default title if the title is not a string', () => {
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

  test('Hooks Usage Test: checks values hooks are called with', () => {
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

  test('Hooks Usage Test: checks the number of hook calls', () => {
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
