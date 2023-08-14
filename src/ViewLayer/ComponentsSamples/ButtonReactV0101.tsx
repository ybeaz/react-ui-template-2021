import React from 'react'

export type ButtonReactPropsType = {
  title: string
  click?: (params?: any) => void
  params?: any
}

/**
 * @description React functional component without an internal state to
        - display button with title from props
        - trigger "click" function with "params" argument from props
 * @props type ButtonReactPropsType = {
            title: string
            click?: (params?: any) => void
            params?: any
          }
 * @import import { ButtonReact } from './ButtonReact'
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
