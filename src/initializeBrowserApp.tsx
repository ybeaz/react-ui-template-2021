import React, { StrictMode } from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'

import { store } from './DataLayer/store'
import { GlobalTheme } from './ViewLayer/Styles/GlobalTheme'
import { RouterScreensConfig } from './RouterScreensConfig'

export const initializeBrowserApp = () => {
  const root = document.getElementById('root')

  let renderMethod: string
  if (root && root.innerHTML !== '') {
    renderMethod = 'hydrate'
  } else {
    renderMethod = 'render'
  }

  // @ts-ignore
  ReactDOM[renderMethod](
    <StrictMode>
      <Provider store={store}>
        <GlobalTheme>
          <RouterScreensConfig />
        </GlobalTheme>
      </Provider>
    </StrictMode>,
    root
  )
}
