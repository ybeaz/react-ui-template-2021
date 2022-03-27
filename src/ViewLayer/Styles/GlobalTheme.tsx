import React, { ReactElement } from 'react'
import { ThemeProvider } from 'styled-components'

import {
  GLOBAL_THEME,
  LIGHTNESS,
  ALPHAS,
} from '../../Constants/globalTheme.const'
import { getCreatedGlobalStyle } from './getCreatedGlobalStyle'

/**
 * @description Component to provide Global theme
 * @link to convert RGB to HSV https://www.rapidtables.com/convert/color/rgb-to-hsl.html
 */

interface GlobalThemeArgs {
  children: any
}

export const GlobalTheme: React.FunctionComponent<GlobalThemeArgs> = (
  props: GlobalThemeArgs
): ReactElement => {
  const getThemeRemotely: Function = () => {
    try {
      document.getElementsByTagName('body')[0].style.display = 'none'
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      require(`./index.style.less`)
      document.getElementsByTagName('body')[0].style.display = 'flex'
    } catch (error) {
      console.info('RouterScreensConfig [115]', { msg: error.message })
    }
  }

  getThemeRemotely()

  const GlobalStyle = getCreatedGlobalStyle(LIGHTNESS, ALPHAS)

  return (
    <ThemeProvider theme={GLOBAL_THEME}>
      <GlobalStyle />
      {props.children}
    </ThemeProvider>
  )
}
