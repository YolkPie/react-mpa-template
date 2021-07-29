import * as React from 'react'
import * as ReactDOM from 'react-dom'

import '@/styles/base.scss'

import Router from '@router/home'

const App = () => <Router />

ReactDOM.render(
  <div className="App">
    <App />
  </div>,
  document.getElementById('app') as HTMLElement
)

if (module.hot) {
  module.hot.accept()
}
