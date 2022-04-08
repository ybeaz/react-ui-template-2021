import React, { useRef } from 'react'
import { useSelector } from 'react-redux'

import { handleEvents } from '../../DataLayer/index.handleEvents'
import { IRootStore } from '../../Interfaces/IRootStore'
import { IconReact } from './IconReact'

interface InputArgs {
  tagName?: string // input tag, may be 'input' or 'textarea'
  classAdded: string // class to add to customize the standard input class
  type?: string // type of html tag, for example, <input type='text' >
  placeholder: string // placeholder text
  typeEvent: string // typeEvent to trigger the proper action
  storeFormGroup?: string // sub property in store.form to keep data
  storeFormProp?: string // name of the property in store.form that stores data
  accept?: string // accepted files' format for type='file', for example, 'image/png, image/jpeg, image/jpg'
}

export const Input: React.FunctionComponent<InputArgs> = (
  props: InputArgs
): React.ReactElement => {
  const {
    tagName = 'input',
    classAdded,
    type,
    placeholder,
    typeEvent,
    storeFormGroup,
    storeFormProp,
    accept,
  } = props

  const store = useSelector((store2: IRootStore) => store2)
  const { forms } = store
  const value =
    storeFormGroup && storeFormProp
      ? forms[storeFormGroup][storeFormProp]
      : storeFormProp && forms[storeFormProp]

  const action = { typeEvent }

  const iconReactProps = {
    icon: 'AiFillCloseCircle',
    icon2: 'null',
    classAdded: 'IconReact_Input',
  }

  const inputFileRef = useRef(null)

  // TODO Make click programmaticaly from another element to change default label
  // https://stackoverflow.com/questions/32433594/how-to-trigger-input-file-event-reactjs-by-another-dom
  // const handleClick = () => {
  //   inputFileRef.current.type = type
  //   inputFileRef.current.onInput()
  // }

  return (
    <div className={`Input ${classAdded}`}>
      <form className='__form'>
        {tagName === 'input' && (
          <input
            className={'__input _hidden'}
            ref={inputFileRef}
            type={type}
            placeholder={placeholder}
            value={value}
            accept={accept}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleEvents(event, action)
            }
          />
        )}
        {tagName === 'textarea' && (
          <textarea
            className={'__input'}
            placeholder={placeholder}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              handleEvents(event, action)
            }
            value={value}
          />
        )}
      </form>
      <span
        className='_iconClose'
        onClick={(_event: React.MouseEvent<HTMLSpanElement>) =>
          handleEvents({ target: { value: '' } }, action)
        }
      >
        <IconReact {...iconReactProps} />
      </span>
    </div>
  )
}
