import React from 'react'

export type ButtonReactPropsType = {
  title: string
  click?: () => void
}

/**
 * @description Component Functional component on ReactJS to
 *      - create stateless Button component
 *      - take two properties in props: {title: string, click?: () => void }
 * @import import { ButtonReact } from '../ComponentsSamples/ButtonReactV0301'
 */
export const ButtonReact: React.FC<ButtonReactPropsType> = ({
  title,
  click = () => {},
}: ButtonReactPropsType) => {
  return (
    <div className='ButtonReact'>
      <button className='button' onClick={click}>
        {title}
      </button>
    </div>
  )
}
