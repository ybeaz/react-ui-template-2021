import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Image as ImageUserto } from 'userto-components'

import { handleEvents } from '../../DataLayer/index.handleEvents'
import { URL_APP_BASE } from '../../Constants/servers.const'
import { TemplateBody } from '../Components/TemplateBody'
import { HeaderFrame } from '../Frames/HeaderFrame'
import { FooterFrame } from '../Frames/FooterFrame'
import { MainFrame } from '../Frames/MainFrame'
import { IRootStore } from '../../Interfaces/IRootStore'

import { CounterReact } from '../ComponentsSamples/CounterReactV0101'
import { ToDoListReact } from '../ComponentsSamples/ToDoListReactV0301'
import { ButtonReact } from '../ComponentsSamples/ButtonReactV0101'

interface TestScreenPropsType {
  routeProps: {
    location: {
      pathname: string
    }
  }
  themeDafault: string
}

/**
 * @description Component TestScreen
 * @import import { TestScreen } from './ViewLayer/Screens/TestScreen'
 */
export const TestScreen: React.FunctionComponent<TestScreenPropsType> = (
  props: TestScreenPropsType
) => {
  const store = useSelector((store2: IRootStore) => store2)

  const {
    globalVars: { language },
  } = store

  useEffect(() => {
    handleEvents(
      {},
      {
        typeEvent: 'TEMPLATE',
        data: { id: '3' },
      }
    )
  }, [])

  console.info('TestScreen  [41]', {
    store,
  })

  const canonicalUrl = `${URL_APP_BASE}${props?.routeProps.location.pathname}`

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

  const counterReactProps = {
    title: 'Counter component',
    increment: (count: number, func: any) => {
      func(count + 1)
    },
    decrement: (count: number, func: any) => {
      func(count - 1)
    },
  }

  return (
    <HelmetProvider>
      <div className='TestScreen'>
        <Helmet>
          <html lang={language} />
          <meta charSet='utf-8' />
          <title>{'TestScreen'}</title>
          <link rel='canonical' href={canonicalUrl} />
          <meta name='description' content={'Description'} />
        </Helmet>
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
          <TemplateBody {...propsOut.templateBodyProps} />
          {/* middle-right */}
          <div>
            <CounterReact {...counterReactProps} />
            <ToDoListReact />
          </div>
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
    </HelmetProvider>
  )
}
