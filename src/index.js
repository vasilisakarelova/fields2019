import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import resized from './utils/resized'

import App from './App'
import { register } from './serviceWorker'

import data from './testdb'

// const origin = window.location.origin
//
// window.fetch(`${origin}/admin/api`)
//   .then((response) => {
//     if (response.status >= 400) {
//       console.log("Bad response from server")
//     }
//     return response.json()
//   })
//   .then((data) => {
//     ReactDOM.render(<App data={data} />, document.getElementById('root'))
//     register()
//     resized()
//   })

ReactDOM.render(<App data={data} />, document.getElementById('root'))
register()
resized()
