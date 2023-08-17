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
})
