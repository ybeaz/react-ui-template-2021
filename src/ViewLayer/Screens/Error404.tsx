import React, { useEffect, ReactElement } from 'react'

import { Image } from '../ComponentsLibrary/Image'
import { FooterFrame } from '../Frames/FooterFrame'
import { HeaderFrame } from '../Frames/HeaderFrame'
import { Error404Body } from '../Components/Error404Body'
import { MainFrame } from '../Frames/MainFrame'
import { handleEvents } from '../../DataLayer/index.handleEvents'

interface Error404Args {
  routeProps: {
    location: {
      pathname: string
    }
  }
  themeDafault: string
}

export const Error404: React.FunctionComponent<Error404Args> = (
  props: Error404Args
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
      classAdded: 'Image_bottom',
      src: 'https://yourails.com/images/bottomRightBackground.jpg',
    },
  }

  return (
    <div className='Error404'>
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
        <Error404Body />
        {/* middle-right */}
        {null}
        {/* footer */}
        <FooterFrame {...propsOut.footerFrameProps}>
          {/* footer-left */}
          {null}
          {/* footer-main */}
          {null}
          {/* footer-right */}
          <Image {...propsOut.imageBottomProps} />
        </FooterFrame>
      </MainFrame>
    </div>
  )
}
