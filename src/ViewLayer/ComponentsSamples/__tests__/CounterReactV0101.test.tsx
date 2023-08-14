import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { CounterReact, CounterReactPropsType } from '../CounterReactV0101'

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

let container: any
let title: Node
let counterValue: Node | undefined
let incrementButton: Node
let decrementButton: any

/**
 * @description: Unit Test Suites that implement
 *      - Render Test
 *      - Props Test,
 *      - Function Callbacks Test
 *      - Behavior Test, State Change Test,
 *      - Conditional Rendering Test
 *      - Error Handling Test, Prop Validation Test,
 *      - Hooks usage Test
 */

describe('CounterReact', () => {
  beforeEach(() => {
    container = render(<CounterReact {...counterReactProps} />).container
    title = container.getElementsByClassName('title')[0]
    counterValue = container.getElementsByClassName('counterValue')[0]
    incrementButton = container.getElementsByClassName('buttonIncrement')[0]
    decrementButton = container.getElementsByClassName('buttonDecrement')[0]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Render Test: CounterReact renders all elements with expected content', () => {
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
    container = render(<CounterReact {...counterReactProps} />).container
    title = container.getElementsByClassName('title')[0]
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
    const incrementMock = jest.spyOn(counterReactProps, 'increment')
    const decrementMock = jest.spyOn(counterReactProps, 'decrement')

    container = render(<CounterReact {...counterReactProps} />).container
    counterValue = container.getElementsByClassName('counterValue')[0]
    incrementButton = container.getElementsByClassName('buttonIncrement')[0]
    decrementButton = container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(incrementMock).toHaveBeenCalledWith(0, expect.anything())

    fireEvent.click(decrementButton)
    expect(decrementMock).toHaveBeenCalledWith(1, expect.anything())

    fireEvent.click(decrementButton)
    expect(decrementMock).toHaveBeenCalledWith(0, expect.anything())

    fireEvent.click(decrementButton)
    expect(decrementMock).toHaveBeenCalledWith(-1, expect.anything())
  })

  test('Function Callbacks Test: counts increments and decrements calls', () => {
    const incrementMock = jest.fn()
    const decrementMock = jest.fn()

    const counterReactProps: CounterReactPropsType = {
      title: 'Counter component',
      increment: incrementMock,
      decrement: decrementMock,
    }
    container = render(<CounterReact {...counterReactProps} />).container
    counterValue = container.getElementsByClassName('counterValue')[0]
    incrementButton = container.getElementsByClassName('buttonIncrement')[0]
    decrementButton = container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(incrementMock).toHaveBeenCalledTimes(1)

    fireEvent.click(decrementButton)
    fireEvent.click(decrementButton)
    expect(decrementMock).toHaveBeenCalledTimes(2)
  })

  test('Conditional Rendering Test: displays the coorrect component conditionally', async () => {
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
    let counterReactProps: CounterReactPropsType = {
      // @ts-ignore
      title: 123,
      increment,
      decrement,
    }

    // @ts-ignore
    container = render(<CounterReact {...counterReactProps} />).container
    title = container.getElementsByClassName('title')[0]
    expect(title).toHaveTextContent('Sorry for unexpected behavior')
  })

  test('Hooks usage Test: checks values useState is called with and number of times it is called', () => {
    const setStateMock = jest.fn()
    const useStateMock: any = (stateMock: any) => [stateMock, setStateMock]
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)

    let counterReactProps: CounterReactPropsType = {
      title: 'Hello Counters',
      increment,
      decrement,
    }

    container = render(<CounterReact {...counterReactProps} />).container
    incrementButton = container.getElementsByClassName('buttonIncrement')[0]
    decrementButton = container.getElementsByClassName('buttonDecrement')[0]

    fireEvent.click(incrementButton)
    expect(setStateMock).toHaveBeenCalledWith(1)

    fireEvent.click(decrementButton)
    expect(setStateMock).toHaveBeenCalledWith(1)

    expect(setStateMock).toHaveBeenCalledTimes(2)
  })
})
