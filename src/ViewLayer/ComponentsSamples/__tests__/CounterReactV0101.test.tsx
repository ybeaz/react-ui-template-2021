// Counter.test.js
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { CounterReact } from '../CounterReactV0101'

describe('CounterReact', () => {
  test('increments and decrements the counter value', () => {
    const { getByText, getByTestId } = render(<CounterReact />)

    const counterValue = getByText('Counter Value: 0')
    const incrementButton = getByText('Increment')
    const decrementButton = getByText('Decrement')

    expect(counterValue).toBeInTheDocument()

    fireEvent.click(incrementButton)
    expect(counterValue).toHaveTextContent('Counter Value: 1')

    fireEvent.click(decrementButton)
    expect(counterValue).toHaveTextContent('Counter Value: 0')
  })
})
