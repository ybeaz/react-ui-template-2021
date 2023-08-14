import React, { useState } from 'react'

export type CounterReactPropsType = {
  title: string
  increment: (count: number, func: any) => void
  decrement: (count: number, func: any) => void
}

/**
 * @description Component Functional component on ReactJS to
 *      - display count value
 *      - create the first Button to increase count value by 1
 *      - create the second Button to decrease count value by 1
 * @import import { CounterReact } from '../ComponentsSamples/CounterReactV0101'
 */
export const CounterReact: React.FC<CounterReactPropsType> = ({
  title: titleIn,
  increment,
  decrement,
}: CounterReactPropsType) => {
  let title = titleIn
  if (typeof titleIn !== 'string') title = 'Sorry for unexpected behavior'

  const [countState, setCounterState] = useState(0)

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
      {countState ? (
        <p className='counterValue'>Counter Value: {countState}</p>
      ) : null}
      <button
        className='buttonIncrement'
        onClick={() => handlers.increment(countState, setCounterState)}
      >
        Increment
      </button>
      <button
        className='buttonDecrement'
        onClick={() => handlers.decrement(countState, setCounterState)}
      >
        Decrement
      </button>
    </div>
  )
}
