import React, { useState } from 'react'

export type CounterReactPropsType = {
  title: string
  increment: (count: number, func: any) => void
  decrement: (count: number, func: any) => void
}

/**
 * @description React functional component with an internal state to
        - display a title from props
        - display a clickable button to increase the counter value by 1
        - display a clickable button to decrease the counter value by 1
        - render the counter value if this value is non-zero
 * @props type CounterReactPropsType = {
            title: string
            increment: (count: number, func: any) => void
            decrement: (count: number, func: any) => void
          }
 * @import import { CounterReact } from './CounterReact'
 */
export const CounterReact: React.FunctionComponent<CounterReactPropsType> = ({
  title: titleIn,
  increment,
  decrement,
}: CounterReactPropsType) => {
  let title = titleIn
  if (typeof titleIn !== 'string') title = 'Sorry for unexpected behavior'

  const [counterState, setCounterState] = useState(0)

  const handlers: Record<
    string,
    (count: number, setCounterState: any) => void
  > = {
    increment,
    decrement,
  }

  return (
    <div className='CounterReact'>
      <h2 className='title'>{title}</h2>
      <button
        className='buttonIncrement'
        onClick={() => handlers.increment(counterState, setCounterState)}
      >
        Increment
      </button>
      <button
        className='buttonDecrement'
        onClick={() => handlers.decrement(counterState, setCounterState)}
      >
        Decrement
      </button>
      {counterState ? (
        <p className='counterValue'>Counter Value: {counterState}</p>
      ) : null}
    </div>
  )
}
