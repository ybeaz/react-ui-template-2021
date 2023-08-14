// Counter.test.js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CounterReact } from '../CounterReactV0101'

describe('CounterReact', () => {
  test('increments and decrements the counter value', () => {
    const increment = (count: number, func: any) => {
      func(count + 1)
    }

    const decrement = (count: number, func: any) => {
      func(count - 1)
    }

    const counterReactProps = {
      title: 'My title',
      increment,
      decrement,
    }

    const { container, getByText, getByTestId } = render(
      <CounterReact {...counterReactProps} />
    )

    const counterValue = getByText('Counter Value: 0')
    const incrementButton = getByText('Increment')

    const decrementButton = getByText('Decrement')

    expect(counterValue).toBeInTheDocument()

    fireEvent.click(incrementButton)
    expect(counterValue).toHaveTextContent('Counter Value: 1')
    // expect(counterValue.textContent).toBe('Counter Value: 0')

    fireEvent.click(decrementButton)
    expect(counterValue).toHaveTextContent('Counter Value: 0')
  })
})
