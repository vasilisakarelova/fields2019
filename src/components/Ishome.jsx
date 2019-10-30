import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from '../helpers/Link'

import img01 from '../assets/ishome/photo.jpg'

import og from '../assets/og.png'

export default class extends Component {
  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='artist-wrap is-ishome'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | Ishome</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
          <meta property="og:image:width" content="1842" />
          <meta property="og:image:height" content="976" />
          <meta property="og:image" content={og} />
          <meta property="og:title" content="Education" />
        </Helmet>
        <div className='artist-inner at-education'>
          <div className='artist-afisha--tickets'>
            <div className='artist-afisha--tickets-title'>Купить билеты</div>
            <a href='https://ishome_morze.ticketscloud.org/' target='_blank' rel="noopener noreferrer">1 ноября, «Морзе», Санкт-Петербург</a>
            <a href='https://ishome_red.ticketscloud.org/' target='_blank' rel="noopener noreferrer">3 ноября, RED, Москва</a>
          </div>
          <div className='artist-afisha'>
            <div className='artist-afisha--img'>
              <img src={img01}/>
              <div className='artist-afisha--name'>
                <div className='artist-afisha--name-main'>ISHOME</div>
                <div className='artist-afisha--name-second'>presents “Untitled”</div>
                <div className='artist-afisha--name-third'>w/ Narcissi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
