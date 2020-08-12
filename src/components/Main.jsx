import React, { Component, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import Slider from 'react-slick'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

import Link from '../helpers/Link'
import scrollBy from '../helpers/scrollBy.js'
import getBrowser from '../helpers/getBrowser.js'

import afisha_mob from '../assets/DACHA_kvadrat_ins.jpg'
import afisha_desk from '../assets/DACHA_fb_poster.jpg'

import og from '../assets/og.png'

export default class extends Component {
  constructor (props) {
    super(props)

    const height = (window.innerWidth < 984) ? '100%' : '505px'

    this.state = {
      afishaReady: 0,
      mapHeight: height
    }

    this.checkSiblings = this.checkSiblings.bind(this)
    this.setAfishaReady = this.setAfishaReady.bind(this)
    this.checkForPartners = this.checkForPartners.bind(this)
  }

  componentWillMount () {
    window.scrollTo(0, 0)
  }

  checkForPartners (browser) {
    if (window.location.hash === '#partners') {
      if (browser === 'Chrome') {
        setTimeout(() => {
          scrollBy(document.documentElement, document.querySelector('#partners').offsetTop, 400)
        }, 500)
      } else {
        setTimeout(() => {
          scrollBy(document.body, document.querySelector('#partners').offsetTop, 400)
        }, 500)
      }
    }
  }

  componentDidMount () {
    const browser = getBrowser().name
    this.checkForPartners(browser)

    document.addEventListener('resized', () => {
      if (window.innerWidth < 984 && this.state.mapHeight === '505px') {
        this.setState({
          mapHeight: '100%'
        })
      } else if (window.innerWidth >= 984 && this.state.mapHeight === '100%') {
        this.setState({
          mapHeight: '505px'
        })
      }
    })
  }

  componentDidUpdate () {
    const browser = getBrowser().name
    this.checkForPartners(browser)
  }

  setAfishaReady (ev) {
    const prevAfishaReady = this.state.afishaReady

    this.setState(prevState => {
      return {
        afishaReady: prevState.afishaReady + 1
      }
    })

    if ((prevAfishaReady + 1) === 12) {
      document.querySelectorAll('.main-image--item').forEach(img => {
        console.log(img)
      })
    }
  }

  checkSiblings (openingId) {
    const siblings = [].slice.call(document.querySelectorAll('.main-collapsible--item'))
    siblings.forEach((sibling, idx) => {
      const siblingtrigger = sibling.querySelector('.main-collapsible--item__trigger')
      const isOpen = siblingtrigger.classList.contains('is-open')
      console.log(parseInt(openingId) === idx)
      if (parseInt(openingId) === idx) return
      if (isOpen) {
        siblingtrigger.click()
      }
    })
  }

  render () {
    const origin = window.location.origin
    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      adaptiveHeight: true
    }

    return (
      <div className='main-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
          <meta property="og:image:width" content="1842" />
          <meta property="og:image:height" content="976" />
          <meta property="og:image" content={afisha_desk} />
          <meta property="og:title" content="Fields" />
        </Helmet>
        <div className='main-image--wrap'>
          <img className='main-image--item' alt='afisha' src={afisha_desk} />
        </div>
      </div>
    )
  }
}
