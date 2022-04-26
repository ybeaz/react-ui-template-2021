import React, { useEffect, ReactElement } from 'react'
import { Image as ImageUserto } from 'userto-components'

import { FooterFrame } from '../Frames/FooterFrame'
import { HeaderFrame } from '../Frames/HeaderFrame'
import { StubUserGoodbye } from '../Components/StubUserGoodbye'
import { MainFrame } from '../Frames/MainFrame'
import { handleEvents } from '../../DataLayer/index.handleEvents'

interface StubInProgressArgs {
  routeProps: {
    location: {
      pathname: string
    }
  }
  themeDafault: string
}

export const StubInProgress: React.FunctionComponent<StubInProgressArgs> = (
  props: StubInProgressArgs
): ReactElement => {
  const { themeDafault } = props
  useEffect(() => {
    handleEvents({}, { typeEvent: 'SET_THEME', data: themeDafault })
  }, [])

  const propsOut = {
    mainFrameProps: {},
    headerFrameProps: {},
    templateBodyProps: {},
    footerFrameProps: {},
    imageBottomProps: {
      className: 'Image_bottom',
      src: 'https://yourails.com/images/bottomRightBackground.jpg',
    },
  }

  return (
    <div className='StubInProgress'>
      <MainFrame {...propsOut.mainFrameProps}>
        {/* header */}
        <HeaderFrame {...propsOut.headerFrameProps}>
          {/* header-left */}
          {null}
          {/* header-main */}
          {null}
          {/* header-right */}
          {null}
        </HeaderFrame>
        {/* middle-left */}
        {null}
        {/* middle-main */}
        <StubUserGoodbye />
        {/* middle-right */}
        {null}
        {/* footer */}
        <FooterFrame {...propsOut.footerFrameProps}>
          {/* footer-left */}
          {null}
          {/* footer-main */}
          {null}
          {/* footer-right */}
          <ImageUserto {...propsOut.imageBottomProps} />
        </FooterFrame>
      </MainFrame>
    </div>
  )
}
