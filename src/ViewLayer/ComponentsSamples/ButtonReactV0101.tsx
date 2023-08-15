import React, { ReactNode } from 'react'

export type ButtonReactPropsType = {
  title: string
  click?: (params?: any) => void
  params?: any
}

/**
 TypeDoc https://typedoc.org
 @name ButtonReact
 @function type React.FunctionComponent<[@name]PropsType>
 @description Functional component in ReactJS without an internal state to
  - display button with title from props
  - trigger 'click' function with 'params' argument from props
 @argument type [@name]PropsType = {
  title: string
  click?: (params?: any) => void
  params?: any
}
 @returns type ReactNode
 @import import { [@name] } from './[@name]'
 */
export const ButtonReact: React.FunctionComponent<ButtonReactPropsType> = ({
  title,
  click = () => {},
  params,
}: ButtonReactPropsType) => {
  return (
    <div className='ButtonReact'>
      <button className='buttonElement' onClick={() => click(params)}>
        {title.toString()}
      </button>
    </div>
  )
}
