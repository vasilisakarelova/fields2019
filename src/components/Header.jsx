import React, { Component } from 'react'
import * as css from 'classnames'
import Link from '../helpers/Link'

import logo from '../assets/logo.png'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className={css('header-wrap', {'is-open': this.props.openMobMenu})}>
        <div className='header-inner'>
          <div className='header-logo'>
            <Link className='header-logo--link' to='/'>
              <img className='header-logo--img' src={logo} alt='fields logo' />
            </Link>
          </div>
          <div className='header-nav'>
            <div className='header-nav--item'>
              <Link className='header-nav--link' to='/about'>
                <div className='header-nav--item-title'>О фестивале</div>
                <div className='header-nav--item-sub-title'>About the festival</div>
              </Link>
            </div>
            <div className='header-nav--item'>
              <Link className='header-nav--link' to='/lineup'>
                <div className='header-nav--item-title'>Лайнап</div>
                <div className='header-nav--item-sub-title'>Line up</div>
              </Link>
            </div>
            <div className='header-nav--item'>
              <Link className='header-nav--link' to='/partners'>
                <div className='header-nav--item-title'>Партнеры</div>
                <div className='header-nav--item-sub-title'>Partners</div>
              </Link>
            </div>
            <div className='header-nav--item'>
              <Link className='header-nav--link' to='/tickets'>
                <div className='header-nav--item-title'>Билеты</div>
                <div className='header-nav--item-sub-title'>Tickets</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
