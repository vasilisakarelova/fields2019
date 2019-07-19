import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from '../helpers/Link'

export default class extends Component {
  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='tickets-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | Tickets</title>
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <div className='tickets-inner'>
          <div className='tickets-back--wrap'>
            <Link to='/' className='tickets-back--link'>
              <div className='tickets-back--arrow'>
                <svg width="100%" height="100%" viewBox="0 0 141 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M140.5 25H2L26 1" stroke="white"/>
                </svg>
              </div>
              <div className='tickets-back--btn'>
                <div className='tickets-back--btn-top'>Назад</div>
                <div className='tickets-back--btn-bottom'>Back</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
