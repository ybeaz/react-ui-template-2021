import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import { AppScreen } from './ViewLayer/Screens/AppScreen'
import { store } from './DataLayer/store'

ReactDOM.render(
  <Provider store={store}>
    <AppScreen />
  </Provider>,
  document.getElementById('root')
)
