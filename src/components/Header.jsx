import React, { Component } from 'react'
import * as css from 'classnames'
import Link from '../helpers/Link'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className={css('header-wrap', {'is-open': this.props.openMobMenu})}>
        <div className='header-inner'>
          <div className='header-logo'>
            <Link className='header-logo--link' to='/'>
              <svg width="100%" height="100%" viewBox="0 0 146 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#logoFields)">
                  <path d="M0 43.8547H4.90553V26.1455H24.2512V21.4516H4.90553V8.29374H28.5415V3.61568H0V43.8547Z" fill="black"/>
                  <path d="M38.5326 15.1976H33.6201V43.8547H38.5326V15.1976Z" fill="black"/>
                  <path d="M58.8593 12.2744C50.2372 12.2744 43.8086 19.1783 43.8086 28.4302C43.8086 37.7433 50.4906 44.4615 59.1773 44.4615C66.3478 44.4615 71.2257 39.8582 72.251 33.9121H67.6104C66.5713 37.3086 63.4077 39.7495 59.1842 39.7495C53.7003 39.7495 49.3086 35.6737 48.7118 29.6711H72.4169C73.0782 18.4446 67.8524 12.2744 58.8593 12.2744ZM49.0436 25.0202C50.2625 20.1904 53.8547 16.9864 58.5459 16.9864C63.3293 16.9864 66.9837 19.8145 67.3985 25.0202H49.0436Z" fill="black"/>
                  <path d="M83.1292 0.520378H78.2168V43.8569H83.1292V0.520378Z" fill="black"/>
                  <path d="M112.979 21.1686C111.873 15.929 109.023 12.2744 102.429 12.2744C94.5622 12.2744 88.8848 19.1647 88.8848 28.4302C88.8848 37.7682 94.8756 44.4615 102.429 44.4615C108.94 44.4615 111.848 39.48 112.979 34.3514V37.7275C112.979 39.7042 113.415 43.8411 113.415 43.8411H117.892V0.5H112.979V21.1686ZM103.634 39.7631C97.9378 39.7631 93.7903 35.0918 93.7903 28.4415C93.7903 21.7913 97.364 16.9932 103.634 16.9932C109.903 16.9932 112.979 21.6147 112.979 28.4415C112.979 34.6435 110.018 39.7631 103.634 39.7631Z" fill="black"/>
                  <path d="M136.094 25.9916C132.661 24.599 129.32 23.9537 129.32 21.0373C129.32 18.7412 131.394 17.1177 134.371 17.1177C137.735 17.1177 140.062 18.6461 140.689 22.2147H144.954C144.827 16.2528 140.783 12.2744 134.562 12.2744C128.41 12.2744 124.424 16.1735 124.424 21.2343C124.424 27.2188 130.353 29.0303 135.145 30.8417C138.535 32.1165 141.094 32.6962 141.094 35.8526C141.094 38.1554 139.32 39.8514 136.025 39.8084C131.687 39.754 129.138 37.055 128.387 33.9212H123.846C123.588 36.3191 126.293 44.5068 136.412 44.5068C142.035 44.5068 146 41.0039 146 35.8277C146 29.4831 140.94 27.9253 136.094 25.9916Z" fill="black"/>
                  <path d="M33.3594 6.3872V13.0669C34.6212 13.0669 35.8706 12.8227 37.0363 12.3482C38.202 11.8736 39.2613 11.1781 40.1535 10.3014C41.0457 9.42457 41.7534 8.38368 42.2363 7.2381C42.7191 6.09253 42.9677 4.86471 42.9677 3.62474H36.175C35.8055 3.62415 35.4395 3.69516 35.0979 3.83372C34.7563 3.97228 34.4459 4.17567 34.1843 4.43225C33.9228 4.68882 33.7154 4.99355 33.5738 5.32901C33.4322 5.66446 33.3594 6.02405 33.3594 6.3872Z" fill="black"/>
                </g>
                <defs>
                  <clipPath id="logoFields">
                    <rect width="146" height="44" fill="white" transform="translate(0 0.5)"/>
                  </clipPath>
                </defs>
              </svg>
            </Link>
            <div className='header-logo--date-wrap'>
              <div className='header-logo--date-separate'>
                <svg width="100%" height="100%" viewBox="0 0 29 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 55L28 1" stroke="white"/>
                </svg>
              </div>
              <div className='header-logo--date'>MUTABOR<br/>10 — 11 августа 2019</div>
            </div>
          </div>
          <div className='header-nav'>
            <div className='header-nav--item'>
              <Link className='header-nav--link' to='/lineup'>
                <div className='header-nav--item-title'>Лайн-ап</div>
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
              <a className='header-nav--link' target='_blank' rel="noopener noreferrer" href='https://fieldsmutabor.ticketscloud.org/?fbclid=IwAR1VLgceG7Y5L0KLCb5XSLlfwnthmXbru5Ndctmrn-1GM4ux0uttlyY2BP4'>
                <div className='header-nav--item-title'>Билеты</div>
                <div className='header-nav--item-sub-title'>Tickets</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
