import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { store } from './DataLayer/store'
import { AppScreen } from './ViewLayer/Screens/AppScreen'

ReactDOM.render(
  <Provider store={store}>
    <AppScreen />
  </Provider>,
  document.getElementById('root')
)
