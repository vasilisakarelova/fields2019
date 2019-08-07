import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from '../helpers/Link'

import og from '../assets/og.png'

export default class extends Component {
  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    const data = this.props.data

    return (
      <div className='artist-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | {this.props.data.name}</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
          <meta property="og:image:width" content="1842" />
          <meta property="og:image:height" content="976" />
          <meta property="og:image" content={og} />
          <meta property="og:title" content={`Fields | ${this.props.data.name}`} />
        </Helmet>
        <div className='artist-inner'>
          <div className='artist-header'>
            <div className='artist-header--name'>{data.name}</div>
            <div className='artist-header--country'>/ {data.countryAbbreviation}</div>
            <div className='artist-header--divider'></div>
            <div className='artist-header--info artist-header--date'>
              <span className='artist-header--info-title'>Дата<br/>выступления</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>{data.dateOfConcert}</span>
            </div>
            <div className='artist-header--info artist-header--time'>
              <span className='artist-header--info-title'>Время<br/>выступления</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>{data.timeOfConcert}</span>
            </div>
            <div className='artist-header--info artist-header--place'>
              <span className='artist-header--info-title'>Место<br/>выступления</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>{data.placeOfConcert}</span>
            </div>
          </div>
          <div className='artist-body'>
            <div className='artist-body--img'>
              <div className='artist-body--img-wrap'>
                <img alt={data.name} src={data.image} />
              </div>
            </div>
            <div className='artist-body--desc' dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </div>
          <div className='about-link--prev'>
            <Link className='about-link' to='/lineup'>
              <div className='about-link--arrow'>
                <svg width="100%" height="100%" viewBox="0 0 92 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.7024 33.959L0.999963 17.0908L19.7024 0.540844" stroke="white"/>
                  <path d="M0.999979 17.0908L91.9325 17.0908" stroke="white"/>
                </svg>
              </div>
              <div className='about-link--name'>Лайнап <br/>фестиваля</div>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
