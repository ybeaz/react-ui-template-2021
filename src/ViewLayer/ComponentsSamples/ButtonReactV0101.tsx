import React from 'react'

export type ButtonReactPropsType = {
  title: string
  click?: (params: any) => void
  params?: any
}

/**
 * @description Component Functional component on ReactJS to
 *      - create stateless Button component
 *      - take two properties in props: {title: string, click?: () => void }
 * @import import { ButtonReact } from '../ComponentsSamples/ButtonReactV0101'
 */
export const ButtonReact: React.FC<ButtonReactPropsType> = ({
  title,
  click = (params: any) => {},
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
