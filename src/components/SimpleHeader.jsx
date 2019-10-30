import React, { Component } from 'react'
import * as css from 'classnames'
import Link from '../helpers/Link'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className='header-wrap-simple'>
        <div className='header-inner'>
          <div className='header-logo-simple'>
            <Link className='header-logo--link' to='/'>
              <svg width="100%" height="100%" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 14.635V50C27.615 50 50 27.615 50 0H14.635C10.7536 0 7.03109 1.5419 4.28649 4.28649C1.5419 7.03109 0 10.7536 0 14.635H0Z" fill="#fff"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
