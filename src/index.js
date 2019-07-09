import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import resized from './utils/resized'

import App from './App'
import { unregister } from './serviceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
unregister()
resized()
