import React, { ReactElement } from 'react'
import { useSelector } from 'react-redux'

import { Button } from '../ComponentsLibrary/Button'
import { handleEvents } from '../../DataLayer/index.handleEvents'
import { IRootStore } from '../../Interfaces/IRootStore'

interface IGetChildren {
  (children: any[]): (JSX.Element | null)[]
}

const ChildStub = <div>This is modul stub</div>

const CHILDREN: any = {
  ChildStub,
}

export const ModalFrames: React.FunctionComponent = (): ReactElement => {
  const store = useSelector((store2: IRootStore) => store2)
  const {
    componentsState: { modalFrames },
  } = store

  const getChildren: IGetChildren = children => {
    return children.map(child => {
      const { childName, isActive, childProps } = child
      const CHILD = CHILDREN[childName]

      if (!CHILD) return null

      const closeAction = {
        typeEvent: 'SET_MODAL_FRAMES',
        data: [{ childName, isActive: false, childProps }],
      }

      const addClass = !isActive ? '' : 'ModalFrames_display'

      const propsOut = {
        buttonCloseProps: {
          icon: 'MdClose',
          classAdded: 'Button_MdClose',
          action: closeAction,
        },
        childProps,
      }

      return (
        <div
          id='modalFrames'
          className={`ModalFrames ${addClass} ModalFrames_${childName}`}
          onClick={event => handleEvents(event, closeAction)}
        >
          <div className='_content'>
            <span className='_close'>
              <Button {...propsOut.buttonCloseProps} />
            </span>
            <div
              className='_inner'
              onClick={event =>
                handleEvents(event, { typeEvent: 'STOP_PROPAGATION' })
              }
            >
              <CHILD {...propsOut.childProps} />
            </div>
          </div>
        </div>
      )
    })
  }

  return <>{getChildren(modalFrames)}</>
}
