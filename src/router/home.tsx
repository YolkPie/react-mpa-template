import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Index from '@pages/home/index'

export default () => (
  <Router>
    <Route path="/" component={Index} />
  </Router>
)
