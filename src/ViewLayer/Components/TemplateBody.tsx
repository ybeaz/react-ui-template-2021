import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootStore } from '../../Interfaces/IRootStore'

interface TemplateBodyArgs {}

export const TemplateBody: React.FunctionComponent<TemplateBodyArgs> = (
  props: TemplateBodyArgs
): JSX.Element => {
  const [dataState, setDataState] = useState(['', '', '', ''])

  useEffect(() => {
    setDataState(['here', 'is', 'some', 'content'])
  }, [])

  const propsOut = {}

  return (
    <div className='TemplateBody'>
      {' '}
      <h1 className='_h1'>React Typescript Template</h1>
      <div>created 2021-11-01, updated 2022-03-31</div>
      <div>{dataState.join(' ')}</div>
    </div>
  )
}
