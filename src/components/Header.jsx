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
            <div className='header-logo--date-wrap'>
              <div className='header-logo--date'>10 — 11<br/>августа 2019</div>
              <div className='header-logo--date-separate'>
                <svg width="100%" height="100%" viewBox="0 0 29 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 55L28 1" stroke="white"/>
                </svg>
              </div>
              <div className='header-logo--date-address'>
                Москва<br/>Шарикоподшипниковская<br/>13 с32
              </div>
            </div>
          </div>
          <div className='header-nav'>
            <div className='header-nav--item'>
              <Link className='header-nav--link' to='/lineup'>
                <div className='header-nav--item-title'>Лайнап</div>
                <div className='header-nav--item-sub-title'>Line up</div>
              </Link>
            </div>
            <div className='header-nav--item'>
              <Link className='header-nav--link' to='/about'>
                <div className='header-nav--item-title'>О фестивале</div>
                <div className='header-nav--item-sub-title'>About the festival</div>
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
