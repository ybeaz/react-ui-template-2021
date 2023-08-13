import React, { useState } from 'react'

export type CounterReactPropsType = {}

/**
 * @description Component Functional component on ReactJS to
 *      - display count value
 *      - create the first Button to increase count value by 1
 *      - create the second Button to decrease count value by 1
 * @import import { CounterReact } from '../ComponentsSamples/CounterReactV0101'
 */
export const CounterReact: React.FC<
  CounterReactPropsType
> = ({}: CounterReactPropsType) => {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  return (
    <div>
      <p>Counter Value: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  )
}
