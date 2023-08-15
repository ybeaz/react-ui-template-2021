import React, { useState } from 'react'

export const handlersDefault: Record<string, (handlersProps: any) => void> = {
  increment({ incrementIn, counterState, setCounterState }) {
    incrementIn(counterState, setCounterState)
  },
  decrement({ decrementIn, counterState, setCounterState }) {
    decrementIn(counterState, setCounterState)
  },
}

export type CounterReactPropsType = {
  title: string
  increment: (count: number, func: any) => void
  decrement: (count: number, func: any) => void
  handlers?: Record<string, (handlersProps: any) => void>
}

/** 
 TypeDoc https://typedoc.org
 @name CounterReact
 @function type React.FunctionComponent<[@name]PropsType>
 @description Functional component in ReactJS with an internal state to
  - display a title from props
  - display a clickable button to increase the counter value by 1
  - display a clickable button to decrease the counter value by 1
  - render the counter value if this value is non-zero
 @argument type [@name]PropsType = {
  title: string
  increment: (count: number, func: any) => void
  decrement: (count: number, func: any) => void
  handlers?: Record<string, (handlersProps: any) => void>
 }
 @returns type ReactNode
 @import import { [@name] } from './[@name]'
 */
export const CounterReact: React.FunctionComponent<CounterReactPropsType> = ({
  title: titleIn,
  increment: incrementIn,
  decrement: decrementIn,
  handlers = handlersDefault,
}: CounterReactPropsType) => {
  let title = titleIn
  if (typeof titleIn !== 'string') title = 'Sorry for unexpected behavior'

  const [counterState, setCounterState] = useState(0)

  return (
    <div className='CounterReact'>
      <h2 className='title'>{title}</h2>
      <button
        className='buttonIncrement'
        onClick={() =>
          handlers.increment({ incrementIn, counterState, setCounterState })
        }
      >
        Increment
      </button>
      <button
        className='buttonDecrement'
        onClick={() =>
          handlers.decrement({ decrementIn, counterState, setCounterState })
        }
      >
        Decrement
      </button>
      {counterState ? (
        <p className='counterValue'>Counter Value: {counterState}</p>
      ) : null}
    </div>
  )
}
