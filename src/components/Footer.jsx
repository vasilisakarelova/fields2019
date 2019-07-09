import React, { Component } from 'react'
import Link from '../helpers/Link'

import logo from '../assets/logo.png'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className='footer-wrap'>
        <div className='footer-inner'>
          <div className='footer-logo'>
            <Link className='footer-logo--link' to='/'>
              <img className='footer-logo--img' src={logo} alt='fields logo' />
            </Link>
          </div>
          <div className='footer-nav'>
            <div className='footer-nav--top'>
              <div className='footer-nav--link-wrap'><a className='footer-nav--link' href='mailto:info@fields.agency'>info@fields.agency</a></div>
              <div className='footer-nav--link-wrap'><a className='footer-nav--link' href='mailto:forpress@fields.agency'>forpress@fields.agency</a></div>
            </div>
            <div className='footer-nav--bottom'>
              <div className='footer-nav--copyright'>Fields Festival 2019</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
