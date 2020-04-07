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
          <div className='artist-afisha--title'>
            <div className='artist-afisha--title-main'>ISHOME</div>
            <div className='artist-afisha--title-second'>stay home</div>
          </div>
          <div className='artist-afisha'>
            <iframe width="100%" height="100%" src="https://play.boomstream.com/ikhNS75t" frameBorder="0" scrolling="no" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    )
  }
}
