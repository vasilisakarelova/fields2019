import React from 'react'
import ReactDOM from 'react-dom'

import './index.css'
import resized from './utils/resized'

import App from './App'
import { unregister } from './serviceWorker'

import data from './testdb'

// const origin = window.location.origin
//
// fetch(`${origin}/admin/api`)
//   .then((response) => {
//     if (response.status >= 400) {
//       throw new Error("Bad response from server")
//     }
//     return response.text()
//   })
//   .then((data) => {
//     const dataJson = JSON.parse(data)
//
//     ReactDOM.render(<App data={dataJson} />, document.getElementById('root'))
//     unregister()
//     resized()
//   })
//   .catch(error => {
//     if (error) console.log(error)
//     fetch(`${origin}/admin/api`)
//       .then((response) => {
//         if (response.status >= 400) {
//           throw new Error("Bad response from server")
//         }
//         return response.text()
//       })
//       .then((data) => {
//         const dataJson = JSON.parse(data)
//
//         ReactDOM.render(<App data={dataJson} />, document.getElementById('root'))
//         unregister()
//         resized()
//       })
//   })

ReactDOM.render(<App data={data} />, document.getElementById('root'))
unregister()
resized()
