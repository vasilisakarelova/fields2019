import React, { Component } from 'react'
import { Helmet } from 'react-helmet'

export default class extends Component {
  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='about-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | Partners</title>
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <div className='about-inner'>
        </div>
      </div>
    )
  }
}
