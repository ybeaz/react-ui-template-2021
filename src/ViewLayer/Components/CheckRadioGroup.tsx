import React, { useState, useRef } from 'react'

import { getAnswerByOptionID } from '../../Shared/getAnswerByOptionID'
import { handleEvents } from '../Hooks/handleEvents'
interface ICheckRadioGroup {
  courseID: string
  moduleID: string
  questionID: string
  capture: string
  options: any[]
  designType: string
  multi: boolean
}

export const CheckRadioGroup: Function = ({
  capture,
  options,
  designType,
  multi,
}: ICheckRadioGroup): JSX.Element => {
  const getCheckLines: Function = (options: any[]): JSX.Element[] => {
    return options.map(item => {
      const { optionID, label } = item
      const answer = getAnswerByOptionID(options, optionID)

      return (
        <label
          className={`CheckRadioGroup__label ${designType}__label`}
          key={optionID}
        >
          <div className='CheckRadioGroup__label_capture'>{label}</div>
          <div
            className={`CheckRadioGroup__label_checkdiv ${designType}__label_checkdiv`}
          >
            <input
              onChange={event =>
                handleEvents(event, {
                  typeEvent: 'CLICK_CHECK',
                  data: { optionID, multi },
                })
              }
              type='checkbox'
              name={'radio'}
              checked={answer}
            />
            <span className='checkmark'></span>
          </div>
        </label>
      )
    })
  }

  return (
    <div className={`CheckRadioGroup ${designType}`}>
      <div className='CheckRadioGroup__capture'>{capture}</div>
      {getCheckLines(options)}
    </div>
  )
}