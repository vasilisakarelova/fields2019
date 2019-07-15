import React, { Component } from 'react'
import * as css from 'classnames'
import Link from '../helpers/Link'

export default class extends Component {
  state = {
    isInvert: false
  }

  constructor (props) {
    super(props)

    this.burgerClick = this.burgerClick.bind(this)
  }

  burgerClick () {
    this.setState({
      isInvert: !this.props.isOpen
    })
    
    this.props.openMobMenu(!this.props.isOpen)
  }

  render () {
    return (
      <div className={css('header-wrap--mob', {'is-open': this.state.isInvert})}>
        <div className='header-inner--mob'>
          <div className='header-logo--mob'>
            <Link className='header-logo--mob-link' to='/'>
              <svg className='header-logo--mob-img' width="100%" height="100%" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 14.635V50C27.615 50 50 27.615 50 0H14.635C10.7536 0 7.03109 1.5419 4.28649 4.28649C1.5419 7.03109 0 10.7536 0 14.635H0Z" fill="#000"/>
              </svg>
            </Link>
          </div>
          <div className='header-nav--mob'>
            <div className='header-nav--mob-burger' onClick={this.burgerClick}>
              <svg width="100%" height="100%" viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H40V4H0V0Z" fill="#000"/>
                <path d="M0 12H40V16H0V12Z" fill="#000"/>
                <path d="M0 24H40V28H0V24Z" fill="#000"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
