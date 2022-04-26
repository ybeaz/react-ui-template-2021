import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { IRootStore } from '../../Interfaces/IRootStore'
import {
  Button as ButtonUserto,
  IconReact as IconReactUserto,
  Image as ImageUserto,
  Input as InputUserto,
} from 'userto-components'

interface TemplateArgs {}

export const Template: React.FunctionComponent<TemplateArgs> = (
  props: TemplateArgs
) => {
  const store = useSelector((store2: IRootStore) => store2)

  const propsOut = {}

  return <div className='Template'>null</div>
}
