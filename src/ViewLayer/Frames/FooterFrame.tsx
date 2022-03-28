import React, { useState, useEffect, useRef, ReactElement } from 'react'
import { useSelector, useDispatch } from 'react-redux'

interface FooterFrameArgs {
  screenType?: string
  children: (ReactElement | null)[]
}

export const FooterFrame: any = (props: FooterFrameArgs): ReactElement => {
  return (
    <div className='FooterFrame'>
      <div className='_left'>{props.children[0]}</div>
      <div className='_main'>{props.children[1]}</div>
      <div className='_right'>{props.children[2]}</div>
    </div>
  )
}
