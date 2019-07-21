import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

export default class extends Component {
  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='tickets-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | Partners</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
        </Helmet>
        <div className='tickets-inner'>
          <div className='partners-title--wrap'>Билеты</div>
          <div className='tickets-link--wrap'>
            <a className='tickets-link' target='_blank' rel="noopener noreferrer" href='https://fieldsmutabor.ticketscloud.org/?fbclid=IwAR1VLgceG7Y5L0KLCb5XSLlfwnthmXbru5Ndctmrn-1GM4ux0uttlyY2BP4'>Купить</a>
          </div>
        </div>
      </div>
    )
  }
}
