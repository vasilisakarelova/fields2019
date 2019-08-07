import React, { Component, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import Slider from 'react-slick'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import Accordion from './Accordion.jsx'

import Link from '../helpers/Link'
import scrollBy from '../helpers/scrollBy.js'
import getBrowser from '../helpers/getBrowser.js'

import afisha_mob from '../assets/site_mobile.png'
import afisha_desk from '../assets/site_desktop.png'

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
    this.checkForLineup = this.checkForLineup.bind(this)
    this.checkForPartners = this.checkForPartners.bind(this)
  }

  componentWillMount () {
    window.scrollTo(0, 0)
  }

  checkForLineup (browser) {
    if (window.location.hash === '#lineup') {
      if (browser === 'Chrome') {
        setTimeout(() => {
          scrollBy(document.documentElement, document.querySelector('#lineup').offsetTop, 400)
        }, 500)
      } else {
        setTimeout(() => {
          scrollBy(document.body, document.querySelector('#lineup').offsetTop, 400)
        }, 500)
      }
    }
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
    this.checkForLineup(browser)
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
    this.checkForLineup(browser)
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
          <meta property="og:image" content={og} />
          <meta property="og:title" content="Fields" />
        </Helmet>
        <div className='main-image-mob'>
          <img className='main-image-mob--item' alt='afisha' src={afisha_mob} />
        </div>
        <div className='main-image'>
          <LazyLoad offset={100}>
            <img className='main-image--item' alt='afisha' src={afisha_desk} />
          </LazyLoad>
        </div>
        <div className='about-wrap'>
          <div className='about-inner'>
            <div className='about-section--name'>О фестивале</div>
            <div className='about-title--wrap'>
              <div className='about-title--name'>Fields <br/>2019</div>
              <div className='about-title--address-wrap'>
                <span className='about-title--mutabor'>
                  <svg width="45" height="86" viewBox="0 0 45 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#mutabor-logo)">
                      <path d="M41.7317 0V45.4684C41.1904 61.2646 28.8689 67.1284 22.3016 66.7066H22.168C15.1841 66.5938 4.49107 61.8949 2.82251 46.3513V0H0V86H2.82251V61.7502C5.18166 63.7514 12.1032 69.1958 21.9808 69.1958C32.3464 69.1958 39.5374 63.8004 41.7629 61.7551L41.7317 69.159H44.5542V0H41.7317Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="mutabor-logo">
                        <rect width="44.5542" height="86" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </span>
                <div className='about-title--address'>
                  <span>MUTABOR</span><br/>
                  <span>Москва / Шарикоподшипниковская<br/>13 — 32</span>
                </div>
              </div>
            </div>
            <div className='about-text--wrap'>
              <div className='about-text--self'>
                <p>{this.props.about.paragraph2}</p>
                <p>{this.props.about.paragraph3}</p>
                <div className='about-link--next'>
                  <Link className='about-link' to='/history'>
                    <div className='about-link--name'>История <br/>фестиваля</div>
                    <div className='about-link--arrow'>
                      <svg width="100%" height="100%" viewBox="0 0 92 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M72.2301 0.541016L90.9325 17.4092L72.2301 33.9592" stroke="white"/>
                        <path d="M90.9325 17.4092L0 17.4092" stroke="white"/>
                      </svg>
                    </div>
                  </Link>
                </div>
                <div className='about-text--slider-wrap'>
                  <div className='about-text--slider'>
                    <Slider {...settings}>
                      { this.props.about.slider.map((image,idx) => {
                          return (
                            <div className='about-text--slider-item' key={idx}>
                              <LazyLoad offset={100}>
                                <img alt={image.desc} src={image.url}/>
                              </LazyLoad>
                            </div>
                          )
                        })
                      }
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
            <div className='about-extra-text--wrap' dangerouslySetInnerHTML={{ __html: this.props.about.paragraph1 }}></div>
            <div className='about-map--wrap'>
              <YMaps>
                <Map
                  width='100%'
                  height={this.state.mapHeight}
                  defaultState={{
                    center: [55.7196599, 37.6865011],
                    zoom: 15,
                  }}
                >
                  <Placemark geometry={[55.7196599, 37.6865011]} />
                </Map>
              </YMaps>
            </div>
          </div>
        </div>
        <div className='about-section--name-wrap'>
          <div className='about-section--name is-lineup'>ЛАЙНАП фестиваля</div>
        </div>
        <Suspense fallback={ <div>loading...</div> }>
          <Accordion className='main-collapsible--wrap' closeable={true} classParentString='main-collapsible--item' preLineupText={this.props.data.preLineupText}>
            { this.props.data.accordion.map((showcase,idx) => {
                const {name, description, artists} = showcase
                return (
                  <div className='main-collapsible--item' data-trigger={name} key={idx}>
                    <div className='main-collapsible--item-desc'><p>{description}</p></div>
                    <div className='main-collapsible--item-text'>
                      { artists.map((artist,artistId) => {
                          return <span className='main-collapsible--artist' key={artistId}><a className='main-collapsible--artist-link' target='_blank' rel="noopener noreferrer" href={`${origin}/${artist.url}`}>{artist.name}</a> /</span>
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </Accordion>
        </Suspense>
        <div className='main-link--next'>
          <div className='main-link--next-line'>
            <svg width="100%" height="100%" viewBox="0 0 595 95" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M595 94.5H1V0.5" stroke="white"/>
            </svg>
          </div>
          <Link className='about-link' to='/timeline'>
            <div className='about-link--name'>расписание<br/>фестиваля</div>
            <div className='about-link--arrow'>
              <svg width="100%" height="100%" viewBox="0 0 92 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M72.2301 0.541016L90.9325 17.4092L72.2301 33.9592" stroke="white"/>
                <path d="M90.9325 17.4092L0 17.4092" stroke="white"/>
              </svg>
            </div>
          </Link>
        </div>
        <div className='main-shema--wrap'>
          <div className='main-shema--title'>СХЕМа ФЕСТИВАЛЯ</div>
          <div className='main-shema--text'>
            <p>Пятый фестиваль Fields собран из кураторских блоков и шоукейсов. Их формированием занимались музыкальные сообщества, звукозаписывающие лейблы и тематические музыкальные медиа:</p>
          </div>
          <div className='main-shema--map'>
            <svg width="100%" height="100%" viewBox="0 0 1204 1063" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M377.937 955.196L162.484 750.675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M984.745 876.091L654.211 1017.21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M989.316 886.625L615.055 1046.43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M615.056 1046.43L608.497 1030.33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M608.496 1030.33L470.161 1058.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M470.161 1058.75L154.534 759.022" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M989.714 886.625L615.055 1046.43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M615.056 1046.43L608.497 1030.33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M608.496 1030.33L470.161 1058.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M470.161 1058.75L154.534 759.022" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M769.888 164.937L693.764 198.328" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M280.546 824.812L270.807 816.861" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.366 855.42L376.149 852.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M275.776 830.972L280.546 824.811" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M275.776 830.972L280.745 824.811" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.95 851.842L376.347 851.445" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.168 855.221L375.95 851.842" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.515 845.085L381.912 844.489" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.932 848.464L384.497 841.706" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.515 838.923L381.118 838.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M271.404 816.861L278.957 807.32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M288.298 814.873L280.745 824.413" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M288.695 815.073L280.745 824.812" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.758 807.321L278.957 806.923" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M280.944 825.01L280.745 824.811" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.491 864.762L334.013 849.259" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M286.509 788.24L286.708 787.843" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.956 797.979L286.907 788.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.957 797.979L278.559 797.78" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M286.708 788.438L286.509 788.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.155 877.88L359.453 865.16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M305.193 808.514L311.355 813.483" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.254 864.96L351.304 874.898" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.559 833.159L374.161 832.96" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M377.739 835.743L374.559 833.159" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.161 832.96L370.584 830.376" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.385 859.395V858.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M326.857 858.8L334.41 849.458" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M343.752 857.011L336.199 866.352" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.012 849.259L334.41 848.861" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.715 845.085L381.914 844.886" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.714 844.687L381.913 840.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.782 858.799V858.601" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.559 833.159H373.962" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.515 845.085L381.713 840.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.428 879.867L312.148 864.166" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.348 851.445L376.546 847.668" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.149 851.644L376.348 847.668" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M289.69 871.917L289.888 872.116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M289.49 872.314L289.689 871.917" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M354.882 808.513L354.485 809.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M355.28 808.912V808.713" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.627 790.227L331.229 790.823" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.354 813.88L306.584 819.843" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M358.659 802.749L358.857 802.948" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M348.323 795.793L358.658 802.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.528 795.196L348.323 795.793" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.571 806.923L340.373 806.724" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.304 814.079H351.105" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.254 802.749L351.304 814.675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M385.491 839.122L376.546 838.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.559 807.122L266.037 822.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.503 875.098L367.205 887.818" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M367.205 887.818L374.956 878.277" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.578 835.544V835.345" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.615 830.575L339.578 835.345" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M315.727 827.594L308.174 837.134" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.833 829.383L306.385 820.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M308.372 837.134L308.173 837.532" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M316.124 827.594L308.373 837.134" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M335.802 827.792L333.615 830.376" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.596 826.799L336.199 827.196" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M341.366 820.836L336.993 826.203" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.229 873.11L331.428 872.911" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336 866.75L326.261 858.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.416 830.377L333.615 830.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M337.391 877.88L331.229 873.11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M275.975 830.973V830.774" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M281.938 835.941L275.776 830.972" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.726 826.005L357.266 833.756" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M349.714 843.097L340.174 835.346" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M357.267 833.358L357.664 833.557" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M310.758 793.409L311.155 793.608" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M306.385 819.644L306.584 819.842" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M306.584 819.843L316.323 827.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.093 821.631V821.433" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.094 821.433L320.895 821.234" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.348 851.445L378.733 848.463" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M266.037 822.824L265.839 823.022" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M265.839 823.022L266.236 823.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M275.975 830.973L280.944 825.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.702 874.899L351.503 875.098" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M344.149 857.011L336.199 866.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.41 849.458L343.751 857.011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.428 872.911L336.397 866.948" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.316 838.725L376.546 838.327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.758 807.32L278.559 807.122" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.782 858.6L373.366 855.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.49 864.96H321.291" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.291 864.96L321.689 865.159" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.229 872.713L336 866.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.149 852.041L378.932 848.463" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.584 858.799L370.782 854.427" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M301.416 785.458L301.615 785.656" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M301.217 785.656L301.416 785.855" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M314.137 769.755L301.417 785.457" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 865.16L359.254 865.557" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.162 832.961L369.59 832.762" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.199 866.749L326.46 858.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.186 863.172L370.584 858.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.751 856.414L376.149 852.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.95 852.439L376.149 852.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.149 852.24V852.439" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.149 852.24L376.348 852.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.348 852.041L378.932 848.663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.565 832.762L370.584 830.376" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.36 833.159L374.161 832.96" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.714 845.084L384.497 841.706" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.913 844.489L384.298 841.508" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M310.956 793.209L311.354 793.408" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.354 793.408L324.074 777.707" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.963 833.159L369.59 832.96" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.565 832.762L369.59 832.563" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.385 858.998L370.583 854.426" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.913 844.489L382.112 840.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.714 845.482V845.084" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.95 851.842L376.149 847.47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.515 845.681V845.283" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.565 855.42L375.951 852.439" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M377.341 835.942L373.962 833.159" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M384.497 841.308L377.54 835.743" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M271.006 816.861L278.758 807.32" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M380.72 838.526L380.521 838.327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M380.521 838.327L377.341 835.942" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.782 858.799L373.565 855.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.118 838.526L377.739 835.743" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.782 858.6L370.981 854.426" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M380.521 838.327L376.546 838.128" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M380.72 838.526L376.546 838.327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M377.341 835.942L377.54 835.743" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M384.298 841.507L380.72 838.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M275.776 831.171V830.972" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M281.739 836.141L275.776 831.172" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M288.894 815.073L280.944 825.011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M288.894 815.073H288.695" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.932 848.662V848.463" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.565 855.42H373.366" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.932 848.662L381.515 845.681" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.932 848.662V848.463" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M368 862.377L370.385 859.396" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M368 862.376L367.801 862.178" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.733 848.464H378.932" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.168 855.222L373.366 855.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.733 848.463L381.515 845.084" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.733 848.464H378.932" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M384.497 841.707L384.298 841.508" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M384.496 841.309L381.515 838.924" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M384.297 841.508L384.496 841.309" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M288.894 814.874L288.695 815.072" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.956 807.32L288.297 814.873" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M280.745 824.414L271.404 816.861" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.956 806.923L288.894 814.874" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M271.006 816.861H270.807" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M280.745 824.811L271.006 816.861" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.956 807.52L288.297 815.073" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M280.745 824.811H280.546" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.385 863.37L370.186 863.171" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M385.49 838.725L381.118 838.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M385.49 838.923L381.316 838.725" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.546 838.128V838.327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M385.491 838.725V838.923" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.229 872.513V872.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.229 872.514L336 866.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.689 865.16L331.031 872.911" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M301.615 785.656L310.956 793.209" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.155 793.607L311.354 793.408" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M301.217 785.656L301.416 785.457" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M314.335 769.954L314.136 770.153" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M314.136 769.755L314.335 769.954" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M323.478 777.706L314.136 770.153" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.143 775.437L314.352 769.954" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.161 832.96L370.782 830.177" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.031 880.066L299.23 880.265" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M286.708 787.843L270.807 775.122" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M373.764 832.762H373.565" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M323.478 777.706L323.677 777.507" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M302.41 856.613L302.609 856.414" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.95 863.967L302.608 856.414" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M289.888 872.116L302.41 856.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.23 879.668L311.752 864.165" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M289.69 872.514L289.888 872.116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.031 880.067L299.23 879.669" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.031 880.066L289.689 872.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.956 797.582L286.509 788.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.559 797.78L278.956 797.582" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M286.907 788.042L286.708 787.843" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M263.453 785.061L263.056 784.862" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M270.608 775.519L263.056 784.861" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M271.006 775.718L270.608 775.52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M278.956 797.581L263.453 785.06" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M271.006 775.719L263.453 785.06" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M286.509 788.24L271.006 775.718" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M279.155 797.78L278.956 797.582" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.254 865.557L351.701 874.898" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.957 878.277L374.758 877.879" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.156 877.879L374.957 878.277" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.354 813.284V813.482" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M305.193 808.314L311.354 813.283" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M304.994 808.712L305.192 808.514" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M295.056 800.563L304.994 808.713" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M295.056 800.563H295.254" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.304 874.899L351.503 875.098" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.254 864.96L359.453 865.159" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.559 833.159V833.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M377.54 835.743L374.36 833.159" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M377.739 835.743H377.54" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.584 830.377L370.782 830.178" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.535 833.557V833.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M369.59 832.762V832.961" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.534 833.358L374.36 833.159" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M369.988 863.172L370.385 859.396" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M369.988 863.171H370.187" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.782 854.427H370.584" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M265.838 823.023L266.037 822.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M344.347 857.011H344.149" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M326.46 858.799L334.012 849.259" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.41 849.458L343.751 857.011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.199 866.352L326.858 858.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.41 848.862L344.348 857.011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M326.459 858.799L326.26 858.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.199 866.949V866.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.41 849.458H334.609" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.199 866.949L336 866.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.515 849.457L381.713 845.084" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.316 849.458L381.714 845.482" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.913 840.712H382.112" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.385 863.37L370.783 858.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M370.782 854.426H370.981" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M289.49 872.314L289.689 872.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.751 864.166L311.95 863.967" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.23 879.669L299.429 879.868" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.752 864.166L302.41 856.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.534 833.557L374.559 833.159" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.516 849.458H381.317" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.149 847.47L376.348 847.668" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.552 856.414L375.95 852.439" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.552 856.415H375.751" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M270.807 775.122L270.608 775.52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M262.857 785.06L278.559 797.781" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M262.857 785.061L263.056 784.862" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.534 833.159L374.161 832.96" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M378.535 833.159V833.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M369.59 832.762V832.563" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.118 849.458L381.515 845.681" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.118 849.458H381.316" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M381.913 840.712H381.714" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M312.149 864.166L311.95 863.967" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.609 829.184V828.985" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.211 829.582L334.609 829.185" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M335.006 828.588L335.404 828.19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.546 847.668H376.348" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.95 856.414L376.348 852.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.95 856.415H375.752" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M289.888 872.116L299.23 879.669" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M324.074 777.706L323.677 777.507" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.23 880.265L299.429 879.867" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M302.41 856.215L289.689 871.917" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.95 864.563L311.751 864.166" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M302.41 856.215L302.609 856.414" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M354.484 809.11L351.105 814.079" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.41 786.054L331.627 790.228" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M308.373 837.333L320.894 821.83" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.305 814.675L339.578 806.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.528 794.799L359.254 802.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.578 806.526L347.528 794.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.379 806.526L347.13 794.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.429 790.426L326.46 797.979" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.627 790.228V785.458" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M357.267 833.358L341.764 820.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M304.994 808.712L310.956 813.483" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.379 806.526L347.329 794.6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M335.602 787.247L334.609 786.452" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.608 786.452L327.055 797.781" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.056 797.78L339.18 806.128" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.993 826.203L336.595 826.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.198 827.197L335.801 827.793" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.156 813.682L306.385 819.644" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.23 790.824L326.46 797.979" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.615 830.774L339.578 835.544" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.428 872.911L336.198 866.948" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M341.763 820.638H341.565" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M341.565 820.638L341.366 820.837" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M349.516 843.495L339.777 835.544" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.23 790.824V785.457" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.615 830.774V830.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M335.801 827.792V827.991" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.571 806.923L348.323 795.793" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.373 806.724V806.923" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.372 806.725L347.925 795.595" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M355.478 808.514L361.839 806.128" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.578 835.544L347.727 825.606" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M358.857 802.948L351.304 814.079" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M358.857 802.749L351.304 814.078" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M306.385 820.042L315.726 827.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M306.186 819.644L316.124 827.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M355.28 808.712L362.037 806.128" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M308.373 837.134V837.333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.777 835.345V835.146" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.776 835.146L347.528 825.407" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.435 829.383L306.186 819.644" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.105 814.079L340.571 806.924" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.354 813.682L306.385 819.644" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.428 790.426V785.457" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.373 806.725L339.975 806.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.131 794.998L347.329 794.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M358.657 802.749L354.881 808.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M348.721 811.297L354.485 809.11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M362.037 806.128H361.838" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M348.721 811.296L348.522 811.098" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.354 813.88V813.682" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M320.895 821.234L311.354 813.482" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M349.516 843.495L339.578 835.544" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.975 806.526L347.528 795.196" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.528 794.799H347.329" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.379 806.526H339.577" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M376.546 838.526V838.327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M385.49 839.123V838.924" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M275.776 830.576V830.774" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M266.236 823.222L275.776 830.973" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M367.006 887.619L367.205 887.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.235 829.383L306.186 819.445" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.235 829.383H298.434" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.354 813.482V813.681" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.627 785.457H331.428" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.528 825.408L347.726 825.606" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.578 835.345H339.777" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.416 830.576H333.615" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.813 830.575L339.776 835.345" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.615 830.576L333.814 829.98" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.813 829.98H334.012" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.615 830.376L333.814 830.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M333.615 830.376V830.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.235 829.582L298.434 829.383" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.833 829.384H299.031" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M308.174 837.135L298.832 829.582" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.833 829.583V829.384" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M308.173 837.532L298.235 829.582" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M316.124 827.594H316.323" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M306.385 819.644H306.186" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M308.174 836.937L298.833 829.384" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M355.677 808.314L361.839 805.929" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M355.677 808.314L359.454 802.749" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M361.838 805.929V806.128" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M348.522 811.098L354.882 808.514" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M348.522 811.098L354.683 808.911" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.503 814.675L355.279 808.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 802.749H359.254" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.503 814.675H351.304" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.012 830.575H333.813" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.013 830.575L339.777 835.147" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M367.801 862.178L370.385 858.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M367.603 862.178L373.168 855.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M367.603 862.178H367.802" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.397 866.948H336.198" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.329 886.028L337.391 877.879" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.211 849.06L334.012 849.259" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M344.348 857.208L336.397 866.947" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M337.391 877.88L331.428 872.911" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M335.801 827.793V827.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M349.715 843.495H349.516" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.726 825.606L357.266 833.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M326.46 797.979L339.379 806.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.41 786.054L326.46 797.979" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M335.404 786.65L334.41 786.054" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M310.956 813.483L311.155 813.682" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M310.956 813.482L306.186 819.445" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M328.646 836.538L333.416 830.575" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M328.845 836.737L333.615 830.774" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M328.845 836.737L328.646 836.538" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M328.447 836.538L333.416 830.376" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M328.447 836.539H328.646" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M320.497 846.476L328.447 836.538" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M320.497 846.477H320.696" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M320.695 846.476L328.646 836.538" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M320.695 846.675L328.844 836.737" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M320.695 846.675V846.477" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M311.155 813.681L311.354 813.482" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M298.235 829.582L308.173 837.532" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M306.186 819.445L306.385 819.644" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M367.205 887.42L367.404 887.619" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.254 865.556L374.758 877.879" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.701 874.898L367.205 887.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.056 865.16L359.254 865.557" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M351.503 874.7L351.702 874.898" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M323.677 777.507V777.706" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M301.615 785.656L314.136 770.153" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M310.957 793.209L323.478 777.706" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M301.416 785.855L301.615 785.657" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M310.758 793.408L310.957 793.209" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M310.758 793.407L301.416 785.854" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.093 821.433L320.895 821.83" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.292 821.433H321.093" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M305.193 808.314V808.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M295.454 800.365L305.193 808.315" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M295.453 800.364L295.254 800.563" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M295.255 800.563L305.193 808.514" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.23 785.457H331.429" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.329 794.6L335.404 786.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M346.931 794.799L335.602 787.247" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.179 806.128L346.931 794.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.33 794.6V794.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M344.347 857.209L344.149 857.011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M337.192 878.079L331.229 873.11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M344.348 856.812L334.41 848.862" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M344.347 856.812V857.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M288.894 814.874L278.956 806.923" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M281.739 836.141L281.938 835.942" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M291.677 844.091L281.739 836.141" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M291.677 844.091L291.876 843.893" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M291.876 843.892L281.938 835.942" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M282.137 835.743L275.975 830.973" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M282.136 835.743L281.938 835.942" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M291.876 843.694L282.137 835.743" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M291.876 843.693V843.892" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.291 864.96L321.49 864.761" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M337.193 878.078L337.391 877.879" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.13 886.029L337.192 878.079" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.131 886.028H347.329" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M335.801 827.594L336.198 827.197" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.031 872.912L331.23 872.713" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M331.031 872.911L331.23 873.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M337.789 825.408V825.209" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M337.391 825.805L337.789 825.408" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.329 885.83L337.391 877.879" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M347.329 885.831V886.029" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M341.168 821.035L341.565 820.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M341.565 820.638L341.763 820.837" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.77 821.631V821.432" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.373 822.029L340.77 821.631" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M357.267 833.756L349.714 843.098" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.174 835.347L347.726 826.005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M357.664 833.557L349.714 843.495" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.777 835.544L347.727 825.606" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.578 835.544H339.777" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M357.068 833.557L349.515 842.899" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.372 806.725L347.925 795.595" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M334.409 786.054L331.428 790.427" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.577 823.023L339.975 822.426" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M338.783 823.818L339.18 823.421" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M339.179 823.421H339.378" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M338.783 824.017V823.818" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M338.385 824.414H338.584" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M338.186 824.812L338.385 824.414" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M337.987 824.811H338.186" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M338.186 824.811H337.987" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.595 826.799L336.993 826.203" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M336.994 826.203V826.402" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M693.781 198.327C689.855 193.173 687.15 187.196 685.87 180.845C684.591 174.494 684.77 167.935 686.394 161.663C688.018 155.391 691.045 149.57 695.246 144.638C699.447 139.706 704.713 135.792 710.647 133.192C716.581 130.591 723.027 129.372 729.501 129.625C735.975 129.879 742.307 131.598 748.019 134.655C753.731 137.712 758.675 142.025 762.478 147.271C766.28 152.516 768.843 158.556 769.971 164.936" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.706 865.159C321.508 865.159 321.508 864.96 321.508 864.761" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.59 864.96V864.761" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M320.912 821.234C320.959 821.268 320.999 821.312 321.025 821.364C321.052 821.416 321.066 821.474 321.066 821.532C321.066 821.59 321.052 821.648 321.025 821.7C320.999 821.752 320.959 821.797 320.912 821.83V821.83" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M266.252 823.221C266.177 823.143 266.12 823.048 266.085 822.945C266.051 822.842 266.04 822.732 266.054 822.625V822.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M341.465 820.836C341.664 820.637 341.863 820.637 341.863 820.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M341.466 820.837C341.573 820.729 341.713 820.659 341.863 820.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141H327.851" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141V612.339" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638H719.403" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638H719.403" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638V436.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073H244.571" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.073V303.272" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396H687.801" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396V379.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911H221.714" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911H221.714" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911V329.109" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 594.649V594.848" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022H713.639" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.022V439.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415H252.72" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.415V600.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377H341.168" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377H341.168" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377V606.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427H359.652" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M359.453 598.427V598.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396H1097.84" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396H1097.84" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396H1097.84" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396H1097.84" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396H1097.84" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396V699.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M421.863 226.551L377.739 245.632" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M433.59 253.781L421.863 226.551" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.758 277.831L375.155 279.023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M377.74 245.632L363.429 251.793" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M389.466 272.862L377.739 245.632" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M212.571 316.986L215.752 315.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M215.751 315.594L218.931 314.203" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M218.932 314.203L222.112 312.812" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M222.112 312.811L225.292 311.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M225.292 311.42L228.472 310.029" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M228.472 310.029L231.653 308.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M231.652 308.637L234.832 307.246" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M234.832 307.247L238.012 306.055" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M238.012 306.053L241.192 304.662" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M241.193 304.663L244.373 303.271" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M247.751 332.489L245.963 333.284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M245.963 333.283L242.783 334.476" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M242.783 334.476L239.602 335.867" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M239.602 335.868L236.422 337.259" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M236.422 337.259L233.242 338.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M233.242 338.651L230.062 340.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M230.062 340.042L226.882 341.433" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.272V303.073" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M319.503 608.763L325.267 606.378" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M321.888 614.527L319.503 608.763" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141L321.888 614.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M904.248 5.92969L778.633 65.1595" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.515 328.911L224.695 327.52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M224.696 327.52L227.876 326.129" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M227.876 326.128L231.056 324.737" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M231.055 324.737L234.235 323.346" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M234.236 323.346L237.416 321.955" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M237.416 321.955L240.596 320.563" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.596 320.563L242.186 319.967" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M249.739 315.793L246.558 317.185" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.559 317.185L243.379 318.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M243.379 318.576L240.199 319.967" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.198 319.967L237.018 321.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M237.019 321.358L233.839 322.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M233.838 322.75L230.658 323.942" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M230.658 323.942L227.478 325.334" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M227.478 325.334L224.298 326.725" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M224.298 326.726L221.118 328.117" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.118 328.314L224.298 326.923" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M224.298 326.924L227.478 325.532" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M227.478 325.532L230.658 324.141" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M230.658 324.141L233.838 322.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M233.839 322.75L237.218 321.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M237.217 321.358L240.397 320.166" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.398 320.165L243.578 318.774" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M243.578 318.775L246.758 317.383" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.757 317.383L249.739 315.992" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M249.938 315.992L249.74 315.793" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.919 328.911L220.72 329.11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.161 569.805L158.31 365.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.398 572.191L246.162 569.806" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M152.547 368.464L240.398 572.191" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M989.316 886.625L615.055 1046.43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M615.056 1046.43L608.497 1030.33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M608.496 1030.33L470.161 1058.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M470.161 1058.75L154.534 759.022" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M592.795 151.222L554.236 167.917" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M605.316 180.042L592.794 151.222" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M447.304 216.415L458.832 243.048" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M470.161 206.675L447.304 216.414" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M528.794 181.234L484.272 200.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M540.323 207.868L528.795 181.234" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M328.248 299.297L327.652 298.104" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M470.161 206.675L481.49 233.11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M484.272 200.514L470.161 206.675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M495.602 227.147L484.273 200.514" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M721.589 442.401L746.633 431.47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M710.857 348.787L685.813 359.52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M539.329 174.278L551.652 203.098" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M554.236 167.917L539.329 174.277" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M566.559 196.737L554.236 167.917" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.161 569.805L293.664 549.134" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M256.696 297.706L268.422 325.135" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M271.006 291.545L256.696 297.706" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M282.733 318.973L271.006 291.545" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M958.111 120.612L832.496 179.643" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M984.745 830.619L621.416 985.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M237.018 321.359L231.652 308.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M233.838 322.75L228.472 310.029" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M509.118 761.209L471.354 661.831" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M256.696 297.706L244.373 303.073" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M589.814 144.265L900.273 7.91699" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M328.248 299.296L248.347 333.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M551.652 203.097L328.248 299.296" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M602.335 181.234L551.652 203.097" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M216.547 354.353L258.485 336.266" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M362.833 251.396L421.268 226.153" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M297.044 540.985L216.745 354.551" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M293.665 549.135L299.429 546.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M208.398 351.172L293.665 549.135" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M848 185.209L970.832 446.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M896.099 745.109L1185.89 620.091" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.571 303.669L256.894 298.303" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M256.695 297.905L244.372 303.073" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M249.739 315.992L244.571 303.669" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M249.938 316.39L249.74 315.992" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M898.882 820.638L821.167 636.787" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M599.354 947.246L898.882 820.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M521.639 763.594L550.26 831.569" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M821.167 636.787L521.639 763.594" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.118 328.315L215.751 315.595" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M230.658 324.141L225.292 311.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.199 319.967L234.832 307.246" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M224.298 326.924L218.931 314.203" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M227.478 325.532L222.112 312.812" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M258.285 597.831L274.385 634.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M268.621 637.582V637.383" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M274.385 634.998L268.621 637.582" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M158.31 365.88L147.776 341.234" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M142.013 343.818L152.547 368.464" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M195.279 320.763L208.397 351.173" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M938.236 767.967L989.714 886.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.559 317.184L241.193 304.663" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M243.379 318.576L238.012 306.054" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M243.379 318.576L246.559 317.185" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M247.751 332.688L248.348 333.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M242.186 319.768L247.752 332.687" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.137 316.985L249.938 316.389" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M242.982 320.165L250.137 316.985" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M248.746 333.681L242.982 320.166" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M542.708 772.141L812.621 658.054" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M877.615 811.892L607.901 925.979" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M536.745 769.755L605.317 932.14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M910.211 854.626L935.453 844.092" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M551.453 202.501L540.124 207.47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M492.422 543.569L725.565 443.197" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M725.565 443.196L724.77 441.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M965.664 831.57L989.316 886.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M746.434 431.669L747.229 433.855" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M538.732 173.88L592.397 150.824" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M387.08 589.085L270.41 639.371" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M131.28 699.396L126.907 701.184" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M128.895 705.755L133.068 703.768" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.136 316.985L256.099 330.501" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M154.733 753.656L150.361 755.445" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M152.348 760.016L156.522 758.228" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M138.634 716.488L134.46 718.277" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M136.249 722.849L140.621 721.06" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34.4848 479.768L12.4227 428.886" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M110.012 661.83L125.913 698.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M604.919 187.197L685.217 373.632" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141L721.59 442.402" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M721.59 442.402L719.205 436.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 612.141L325.267 606.377" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.428 546.75L687.602 379.396" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M299.428 546.75L297.043 540.986" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M112.397 660.837L90.3353 609.756" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M271.006 291.544L363.428 251.792" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.758 277.831L327.653 298.104" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M250.137 594.649L109.814 655.072" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14.8075 434.452L155.13 374.029" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.398 572.19L252.522 600.414" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M812.621 137.309L816 144.464" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M817.788 148.438L832.496 179.643" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M190.112 323.147L152.547 339.246" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M152.547 339.247L147.777 341.234" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M256.298 297.905L256.099 297.309" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.36 278.029L374.758 278.626" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M216.746 354.551L216.547 354.352" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M951.95 433.458L965.267 461.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M248.348 333.88L214.161 348.588" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M568.745 875.098L599.354 947.247" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M784.596 906.699L816.993 893.382" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M818.384 892.786L848.794 880.066" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M850.384 879.47L882.782 865.954" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M884.372 865.358L908.621 855.222" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M937.043 843.296L961.093 833.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M962.484 832.762L965.665 831.57" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M688.994 358.128L688.795 357.532" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M610.881 176.862L604.919 179.446" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M458.634 242.452L433.391 253.383" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M374.957 278.625L327.851 298.899" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.453 612.141L328.248 614.327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.023L325.267 606.377" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M170.633 758.426L162.484 750.675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M214.161 348.588L201.043 318.377" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M653.416 961.358L685.416 948.041" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M686.807 947.446L717.614 934.725" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.006 934.129L751.006 920.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M319.503 608.763L271.801 629.433" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M685.814 359.52L608.1 178.849" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M604.72 186.998L604.919 187.197" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M605.316 180.041L602.335 181.234" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M951.95 433.457L962.286 428.488" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M327.652 298.104L282.137 317.582" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M226.882 341.433V341.631" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M212.572 316.986L212.373 316.787" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M778.633 65.1597L810.832 133.731" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M195.28 320.763L190.112 323.148" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M233.839 322.75L237.019 321.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M901.268 7.51915L904.646 6.72412" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M362.833 251.198L363.23 251.794" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M226.881 341.432L221.515 328.911" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.199 319.967L243.379 318.576" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M904.645 6.72521L904.248 5.93018" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M249.937 316.389L246.757 317.78" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.758 317.781L243.577 319.172" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M243.578 319.172L240.398 320.364" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.397 320.364L237.217 321.756" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M237.217 321.756L234.037 323.148" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M234.038 323.147L230.858 324.538" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M230.857 324.538L227.676 325.929" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M227.677 325.93L224.497 327.321" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M224.497 327.321L221.317 328.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M249.74 315.992H249.938" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.317 328.713L221.516 328.912" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.721 328.712L220.522 328.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M433.391 253.185L458.236 242.452" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M540.323 207.868V208.066" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M433.589 253.781V253.98" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.072H244.174" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M227.876 326.128L233.242 338.65" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.372 303.271L244.571 303.668" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M240.596 320.563L245.962 333.284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M237.416 321.955L242.782 334.476" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.72 328.712V328.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M234.236 323.346L239.602 335.867" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M231.055 324.737L236.422 337.259" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M224.696 327.52L230.063 340.041" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M962.286 129.358L904.646 6.72412" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M832.497 179.644L931.677 390.725" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M900.273 7.91754L901.267 7.52002" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M389.465 272.861L433.59 253.78" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M375.155 279.024L389.466 272.862" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M363.429 251.793L374.758 277.83" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M226.882 341.632L230.062 340.24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M230.062 340.241L233.242 338.85" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M233.242 338.849L236.422 337.458" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M236.422 337.458L239.602 336.066" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M239.602 336.066L242.783 334.675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M242.783 334.675L245.963 333.283" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M245.963 333.284L247.751 332.688" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.373 303.072L241.193 304.464" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M241.192 304.464L238.012 305.855" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M238.012 305.855L234.832 307.247" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M234.832 307.246L231.652 308.637" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M231.653 308.638L228.472 309.831" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M228.472 309.831L225.093 311.222" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M225.093 311.222L221.913 312.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.913 312.613L218.733 314.005" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M218.733 314.004L215.552 315.395" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M215.553 315.396L212.373 316.787" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M226.881 341.433L213.565 347.197" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M213.565 347.196L202.435 321.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M202.435 321.358L212.571 316.985" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M213.565 347.396L226.881 341.632" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M202.236 321.16L213.565 347.396" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M212.372 316.787L202.235 321.16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M124.522 648.713L29.5155 428.291" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M145.788 378.203L240.795 598.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M946.981 123.793L844.223 172.092" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M150.161 346.998L197.863 326.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.317 328.712L220.919 328.911" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.72 328.514L221.118 328.315" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.721 329.109L220.522 328.513" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.919 328.911L220.72 328.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.118 328.116L220.522 328.514" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.522 328.514L221.118 328.116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M481.49 233.11L495.602 227.147" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396L713.441 439.023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M845.417 31.1714L843.827 31.9664" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M813.415 45.2842L812.024 45.8805" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M877.217 17.2593L875.826 17.8555" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M910.211 854.625L909.813 854.028" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M908.621 855.222L910.211 854.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M849.988 878.874L848.597 879.47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M848.794 880.066L850.384 879.47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M495.602 227.147L540.322 207.868" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M458.832 243.048L481.491 233.11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M293.664 549.134L319.503 608.762" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M746.633 431.47L710.856 348.787" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M291.876 544.762L244.174 565.234" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M848 185.209L952.546 136.116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1090.88 402.849L962.286 129.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M965.266 461.88L1090.88 402.849" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M473.739 1046.23L170.435 758.426" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M615.652 1017.21L473.739 1046.23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M621.416 1031.12L615.652 1017.21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M162.484 750.674L154.534 759.022" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M237.018 321.358L240.198 319.967" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M472.348 776.712L509.118 761.209" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M451.28 721.06L472.348 776.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M422.261 731.992L451.279 721.06" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M405.168 686.874L422.261 731.992" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M471.354 661.83L405.167 686.874" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1183.5 632.613L1194.24 657.657" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1200 626.054L1183.5 632.613" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1197.81 611.346L1200 626.054" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1011.97 134.725L1197.81 611.346" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M946.782 10.3027L1011.97 134.725" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1170.78 614.128L1128.05 514.948" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M902.062 729.806L1170.78 614.129" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M859.329 630.824L902.062 729.806" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1128.05 514.948L859.329 630.824" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M528.397 180.836L528.596 181.432" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M592.397 150.824L592.596 151.42" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M315.925 271.47L316.124 272.066" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M553.64 167.321L553.838 167.918" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M377.341 245.036L377.54 245.632" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M270.41 291.147L270.609 291.743" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M483.677 200.116L483.875 200.712" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M258.484 336.265L270.807 330.899" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M270.807 330.899L604.72 186.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M216.546 354.352L214.161 348.588" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M538.732 173.88L551.254 202.7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M256.099 297.308L270.41 291.147" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M446.906 216.017L469.565 206.079" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M469.565 206.079L483.677 200.117" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M213.565 348.19L247.95 333.283" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M270.41 291.147L315.925 271.47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M458.235 242.451L446.906 216.017" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M610.882 176.861L688.795 357.532" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M816.596 892.787L816.994 893.383" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M818.385 892.786L818.187 891.991" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M816.993 893.383L818.385 892.787" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M717.217 933.929L717.615 934.724" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.006 934.127L718.807 933.333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M717.615 934.725L719.006 934.128" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M685.019 947.445L685.416 948.041" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M686.808 947.445L686.609 946.849" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M685.416 948.041L686.807 947.445" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M749.018 73.5083L749.416 74.1046" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M750.608 72.9111L749.018 73.5074" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M684.621 101.93L684.82 102.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M686.012 101.135L684.621 101.93" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M671.901 107.296L670.51 108.091" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M653.614 115.445L654.012 116.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M655.204 114.849L653.614 115.445" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M625.193 127.966L623.603 128.563" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M591.006 142.874L589.615 143.669" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M962.285 832.165L960.695 832.761" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M961.094 833.358L962.485 832.762" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M936.844 842.7L935.254 843.296" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M935.453 844.091L937.043 843.296" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M653.217 960.563L651.627 961.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M652.025 961.954L653.416 961.357" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M882.583 865.358L882.782 865.954" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M884.372 865.358L883.975 864.761" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M882.782 865.954L884.373 865.358" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M901.068 6.72412L899.478 7.51915" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M784.398 906.103L782.808 906.699" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M783.205 907.296L784.596 906.7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M720.993 85.8306L719.403 86.6256" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M782.211 58.998L780.621 59.5943" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M214.162 348.588L208.398 351.172" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.317 328.712L220.919 328.911" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M224.298 326.924L227.478 325.532" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M221.118 328.314L224.298 326.923" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1075.38 397.284L952.546 136.116" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M970.832 446.576L1075.38 397.284" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M952.546 136.116L848 185.209" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1185.89 620.091L1134.21 499.842" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M844.223 624.861L896.099 745.11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1134.21 499.843L844.223 624.861" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M244.174 303.072L244.372 303.271" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M220.72 328.514L221.118 328.315" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M270.807 330.899L258.484 336.265" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M230.658 324.141L233.838 322.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M227.478 325.532L230.658 324.141" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M152.547 368.464L158.311 365.88" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.44 698.998L938.236 767.967" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.44 698.998L939.826 767.171" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M752.596 920.016L783.204 907.296" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M710.459 348.19L710.658 348.787" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M252.521 600.414L258.285 597.831" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.64 699.396L1097.44 698.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M939.826 767.171L938.236 767.966" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M989.714 886.625H989.316" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M965.665 831.569L956.124 809.308" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M269.416 637.184L270.41 639.37" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M152.547 368.464L12.4227 428.886" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M246.558 317.185L249.739 315.992" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M620.423 975.072L652.025 961.954" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M152.347 367.867L7.65186 430.078" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7.65186 430.079L108.024 663.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M108.025 663.222L110.211 662.228" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M247.95 333.284L213.764 347.992" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M150.361 334.277L152.547 339.246" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M187.926 317.98L150.361 334.278" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M190.112 323.147L187.926 317.979" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M142.013 343.818L147.777 341.234" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M201.043 318.377L195.279 320.762" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M249.938 316.389L242.186 319.768" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M607.901 925.979L542.708 772.14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M812.621 658.054L877.615 811.893" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M883.777 814.477L815.007 652.092" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M605.317 932.141L883.776 814.477" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M815.007 652.092L536.746 769.756" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M34.4843 479.769L90.3352 609.756" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M492.422 543.569L387.081 589.085" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M469.565 206.079L469.764 206.675" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M688.795 357.532L710.46 348.19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M483.677 200.116L528.397 180.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M421.267 226.153L421.665 226.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M274.385 634.998L321.888 614.526" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M550.278 831.57L523.429 842.899L541.714 886.427L568.745 875.098" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M133.069 703.768L131.28 699.396" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M126.906 701.184L128.894 705.755" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M156.522 758.228L154.733 753.656" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M150.361 755.445L152.348 760.017" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M140.621 721.06L138.633 716.488" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M134.46 718.277L136.248 722.849" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M110.012 661.83L112.397 660.836" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M719.205 436.638L693.367 377.011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M30.1118 481.557L34.4845 479.769" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.24817 430.675L30.1115 481.557" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M128.1 698.004L125.913 698.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M693.366 377.01L685.813 359.52" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396L693.366 377.011" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M602.335 181.234L604.72 186.998" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M608.099 178.849L605.317 180.042" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M685.217 373.632L297.043 540.986" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M685.217 373.632L687.602 379.396" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M108.224 662.625L110.012 661.83" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M86.1613 611.544L108.223 662.625" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M90.3352 609.756L86.1613 611.545" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M713.441 439.023L719.205 436.638" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M687.602 379.396L713.441 439.023" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M115.18 652.687L20.1733 432.265" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M604.919 187.197L216.745 354.551" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M607.304 193.159L219.13 360.314" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M682.634 367.867L294.46 535.221" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1194.24 657.657L1097.64 699.396" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M898.881 21.4326L795.925 69.7307" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M946.981 123.793L898.881 21.4326" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M844.223 172.092L946.981 123.793" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M795.926 69.731L844.224 172.091" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M930.087 443.792L951.95 433.457" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M910.012 400.861L930.086 443.793" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M674.485 716.488L739.479 870.327" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M746.037 867.743L680.844 713.706" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M939.826 767.171V766.973" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M939.826 766.973L1097.44 698.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1097.44 698.998V698.799" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M752.398 919.421L750.808 920.017" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M752.596 920.017L752.397 919.421" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M751.006 920.613L752.596 920.017" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M258.286 597.831L246.161 569.806" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M112.397 660.837L252.521 600.415" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M393.64 583.718L412.522 575.569" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M340.969 606.377L359.453 598.427" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M910.012 400.861L931.676 390.725" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M159.851 729.557V710.459H173.101V712.712H162.435V718.675H171.776V720.927H162.435V727.288H173.367V729.54L159.851 729.557Z" fill="black"/>
              <path d="M177.259 729.557V710.46H182.095L189.797 729.557V710.46H192.215V729.557H187.246L179.71 710.46V729.557H177.259Z" fill="black"/>
              <path d="M201.275 729.557V712.712H194.865V710.459H210.203V712.712H203.793V729.557H201.275Z" fill="black"/>
              <path d="M218.981 721.59H215.37V729.557H212.853V710.459H219.213C223.056 710.459 226.567 711.818 226.567 716.058C226.567 718.973 224.911 720.646 221.731 721.192H221.648L228.422 729.474H225.424L218.981 721.59ZM215.37 719.602H219.478C222.476 719.602 223.967 718.443 223.967 716.141C223.967 713.54 221.946 712.712 219.428 712.712H215.37V719.602Z" fill="black"/>
              <path d="M240.546 710.459L246.84 729.557H244.041L242.385 724.919H233.639L231.983 729.557H229.349L235.66 710.459H240.546ZM234.368 722.65H241.954L238.161 710.459L234.368 722.65Z" fill="black"/>
              <path d="M249.209 729.557V710.459H254.046L261.747 729.557V710.459H264.166V729.557H259.197L251.677 710.459V729.557H249.209Z" fill="black"/>
              <path d="M276.439 727.834C277.718 727.841 278.959 727.399 279.946 726.585C280.933 725.77 281.602 724.636 281.839 723.379L284.406 723.876C284.028 725.676 283.015 727.281 281.553 728.396C280.09 729.512 278.276 730.065 276.439 729.955C270.593 729.955 267.611 725.499 267.611 720.017C267.611 714.534 270.593 710.079 276.439 710.079C278.282 709.947 280.11 710.495 281.577 711.617C283.045 712.74 284.051 714.361 284.406 716.174L281.839 716.687C281.67 715.397 281.02 714.217 280.019 713.385C279.018 712.553 277.739 712.129 276.439 712.199C272.448 712.199 270.261 715.594 270.261 720.017C270.261 724.439 272.183 727.834 276.439 727.834Z" fill="black"/>
              <path d="M287.851 729.557V710.459H301.102V712.712H290.435V718.675H299.777V720.927H290.435V727.288H301.367V729.54L287.851 729.557Z" fill="black"/>
              <path d="M89.7059 527.272H87.1055V508.174H89.7059V527.272ZM92.4885 508.174L96.5465 527.272L100.522 508.174H103.304L98.9812 527.272H94.0123L89.7059 508.174H92.4885ZM105.822 508.174V527.272H103.221V508.174H105.822Z" fill="black"/>
              <path d="M109.98 527.272V508.174H123.23V510.427H112.497V516.39H121.822V518.593H112.497V524.953H123.412V527.222L109.98 527.272Z" fill="black"/>
              <path d="M127.387 527.271V508.174H133.316C139.478 508.174 142.741 511.486 142.741 517.665C142.741 523.843 139.76 527.271 133.615 527.271H127.387ZM129.904 525.035H133.35C138.02 525.035 140.14 522.6 140.14 517.631C140.14 512.232 137.457 510.426 133.267 510.426H129.954L129.904 525.035Z" fill="black"/>
              <path d="M146.17 527.272V508.174H148.687V527.272H146.17Z" fill="black"/>
              <path d="M165.333 508.174H167.851V519.255C167.851 524.224 165.631 527.669 160.414 527.669C155.197 527.669 152.927 524.158 152.927 519.255V508.174H155.445V519.388C155.445 523.048 156.903 525.417 160.414 525.417C163.925 525.417 165.383 523.048 165.383 519.388L165.333 508.174Z" fill="black"/>
              <path d="M174.608 527.272H172.091V508.174H174.641L174.608 527.272ZM177.391 508.174L181.449 527.272L185.424 508.174H188.207L183.884 527.272H178.915L174.559 508.174H177.391ZM190.724 508.174V527.272H188.207V508.174H190.724Z" fill="black"/>
              <path d="M401.937 383.387V364.307H404.405V372.588H414.343V364.307H416.861V383.387H414.343V374.775H404.405V383.387H401.937Z" fill="black"/>
              <path d="M430.295 364.306L436.572 383.387H433.789L432.133 378.749H423.454L421.798 383.387H419.181L425.491 364.306H430.295ZM424.116 376.497H431.702L427.909 364.306L424.116 376.497Z" fill="black"/>
              <path d="M438.956 383.387V364.307H441.474V381.118H452.157V383.371L438.956 383.387Z" fill="black"/>
              <path d="M455.073 383.387V364.307H457.59V381.118H468.273V383.371L455.073 383.387Z" fill="black"/>
              <path d="M688.447 226.419C688.663 229.466 690.816 231.007 693.814 231.007C696.563 231.007 698.236 229.632 698.236 227.595C698.243 226.962 698.043 226.344 697.667 225.836C697.29 225.327 696.757 224.956 696.149 224.779C695.139 224.381 691.744 223.586 690.601 223.222C687.172 222.096 686.675 220.456 686.675 218.651C686.675 215.023 689.988 213.251 693.218 213.251C697.474 213.251 700.091 215.123 700.356 219.114L697.806 219.297C697.803 218.734 697.681 218.179 697.448 217.667C697.215 217.155 696.876 216.699 696.453 216.328C696.03 215.957 695.534 215.679 694.996 215.515C694.458 215.35 693.892 215.301 693.334 215.371C691.346 215.371 689.11 216.265 689.11 218.502C689.106 219 689.266 219.485 689.565 219.883C689.865 220.281 690.287 220.57 690.766 220.704C691.644 221.036 694.46 221.831 696.282 222.361C699.064 223.156 700.969 224.564 700.969 227.479C700.969 231.371 697.309 233.143 693.946 233.143C689.143 233.143 686.294 230.974 685.996 226.651L688.447 226.419Z" fill="black"/>
              <path d="M716.786 213.647H719.304V224.728C719.304 229.697 717.084 233.126 711.85 233.126C706.616 233.126 704.38 229.631 704.38 224.728V213.647H706.898V224.861C706.898 228.521 708.356 230.873 711.867 230.873C715.378 230.873 716.836 228.521 716.836 224.861L716.786 213.647Z" fill="black"/>
              <path d="M726.062 232.729H723.544V213.648H726.095L726.062 232.729ZM728.845 213.648L732.903 232.729L736.878 213.648H739.66L735.337 232.729H730.368L726.029 213.648H728.845ZM742.178 213.648V232.729H739.66V213.648H742.178Z" fill="black"/>
              <path d="M748.919 232.728H746.385V213.647H748.919V232.728ZM751.702 213.647L755.759 232.728L759.735 213.647H762.517L758.194 232.728H753.225L748.919 213.647H751.702ZM765.035 213.647V232.728H762.517V213.647H765.035Z" fill="black"/>
              <path d="M769.275 232.728V213.647H782.525V215.9H771.859V221.863H781.2V224.115H771.859V230.476H782.79V232.728H769.275Z" fill="black"/>
              <path d="M792.811 224.778H789.217V232.729H786.699V213.648H793.06C796.902 213.648 800.397 214.99 800.397 219.246C800.397 222.161 798.741 223.818 795.577 224.381H795.495L802.252 232.662H799.254L792.811 224.778ZM789.217 222.791H793.325C796.306 222.791 797.797 221.631 797.797 219.313C797.797 216.712 795.776 215.901 793.258 215.901H789.217V222.791Z" fill="black"/>
              <path d="M688.447 249.607C688.662 252.654 690.816 254.195 693.814 254.195C696.563 254.195 698.236 252.82 698.236 250.783C698.243 250.15 698.043 249.532 697.666 249.024C697.29 248.515 696.757 248.144 696.149 247.967C695.139 247.569 691.743 246.774 690.6 246.41C687.172 245.284 686.675 243.644 686.675 241.839C686.675 238.211 689.988 236.439 693.217 236.439C697.474 236.439 700.091 238.311 700.356 242.302L697.805 242.485C697.803 241.922 697.681 241.367 697.448 240.855C697.214 240.343 696.875 239.887 696.453 239.516C696.03 239.145 695.533 238.867 694.996 238.703C694.458 238.538 693.891 238.489 693.333 238.559C691.346 238.559 689.11 239.453 689.11 241.69C689.106 242.188 689.266 242.673 689.565 243.071C689.864 243.469 690.286 243.758 690.766 243.892C691.644 244.224 694.46 245.019 696.282 245.549C699.064 246.344 700.969 247.752 700.969 250.667C700.969 254.559 697.308 256.331 693.946 256.331C689.143 256.331 686.294 254.162 685.996 249.839L688.447 249.607Z" fill="black"/>
              <path d="M708.406 255.917V239.089H701.996V236.836H717.35V239.089H710.924V255.917H708.406Z" fill="black"/>
              <path d="M728.148 236.837L734.442 255.918H731.66L730.003 251.28H721.242L719.585 255.918H716.952L723.262 236.837H728.148ZM721.97 249.027H729.556L725.73 236.837L721.97 249.027Z" fill="black"/>
              <path d="M744.132 254.194C745.124 254.235 746.114 254.066 747.036 253.698C747.958 253.33 748.792 252.771 749.482 252.057V248.463H743.834V246.244H751.934V252.952C750.941 254.046 749.721 254.91 748.359 255.482C746.997 256.054 745.526 256.321 744.05 256.264C738.219 256.264 734.691 251.809 734.691 246.327C734.691 240.844 738.004 236.389 743.785 236.389C748.141 236.389 750.841 238.393 751.669 242.086L749.151 242.699C748.958 241.439 748.288 240.302 747.28 239.522C746.272 238.742 745.003 238.379 743.735 238.509C739.76 238.509 737.342 241.821 737.342 246.327C737.342 250.832 739.892 254.194 744.132 254.194Z" fill="black"/>
              <path d="M755.627 255.918V236.837H768.878V239.09H758.211V245.052H767.553V247.305H758.211V253.665H769.143V255.918H755.627Z" fill="black"/>
              <path d="M780.389 255.918V236.837H787.263C791.139 236.837 793.888 238.394 793.888 241.806C793.945 242.726 793.687 243.639 793.158 244.394C792.628 245.149 791.858 245.702 790.973 245.963C792.028 246.142 792.986 246.687 793.68 247.501C794.373 248.316 794.758 249.349 794.766 250.419C794.766 254.46 791.901 255.934 787.578 255.934L780.389 255.918ZM782.907 245.052H787.015C789.218 245.052 791.338 244.439 791.338 242.104C791.338 239.504 789.201 239.09 786.7 239.09H782.907V245.052ZM782.907 253.665H787.627C790.228 253.665 792.133 253.003 792.133 250.352C792.133 247.702 789.748 247.255 787.296 247.255H782.907V253.665Z" fill="black"/>
              <path d="M802.783 255.918V247.885L795.296 236.837H798.344L804.091 245.764L809.739 236.837H812.654L805.234 247.885V255.918H802.783Z" fill="black"/>
              <path d="M687.47 273.673C687.47 275.611 688.315 277.383 690.568 277.383C693.118 277.383 693.681 275.395 693.681 273.192V259.942H696.199V272.977C696.199 277.151 694.228 279.42 690.568 279.42C689.832 279.486 689.092 279.388 688.4 279.133C687.707 278.877 687.081 278.47 686.565 277.942C686.05 277.414 685.658 276.777 685.419 276.079C685.181 275.381 685.1 274.638 685.185 273.905L687.47 273.673Z" fill="black"/>
              <path d="M709.665 260.025L715.942 279.106H713.16L711.503 274.468H702.758L701.102 279.106H698.567L704.878 260.025H709.665ZM703.487 272.215H711.056L707.263 260.025L703.487 272.215Z" fill="black"/>
              <path d="M725.631 277.383C726.625 277.422 727.617 277.253 728.541 276.885C729.466 276.517 730.302 275.958 730.997 275.246V271.652H725.349V269.433H733.432V276.141C732.441 277.237 731.221 278.102 729.859 278.674C728.496 279.246 727.025 279.512 725.548 279.453C719.718 279.453 716.19 274.998 716.19 269.516C716.19 264.033 719.503 259.578 725.283 259.578C729.639 259.578 732.339 261.582 733.167 265.275L730.65 265.888C730.457 264.628 729.787 263.491 728.779 262.711C727.771 261.931 726.501 261.568 725.233 261.698C721.258 261.698 718.857 265.01 718.857 269.516C718.857 274.021 721.391 277.383 725.631 277.383Z" fill="black"/>
              <path d="M737.143 279.106V260.025H750.31V262.277H739.66V268.24H748.919V270.493H739.594V276.853H750.575V279.106H737.143Z" fill="black"/>
              <path d="M760.662 271.155H757.068V279.105H754.551V260.024H760.911C764.753 260.024 768.248 261.366 768.248 265.623C768.248 268.538 766.592 270.194 763.428 270.757H763.346L770.103 279.039H767.139L760.662 271.155ZM757.068 269.167H761.176C764.174 269.167 765.648 268.008 765.648 265.689C765.648 263.089 763.644 262.277 761.126 262.277H757.068V269.167Z" fill="black"/>
              <path d="M776.728 279.105L770.633 260.024H773.366L779.296 279.105L785.424 260.024H787.991L781.863 279.105H776.728Z" fill="black"/>
              <path d="M790.327 279.105V260.024H792.844V279.105H790.327Z" fill="black"/>
              <path d="M797.134 279.106V260.025H803.991C807.867 260.025 810.617 261.582 810.617 264.994C810.67 265.914 810.411 266.825 809.882 267.579C809.353 268.334 808.585 268.888 807.702 269.151C808.755 269.333 809.711 269.879 810.404 270.693C811.097 271.507 811.483 272.538 811.495 273.607C811.495 277.648 808.629 279.122 804.306 279.122L797.134 279.106ZM799.652 268.24H803.76C805.962 268.24 808.083 267.627 808.083 265.292C808.083 262.692 805.929 262.277 803.445 262.277H799.652V268.24ZM799.652 276.853H804.372C806.973 276.853 808.878 276.191 808.878 273.54C808.878 270.89 806.492 270.443 804.025 270.443H799.652V276.853Z" fill="black"/>
              <path d="M814.99 279.106V260.025H828.24V262.277H817.573V268.24H826.915V270.493H817.573V276.853H828.422V279.106H814.99Z" fill="black"/>
              <path d="M833.391 272.795C833.414 273.457 833.574 274.107 833.861 274.704C834.148 275.301 834.556 275.832 835.059 276.264C835.562 276.695 836.149 277.017 836.782 277.21C837.416 277.402 838.083 277.461 838.741 277.383C841.507 277.383 843.163 276.008 843.163 273.971C843.176 273.337 842.978 272.717 842.6 272.207C842.223 271.697 841.687 271.328 841.076 271.155C840.066 270.758 836.67 269.963 835.544 269.598C832.116 268.472 831.619 266.832 831.619 265.027C831.619 261.4 834.931 259.627 838.244 259.627C842.484 259.627 845.101 261.499 845.383 265.491L842.832 265.673C842.827 265.11 842.703 264.554 842.468 264.042C842.233 263.53 841.892 263.074 841.468 262.703C841.044 262.333 840.547 262.056 840.008 261.891C839.469 261.726 838.902 261.677 838.343 261.748C836.356 261.748 834.136 262.642 834.136 264.878C834.132 265.376 834.292 265.862 834.592 266.26C834.891 266.658 835.313 266.946 835.793 267.081C836.654 267.412 839.47 268.207 841.292 268.737C844.091 269.532 845.995 270.94 845.995 273.855C845.995 277.748 842.335 279.52 838.973 279.52C834.169 279.52 831.304 277.35 831.006 273.027L833.391 272.795Z" fill="black"/>
              <path d="M126.924 701.184L7.66907 430.079L152.348 367.867L142.029 343.818L152.563 339.246L150.361 334.277L187.942 317.979L190.112 323.147L201.06 318.377L200.812 322.12L904.265 5.92969L946.799 10.3024L1011.99 134.725L1197.81 611.346L1200 626.054L1183.5 632.613L1194.24 657.656L938.253 767.967L989.317 886.625L615.073 1046.43L608.497 1030.33L470.178 1058.75L154.551 759.023" stroke="black" strokeWidth="7" strokeMiterlimit="10"/>
              <path d="M594.882 834.103C595.874 834.144 596.863 833.974 597.785 833.606C598.707 833.238 599.541 832.679 600.232 831.967V828.323H594.584V826.087H602.667V832.712C601.678 833.807 600.461 834.671 599.101 835.243C597.742 835.816 596.273 836.082 594.799 836.025C588.969 836.025 585.441 831.569 585.441 826.087C585.441 820.604 588.754 816.149 594.534 816.149C598.874 816.149 601.59 818.17 602.402 821.847L599.884 822.459C599.691 821.203 599.024 820.068 598.019 819.288C597.015 818.509 595.75 818.144 594.484 818.269C590.509 818.269 588.091 821.664 588.091 826.087C588.091 830.509 590.592 834.103 594.882 834.103Z" fill="black"/>
              <path d="M614.227 816.729L620.505 835.826H617.722L616.066 831.172H607.32L605.664 835.826H603.163L609.457 816.729H614.227ZM608.132 828.936H615.718L611.842 816.729L608.132 828.936Z" fill="black"/>
              <path d="M629.018 827.876H625.407V835.843H622.89V816.729H629.25C633.093 816.729 636.588 818.087 636.588 822.327C636.588 825.242 634.931 826.915 631.768 827.462L638.542 835.743H635.461L629.018 827.876ZM625.407 825.888H629.515C632.513 825.888 634.004 824.729 634.004 822.427C634.004 819.826 631.983 818.998 629.465 818.998H625.407V825.888Z" fill="black"/>
              <path d="M640.828 835.843V816.729H646.774C652.919 816.729 656.182 820.042 656.182 826.22C656.182 832.398 653.217 835.826 647.056 835.826L640.828 835.843ZM643.346 833.607H646.791C651.462 833.607 653.582 831.172 653.582 826.203C653.582 820.803 650.899 818.998 646.708 818.998H643.395L643.346 833.607Z" fill="black"/>
              <path d="M659.611 835.843V816.729H672.861V818.982H662.128V825.011H671.47V827.263H662.128V833.623H673.06V835.893L659.611 835.843Z" fill="black"/>
              <path d="M677.035 835.843V816.729H681.855L689.573 835.826V816.729H691.975V835.826H687.006L679.437 816.729V835.826L677.035 835.843Z" fill="black"/>
              <path d="M64.6132 744.679H122.203" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M106.518 728.795L122.534 744.811L107.329 760.033" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div className='partners-title--wrap' id='partners'></div>
        <div className='about-section--name-wrap'>
          <div className='about-section--name is-partners'>ПАРТНЁРЫ ФЕСТИВАЛЯ</div>
        </div>
        <div className='partners-subtitle--wrap'>Официальные партнеры:</div>
        <div className='partners-items--wrap'>
          <div className='partners-items--single'>
            <svg width="209" height="63" viewBox="0 0 209 63" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M91.2917 21.8944H87.8926V13.0724H91.1492C93.2293 13.0724 94.1005 13.8866 94.1005 15.283C94.1176 15.7033 94.0059 16.1188 93.7804 16.4738C93.5549 16.8289 93.2262 17.1066 92.8385 17.2697C93.2856 17.3858 93.6799 17.6506 93.9565 18.0205C94.2332 18.3905 94.3758 18.8435 94.361 19.3052C94.3488 20.954 93.4206 21.8944 91.2917 21.8944ZM90.9456 14.3792H89.5534V16.6875H91.0759C91.2425 16.7036 91.4106 16.6835 91.5687 16.6285C91.7268 16.5736 91.8712 16.485 91.9918 16.369C92.1125 16.253 92.2066 16.1122 92.2677 15.9564C92.3289 15.8005 92.3556 15.6333 92.346 15.4662C92.3623 14.8555 91.9959 14.3792 90.9456 14.3792ZM91.0881 17.9943H89.5534V20.5509H91.1573C92.1913 20.5509 92.5739 20.0258 92.5739 19.2197C92.5739 18.495 92.2076 17.9943 91.1044 17.9943H91.0881Z" fill="#096EB7"/>
              <path d="M96.2988 21.8944V13.0724H101.864V14.4403H98.0208V16.5572H101.233V17.921H98.0208V20.4899H102.018V21.8944H96.2988Z" fill="#096EB7"/>
              <path d="M109.472 21.8944L107.229 15.2341L104.969 21.8944H103.235L106.362 13.0724H108.12L111.283 21.8944H109.472Z" fill="#096EB7"/>
              <path d="M117.78 21.8944V16.0077L114.25 21.8944H112.691V13.0724H114.32V18.9754L117.853 13.0684H119.396V21.8944H117.78Z" fill="#096EB7"/>
              <path d="M126.817 21.8944L124.261 17.9332L123.414 18.8981V21.8944H121.692V13.0724H123.414V16.7364L126.545 13.0724H128.58L125.393 16.6631L128.902 21.8944H126.817Z" fill="#096EB7"/>
              <path d="M133.855 22.0735C131.523 22.0735 129.943 20.2904 129.943 17.518C129.943 14.6683 131.511 12.9055 133.855 12.9055C136.2 12.9055 137.759 14.6886 137.759 17.5058C137.759 20.323 136.172 22.0735 133.855 22.0735ZM133.855 14.2856C132.512 14.2856 131.726 15.5558 131.726 17.4936C131.726 19.4314 132.512 20.6934 133.855 20.6934C135.199 20.6934 135.993 19.3988 135.993 17.518C135.98 15.568 135.211 14.2856 133.843 14.2856H133.855Z" fill="#096EB7"/>
              <path d="M143.129 21.8944H139.714V13.0724H145.279V14.4159H141.424V16.5328H143.243C145.038 16.5328 146.093 17.5058 146.093 19.2563C146.121 20.6934 145.279 21.8944 143.129 21.8944ZM143.129 17.8762H141.424V20.5509H142.958C143.956 20.5509 144.359 19.9688 144.359 19.2075C144.359 18.4462 143.996 17.8762 143.129 17.8762Z" fill="#096EB7"/>
              <path d="M151.6 18.5398H149.781V21.8944H148.059V13.0724H151.47C153.619 13.0724 154.466 14.3344 154.466 15.7715C154.45 17.518 153.375 18.5398 151.6 18.5398ZM151.315 14.4159H149.781V17.233H151.47C152.349 17.233 152.716 16.545 152.716 15.8285C152.734 15.6377 152.71 15.4452 152.645 15.2648C152.58 15.0845 152.476 14.9208 152.34 14.7856C152.204 14.6505 152.04 14.5472 151.859 14.4832C151.678 14.4193 151.486 14.3963 151.295 14.4159H151.315Z" fill="#096EB7"/>
              <path d="M161.304 21.8944V16.0076L157.775 21.8944H156.216V13.0724H157.844V18.9754L161.369 13.0724H162.916V21.8944H161.304Z" fill="#096EB7"/>
              <path d="M168.555 14.4973V21.8944H166.821V14.4973H164.419V13.0724H170.957V14.4973H168.555Z" fill="#096EB7"/>
              <path d="M177.841 21.8944L177.197 19.9443H173.941L173.31 21.8944H171.588L174.714 13.0724H176.473L179.636 21.8944H177.841ZM175.557 14.9736L174.397 18.5683H176.754L175.557 14.9736Z" fill="#096EB7"/>
              <path d="M186.019 21.8944V17.9332H182.786V21.8944H181.064V13.0724H182.786V16.5328H186.019V13.0724H187.757V21.8944H186.019Z" fill="#096EB7"/>
              <path d="M195.157 21.8944V16.0077L191.627 21.8944H190.068V13.0724H191.697V18.9754L195.226 13.0684H196.773V21.8944H195.157Z" fill="#096EB7"/>
              <path d="M203.498 21.8944V18.1979H202.118L200.449 21.8944H198.572L200.449 17.9577C199.452 17.6157 198.89 16.7364 198.89 15.5558C198.89 14.0454 199.879 13.0724 201.935 13.0724H205.24V21.8944H203.498ZM203.498 14.4159H202.077C201.08 14.4159 200.64 14.8922 200.64 15.6372C200.626 15.8054 200.65 15.9745 200.71 16.1324C200.769 16.2903 200.863 16.4329 200.985 16.5498C201.106 16.6668 201.253 16.7552 201.413 16.8086C201.573 16.862 201.743 16.879 201.91 16.8585H203.539L203.498 14.4159Z" fill="#096EB7"/>
              <path d="M91.4341 32.2674H89.6186V35.6219H87.8926V26.8H91.3039C93.4573 26.8 94.2999 28.0579 94.2999 29.4991C94.2999 31.2456 93.2293 32.2674 91.4341 32.2674ZM91.1492 28.1434H89.6186V30.9606H91.3039C92.1832 30.9606 92.5536 30.2726 92.5536 29.5561C92.5724 29.3666 92.5491 29.1753 92.4853 28.9959C92.4215 28.8165 92.3188 28.6535 92.1846 28.5184C92.0504 28.3834 91.8879 28.2798 91.7089 28.2149C91.5299 28.1501 91.3387 28.1257 91.1492 28.1434Z" fill="#006DB8"/>
              <path d="M99.6405 35.8011C97.308 35.8011 95.7285 34.0179 95.7285 31.2456C95.7285 28.3958 97.2957 26.6331 99.6405 26.6331C101.985 26.6331 103.536 28.4162 103.536 31.2333C103.536 34.0505 101.957 35.8011 99.6405 35.8011ZM99.6405 28.0131C98.2972 28.0131 97.5115 29.2833 97.5115 31.2211C97.5115 33.1589 98.2972 34.421 99.6405 34.421C100.984 34.421 101.778 33.1264 101.778 31.2456C101.765 29.2955 100.992 28.0131 99.6283 28.0131H99.6405Z" fill="#006DB8"/>
              <path d="M112.114 34.2052C111.791 34.7032 111.346 35.1109 110.822 35.3901C110.298 35.6692 109.712 35.8106 109.118 35.801C106.537 35.801 105.161 33.9569 105.161 31.2455C105.161 28.4406 106.741 26.6331 109.069 26.6331C109.64 26.6167 110.207 26.7442 110.716 27.0038C111.225 27.2634 111.661 27.6469 111.984 28.119L110.819 28.9861C110.632 28.6886 110.373 28.4433 110.065 28.2731C109.758 28.103 109.412 28.0135 109.061 28.0131C107.726 28.0131 106.932 29.2711 106.932 31.2211C106.932 33.1711 107.746 34.421 109.118 34.421C109.879 34.421 110.486 33.9813 110.999 33.2566L112.114 34.2052Z" fill="#006DB8"/>
              <path d="M120.397 34.2052C120.074 34.7032 119.629 35.1109 119.105 35.3901C118.581 35.6692 117.995 35.8106 117.401 35.801C114.82 35.801 113.44 33.9569 113.44 31.2455C113.44 28.4406 115.024 26.6331 117.352 26.6331C117.924 26.6167 118.49 26.7442 118.999 27.0038C119.509 27.2634 119.945 27.6469 120.267 28.119L119.099 28.9861C118.912 28.6883 118.653 28.4428 118.345 28.2726C118.037 28.1025 117.692 28.0132 117.34 28.0131C116.009 28.0131 115.211 29.2711 115.211 31.2211C115.211 33.1711 116.025 34.421 117.401 34.421C118.163 34.421 118.765 33.9813 119.278 33.2566L120.397 34.2052Z" fill="#006DB8"/>
              <path d="M127.175 35.6219V29.7352L123.646 35.6219H122.087V26.8H123.715V32.7071L127.245 26.8H128.791V35.6219H127.175Z" fill="#006DB8"/>
              <path d="M135.504 35.6219V31.9254H134.128L132.468 35.6219H130.587L132.455 31.6852C131.458 31.3392 130.896 30.4639 130.896 29.2833C130.896 27.773 131.885 26.8 133.941 26.8H137.247V35.6219H135.504ZM135.504 28.1434H134.067C133.07 28.1434 132.63 28.6197 132.63 29.3647C132.616 29.5331 132.639 29.7026 132.698 29.8608C132.758 30.0191 132.852 30.162 132.973 30.2791C133.095 30.3963 133.242 30.4846 133.402 30.5378C133.563 30.5909 133.733 30.6074 133.9 30.5861H135.504V28.1434Z" fill="#006DB8"/>
              <path d="M89.6186 41.9524V49.3495H87.8926V40.5275H93.4207V41.9524H89.6186Z" fill="#EE2D2F"/>
              <path d="M98.6032 49.5286C96.2748 49.5286 94.6953 47.7455 94.6953 44.9731C94.6953 42.1234 96.2626 40.3606 98.6032 40.3606C100.944 40.3606 102.503 42.1437 102.503 44.9609C102.503 47.778 100.924 49.5286 98.6032 49.5286ZM98.6032 41.7407C97.2558 41.7407 96.4742 43.0108 96.4742 44.9487C96.4742 46.8865 97.2558 48.1485 98.6032 48.1485C99.9507 48.1485 100.74 46.8539 100.74 44.9731C100.716 43.0231 99.9588 41.7407 98.5951 41.7407H98.6032Z" fill="#EE2D2F"/>
              <path d="M110.791 50.9168V49.3495H105.417V50.9168H103.789V47.945H104.603L107.229 40.5275H108.987L111.65 47.945H112.435V50.9168H110.791ZM108.092 42.6892L106.309 47.945H109.875L108.092 42.6892Z" fill="#EE2D2F"/>
              <path d="M124.379 49.3495V43.7355L122.49 48.1729H121.395L119.587 43.8088V49.3617H117.959V40.5275H119.705L121.977 46.0926L124.326 40.5275H126.015V49.3495H124.379Z" fill="#EE2D2F"/>
              <path d="M131.89 47.6233C131.165 49.1826 130.416 49.4675 128.8 49.4675H128.206V48.0427H128.775C129.895 48.0427 130.025 47.7903 130.44 46.9231L127.518 40.5275H129.337L131.373 45.0912L133.408 40.5275H135.203L131.89 47.6233Z" fill="#EE2D2F"/>
              <path d="M139.274 49.5286C138.097 49.5286 137.206 49.2762 136.099 48.1119L137.1 47.0901C137.648 47.7068 138.414 48.0864 139.237 48.1485C140.426 48.1485 140.975 47.5053 140.975 46.6992C140.975 46.0194 140.524 45.4779 139.274 45.4779H138.167V44.0979H139.262C140.406 44.0979 140.747 43.4424 140.747 42.8765C140.747 42.3107 140.34 41.7611 139.274 41.7611C138.492 41.7787 137.75 42.1034 137.206 42.6648L136.221 41.6512C136.608 41.2212 137.086 40.8839 137.621 40.664C138.156 40.4441 138.733 40.3474 139.31 40.381C141.403 40.381 142.486 41.4395 142.486 42.8521C142.483 43.2375 142.371 43.6143 142.163 43.9386C141.955 44.2629 141.659 44.5214 141.309 44.6841C141.734 44.8193 142.103 45.0882 142.362 45.4507C142.621 45.8132 142.756 46.2498 142.746 46.6952C142.746 48.348 141.509 49.5286 139.274 49.5286Z" fill="#EE2D2F"/>
              <path d="M148.119 49.3495H144.708V40.5275H146.43V43.9879H148.25C150.045 43.9879 151.099 44.9609 151.099 46.7074C151.115 48.1485 150.273 49.3495 148.119 49.3495ZM148.119 45.3314H146.43V48.006H147.965C148.962 48.006 149.369 47.4361 149.369 46.6748C149.369 45.9135 148.986 45.3314 148.119 45.3314ZM152.21 49.3495V40.5275H153.945V49.3495H152.21Z" fill="#EE2D2F"/>
              <path d="M161.37 49.3495L158.814 45.3884L157.971 46.3532V49.3495H156.249V40.5275H157.971V44.1915L161.097 40.5275H163.133L159.949 44.1182L163.454 49.3495H161.37Z" fill="#EE2D2F"/>
              <path d="M169.919 49.3495V43.4627L166.389 49.3495H164.83V40.5275H166.458V46.4346L169.992 40.5275H171.547V49.3495H169.919Z" fill="#EE2D2F"/>
              <path d="M178.838 40.5275L174.803 49.3495H173.627L177.653 40.5275H178.838Z" fill="#006DB8"/>
              <path d="M186.474 49.3495H180.469V48.287L182.55 46.17C183.824 44.8632 184.312 44.1019 184.312 43.1737C184.323 42.9785 184.293 42.7832 184.224 42.6002C184.156 42.4172 184.049 42.2505 183.913 42.1107C183.776 41.9709 183.612 41.8611 183.43 41.7883C183.249 41.7155 183.054 41.6813 182.859 41.6878C182.531 41.7034 182.211 41.7982 181.928 41.9641C181.644 42.13 181.405 42.362 181.231 42.6404L180.115 41.7937C180.453 41.3327 180.898 40.961 181.411 40.7106C181.925 40.4602 182.491 40.3387 183.062 40.3566C184.772 40.3566 186.01 41.4028 186.01 43.1737C186.01 44.395 185.196 45.4209 183.942 46.7155L182.721 47.9776H186.441L186.474 49.3495Z" fill="#006DB8"/>
              <path d="M191.29 49.5083C189.136 49.5083 188.033 47.5704 188.033 44.965C188.033 42.2048 189.21 40.3525 191.29 40.3525C193.37 40.3525 194.571 42.2537 194.571 44.9528C194.571 47.6519 193.394 49.5083 191.29 49.5083ZM191.29 41.6837C190.565 41.6837 189.792 42.3392 189.792 44.9406C189.792 47.5419 190.565 48.177 191.278 48.177C191.99 48.177 192.8 47.5338 192.8 44.965C192.8 42.3961 192.027 41.6919 191.29 41.6919V41.6837Z" fill="#006DB8"/>
              <path d="M199.517 49.3495H197.791V42.4287C197.291 42.7092 196.735 42.876 196.163 42.9173V41.5982C196.855 41.5372 197.734 41.1586 198.044 40.5398H199.505L199.517 49.3495Z" fill="#006DB8"/>
              <path d="M203.486 47.4361C203.657 47.6614 203.876 47.8456 204.128 47.9752C204.379 48.1049 204.656 48.1766 204.939 48.1852C205.973 48.1852 206.722 47.1593 206.767 45.2947C206.53 45.5995 206.225 45.8449 205.877 46.0116C205.528 46.1784 205.146 46.2618 204.76 46.2555C203.132 46.2555 202.191 45.079 202.191 43.4505C202.191 41.8221 203.213 40.3728 205.175 40.3728C207.398 40.3728 208.432 42.2496 208.432 44.7574C208.432 47.7333 207.304 49.5164 204.984 49.5164C204.519 49.5343 204.056 49.4435 203.632 49.2513C203.208 49.0591 202.835 48.7707 202.541 48.4091L203.486 47.4361ZM205.175 41.6308C204.361 41.6308 203.856 42.4165 203.856 43.4139C203.856 44.2851 204.32 44.9975 205.151 44.9975C205.488 44.9698 205.808 44.84 206.069 44.6254C206.33 44.4108 206.52 44.1217 206.612 43.7966C206.6 42.4776 206.042 41.6308 205.175 41.6308Z" fill="#006DB8"/>
              <path d="M7.82908 21.8537C7.54152 21.8537 7.26568 21.9676 7.06197 22.1706C6.85825 22.3736 6.74326 22.649 6.74219 22.9366V40.0634C6.74219 40.3517 6.8567 40.6282 7.06053 40.832C7.26436 41.0359 7.54082 41.1504 7.82908 41.1504C8.11734 41.1504 8.3938 41.0359 8.59763 40.832C8.80146 40.6282 8.91597 40.3517 8.91597 40.0634V22.9366C8.91489 22.649 8.79991 22.3736 8.59619 22.1706C8.39248 21.9676 8.11664 21.8537 7.82908 21.8537Z" fill="#EE2D2F"/>
              <path d="M1.56833 28.3836C1.2804 28.3847 1.00457 28.4996 0.800973 28.7032C0.597373 28.9068 0.482518 29.1827 0.481445 29.4706V33.5416C0.481445 33.8299 0.595956 34.1064 0.799788 34.3102C1.00362 34.5141 1.28007 34.6286 1.56833 34.6286C1.8566 34.6286 2.13305 34.5141 2.33688 34.3102C2.54071 34.1064 2.65523 33.8299 2.65523 33.5416V29.4706C2.65415 29.1827 2.5393 28.9068 2.3357 28.7032C2.1321 28.4996 1.85627 28.3847 1.56833 28.3836Z" fill="#EE2D2F"/>
              <path d="M14.0899 10.642C13.8023 10.642 13.5265 10.756 13.3228 10.959C13.1191 11.1619 13.0041 11.4373 13.003 11.7249V51.2751C12.9939 51.4232 13.0153 51.5715 13.0657 51.711C13.1161 51.8505 13.1945 51.9783 13.2962 52.0863C13.3978 52.1944 13.5205 52.2805 13.6566 52.3393C13.7928 52.3982 13.9395 52.4286 14.0879 52.4286C14.2362 52.4286 14.383 52.3982 14.5191 52.3393C14.6553 52.2805 14.7779 52.1944 14.8796 52.0863C14.9812 51.9783 15.0596 51.8505 15.1101 51.711C15.1605 51.5715 15.1818 51.4232 15.1727 51.2751V11.7249C15.1727 11.4377 15.0586 11.1623 14.8556 10.9592C14.6525 10.7561 14.3771 10.642 14.0899 10.642Z" fill="#EE2D2F"/>
              <path d="M20.3466 18.7841C20.059 18.7852 19.7836 18.9002 19.5807 19.1039C19.3777 19.3076 19.2638 19.5835 19.2638 19.8711V43.1289C19.2547 43.277 19.276 43.4253 19.3264 43.5648C19.3768 43.7044 19.4553 43.8321 19.5569 43.9401C19.6585 44.0482 19.7812 44.1343 19.9174 44.1931C20.0535 44.252 20.2003 44.2824 20.3486 44.2824C20.4969 44.2824 20.6437 44.252 20.7799 44.1931C20.916 44.1343 21.0387 44.0482 21.1403 43.9401C21.2419 43.8321 21.3204 43.7044 21.3708 43.5648C21.4212 43.4253 21.4425 43.277 21.4335 43.1289V19.8711C21.4335 19.5828 21.319 19.3063 21.1151 19.1025C20.9113 18.8986 20.6348 18.7841 20.3466 18.7841Z" fill="#EE2D2F"/>
              <path d="M52.7333 19.9321V10.1006C52.7424 9.95251 52.721 9.80415 52.6706 9.66464C52.6202 9.52513 52.5418 9.39741 52.4401 9.28936C52.3385 9.1813 52.2158 9.09519 52.0797 9.03633C51.9435 8.97748 51.7967 8.94711 51.6484 8.94711C51.5001 8.94711 51.3533 8.97748 51.2172 9.03633C51.081 9.09519 50.9583 9.1813 50.8567 9.28936C50.7551 9.39741 50.6766 9.52513 50.6262 9.66464C50.5758 9.80415 50.5545 9.95251 50.5636 10.1006V17.7093C51.3512 18.3845 52.0773 19.1284 52.7333 19.9321Z" fill="#EE2D2F"/>
              <path d="M46.4725 15.0835V1.75085C46.4555 1.4746 46.3339 1.21521 46.1323 1.02558C45.9307 0.835956 45.6643 0.730377 45.3876 0.730377C45.1108 0.730377 44.8445 0.835956 44.6429 1.02558C44.4413 1.21521 44.3197 1.4746 44.3027 1.75085V14.2571C45.0436 14.4839 45.7684 14.76 46.4725 15.0835Z" fill="#EE2D2F"/>
              <path d="M27.6943 17.8274V15.6005C27.6943 15.3123 27.5798 15.0358 27.376 14.8319C27.1721 14.6281 26.8957 14.5136 26.6074 14.5136C26.3191 14.5136 26.0427 14.6281 25.8389 14.8319C25.635 15.0358 25.5205 15.3123 25.5205 15.6005V20.1072C26.1749 19.2833 26.9025 18.5202 27.6943 17.8274Z" fill="#EE2D2F"/>
              <path d="M64.1689 13.0846C63.8814 13.0846 63.6055 13.1986 63.4018 13.4016C63.1981 13.6045 63.0831 13.8799 63.082 14.1675V48.8324C63.082 49.1207 63.1965 49.3972 63.4004 49.6011C63.6042 49.8049 63.8807 49.9194 64.1689 49.9194C64.4572 49.9194 64.7336 49.8049 64.9375 49.6011C65.1413 49.3972 65.2558 49.1207 65.2558 48.8324V14.1675C65.2547 13.8799 65.1397 13.6045 64.936 13.4016C64.7323 13.1986 64.4565 13.0846 64.1689 13.0846Z" fill="#EE2D2F"/>
              <path d="M57.9072 4.53546C57.6196 4.53546 57.3438 4.64942 57.1401 4.85239C56.9364 5.05535 56.8214 5.33078 56.8203 5.61836V57.3817C56.8203 57.6699 56.9348 57.9464 57.1387 58.1503C57.3425 58.3541 57.6189 58.4686 57.9072 58.4686C58.1955 58.4686 58.4719 58.3541 58.6758 58.1503C58.8796 57.9464 58.9941 57.6699 58.9941 57.3817V5.61836C58.993 5.33078 58.878 5.05535 58.6743 4.85239C58.4706 4.64942 58.1948 4.53546 57.9072 4.53546Z" fill="#EE2D2F"/>
              <path d="M70.4288 24.4144C70.1429 24.4154 69.8689 24.5286 69.6657 24.7296C69.4624 24.9306 69.3461 25.2033 69.3419 25.4891V37.4987C69.3328 37.6468 69.3541 37.7951 69.4046 37.9346C69.455 38.0741 69.5334 38.2019 69.635 38.3099C69.7367 38.418 69.8593 38.5041 69.9955 38.5629C70.1316 38.6218 70.2784 38.6522 70.4267 38.6522C70.5751 38.6522 70.7218 38.6218 70.858 38.5629C70.9941 38.5041 71.1168 38.418 71.2184 38.3099C71.3201 38.2019 71.3985 38.0741 71.4489 37.9346C71.4993 37.7951 71.5207 37.6468 71.5116 37.4987V25.4891C71.5084 25.2037 71.393 24.9309 71.1904 24.7298C70.9878 24.5287 70.7142 24.4154 70.4288 24.4144Z" fill="#EE2D2F"/>
              <path d="M76.8036 28.3836C76.5161 28.3847 76.2406 28.4997 76.0377 28.7034C75.8347 28.9072 75.7208 29.183 75.7208 29.4706V33.5416C75.7117 33.6897 75.733 33.8381 75.7835 33.9776C75.8339 34.1171 75.9123 34.2448 76.0139 34.3529C76.1156 34.4609 76.2382 34.547 76.3744 34.6059C76.5105 34.6647 76.6573 34.6951 76.8056 34.6951C76.954 34.6951 77.1007 34.6647 77.2369 34.6059C77.3731 34.547 77.4957 34.4609 77.5974 34.3529C77.699 34.2448 77.7774 34.1171 77.8278 33.9776C77.8783 33.8381 77.8996 33.6897 77.8905 33.5416V29.4706C77.8894 29.1827 77.7746 28.9068 77.571 28.7032C77.3674 28.4996 77.0915 28.3847 76.8036 28.3836Z" fill="#EE2D2F"/>
              <path d="M50.5636 44.2159V52.9116C50.5545 53.0597 50.5758 53.2081 50.6262 53.3476C50.6766 53.4871 50.7551 53.6148 50.8567 53.7229C50.9583 53.8309 51.081 53.917 51.2172 53.9759C51.3533 54.0347 51.5001 54.0651 51.6484 54.0651C51.7967 54.0651 51.9435 54.0347 52.0797 53.9759C52.2158 53.917 52.3385 53.8309 52.4401 53.7229C52.5418 53.6148 52.6202 53.4871 52.6706 53.3476C52.721 53.2081 52.7424 53.0597 52.7333 52.9116V41.9809C52.0769 42.788 51.3508 43.5359 50.5636 44.2159Z" fill="#EE2D2F"/>
              <path d="M44.3028 47.6559V61.2491C44.2937 61.3972 44.3151 61.5456 44.3655 61.6851C44.4159 61.8246 44.4943 61.9523 44.596 62.0604C44.6976 62.1684 44.8203 62.2545 44.9564 62.3134C45.0926 62.3722 45.2393 62.4026 45.3877 62.4026C45.536 62.4026 45.6828 62.3722 45.8189 62.3134C45.9551 62.2545 46.0778 62.1684 46.1794 62.0604C46.281 61.9523 46.3595 61.8246 46.4099 61.6851C46.4603 61.5456 46.4816 61.3972 46.4725 61.2491V46.8254C45.7686 47.1503 45.0437 47.4277 44.3028 47.6559Z" fill="#EE2D2F"/>
              <path d="M25.5205 41.8058V47.4035C25.5205 47.6918 25.635 47.9683 25.8389 48.1721C26.0427 48.376 26.3191 48.4905 26.6074 48.4905C26.8957 48.4905 27.1721 48.376 27.376 48.1721C27.5798 47.9683 27.6943 47.6918 27.6943 47.4035V44.0856C26.9034 43.3918 26.176 42.6288 25.5205 41.8058Z" fill="#EE2D2F"/>
              <path d="M45.6426 31.2089L36.4102 24.1009V38.3129L45.6426 31.2089Z" fill="#006DB8"/>
            </svg>
          </div>
          <div className='partners-items--single'>
            <svg width="157" height="48" viewBox="0 0 157 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#british)">
                <path d="M53.7129 22.1335V1.85328H60.6886C61.8233 1.80085 62.9545 2.02102 63.9986 2.49752C64.8198 2.89887 65.5172 3.54084 66.0094 4.34864C66.5017 5.15643 66.7686 6.09678 66.779 7.06012C66.8136 7.9256 66.6175 8.78381 66.2132 9.53517C65.809 10.2865 65.2132 10.9002 64.4951 11.305V11.3668C65.5168 11.528 66.4451 12.091 67.0974 12.9451C67.7497 13.7992 68.0789 14.8826 68.0202 15.9824C68.0202 18.7181 66.4563 20.8097 63.8083 21.6746C62.6221 22.0142 61.3945 22.16 60.1673 22.107H53.7129V22.1335ZM62.2526 5.29509C61.6849 5.04232 61.0714 4.92775 60.4569 4.95973H56.9732V10.2548H60.2832C61.02 10.3008 61.7555 10.1427 62.4181 9.79592C62.781 9.57573 63.0788 9.25148 63.2777 8.85996C63.4767 8.46843 63.5687 8.0253 63.5435 7.5808C63.5634 7.10656 63.4515 6.63661 63.2218 6.22995C62.9922 5.8233 62.655 5.49807 62.2526 5.29509ZM63.2539 13.6966C62.5652 13.4193 61.8283 13.3049 61.0941 13.3613H56.9567V18.9564H60.8459C61.6791 19.014 62.5138 18.8691 63.287 18.5328C63.7284 18.3089 64.0964 17.9483 64.3429 17.4981C64.5894 17.0479 64.703 16.5289 64.6689 16.0088C64.6723 15.5222 64.5395 15.0456 64.2874 14.6399C64.0353 14.2343 63.6754 13.9181 63.2539 13.7319V13.6966Z" fill="#004982"/>
                <path d="M90.2955 1.85327H87.0352V22.1246H90.2955V1.85327Z" fill="#004982"/>
                <path d="M113.962 1.85327H110.701V22.1246H113.962V1.85327Z" fill="#004982"/>
                <path d="M124.488 1.66796C126.302 1.65305 128.1 2.04074 129.767 2.8064L129.709 6.17761C128.073 5.25931 126.254 4.77212 124.405 4.75676C122.617 4.75676 121.095 5.34804 121.095 6.94539C121.095 11.102 130.876 9.43409 130.876 16.3001C130.876 20.0772 127.872 22.4777 123.519 22.4777C121.259 22.5351 119.03 21.9078 117.09 20.6685L118.439 17.8356C120.001 18.8574 121.795 19.4037 123.627 19.4153C125.588 19.4153 127.409 18.6122 127.409 16.7678C127.409 12.4258 117.71 14.332 117.71 7.41313C117.71 3.69774 120.483 1.66796 124.488 1.66796Z" fill="#004982"/>
                <path d="M146.301 22.1246V13.3966H137.066V22.1246H133.806V1.85327H137.066V10.1666H146.301V1.85327H149.561V22.1246H146.301Z" fill="#004982"/>
                <path d="M60.9038 25.69C62.7309 25.6643 64.5403 26.0744 66.1998 26.8902L65.2068 29.8467C63.9761 29.1797 62.6152 28.832 61.2348 28.8318C57.627 28.8318 55.3845 32.0882 55.3845 36.0596C55.3845 40.0309 57.4863 43.3227 61.2348 43.3227C62.6109 43.3219 63.9669 42.971 65.1902 42.2989L66.1998 45.2554C64.5454 46.0687 62.7419 46.4787 60.9204 46.4556C55.2355 46.4556 51.9835 42.2107 51.9835 36.1213C51.9669 30.4291 55.219 25.69 60.9038 25.69Z" fill="#004982"/>
                <path d="M132.225 25.69C134.047 25.6669 135.85 26.0769 137.504 26.8902L136.536 29.8467C135.311 29.1824 133.956 28.8348 132.581 28.8318C128.973 28.8318 126.722 32.0882 126.722 36.0596C126.722 40.0309 128.832 43.3227 132.581 43.3227C133.957 43.3219 135.313 42.971 136.536 42.2989L137.513 45.2554C135.858 46.0687 134.055 46.4787 132.233 46.4556C126.548 46.4556 123.288 42.2107 123.288 36.1213C123.296 30.4291 126.54 25.69 132.225 25.69Z" fill="#004982"/>
                <path d="M84.8173 35.9978C84.8173 42.0872 81.1763 46.4556 75.8142 46.4556C70.452 46.4556 66.8193 42.2372 66.8193 36.1831C66.8193 30.1291 70.452 25.7165 75.8142 25.7165C81.1763 25.7165 84.8173 29.9349 84.8173 36.0243V35.9978ZM81.3832 36.086C81.3832 31.6735 79.0166 28.8229 75.8142 28.8229C72.6118 28.8229 70.2452 31.6558 70.2452 36.1125C70.2452 40.5692 72.6118 43.3756 75.8142 43.3756C79.0166 43.3756 81.3832 40.5251 81.3832 36.0596V36.086Z" fill="#004982"/>
                <path d="M87.0195 38.5218V25.8754H90.2798V38.6454C90.2798 42.0254 91.9845 43.2874 94.6904 43.2874C97.3963 43.2874 99.1092 42.0254 99.1092 38.6454V25.8754H102.369V38.5218C102.369 44.0287 99.4236 46.4644 94.6407 46.4644C89.8578 46.4644 87.0195 44.0287 87.0195 38.5218Z" fill="#004982"/>
                <path d="M108.493 31.3822H108.402C108.46 32.0618 108.493 33.1473 108.493 34.0916V46.1467H105.232V25.8489H108.749L117.612 39.7132H117.67C117.612 39.0425 117.579 37.9482 117.579 37.0039V25.8754H120.814V46.1732H117.934L108.493 31.3822Z" fill="#004982"/>
                <path d="M143.321 25.8754H140.069V46.1467H143.321V25.8754Z" fill="#004982"/>
                <path d="M146.301 46.1556V25.8754H149.561V43.0138H157V46.1556H146.301Z" fill="#004982"/>
                <path d="M108.211 1.86209H92.7783V5.03032H98.8687V22.1246H102.129V5.03032H108.211V1.86209Z" fill="#004982"/>
                <path d="M81.169 22.1335C78.4052 16.0088 77.6852 14.2879 76.5268 14.2879H73.4981V22.1335H70.2461V1.83563H76.6757C81.5745 1.83563 83.4529 4.5979 83.4529 7.67788C83.4986 8.83952 83.1767 9.9838 82.5388 10.9266C81.9009 11.8695 80.9841 12.5561 79.936 12.8759C80.7635 13.4054 81.7151 15.3116 84.901 22.0805L81.169 22.1335ZM76.8743 4.99504H73.4981V11.1726H76.7336C79.0672 11.1726 80.1677 9.88417 80.1677 8.03971C80.1677 6.34528 79.1582 4.99504 76.8743 4.99504Z" fill="#004982"/>
                <path d="M11.0264 23.1872C17.0309 23.0977 21.8306 17.8339 21.7468 11.4301C21.6629 5.02634 16.7273 -0.0924848 10.7228 -0.00306492C4.71823 0.0863549 -0.0814445 5.35015 0.00240011 11.754C0.0862448 18.1578 5.02186 23.2766 11.0264 23.1872Z" fill="#0096DC"/>
                <path d="M45.0072 11.5962C45.0072 13.8898 44.3695 16.1318 43.1748 18.0388C41.98 19.9458 40.2818 21.4321 38.295 22.3098C36.3082 23.1875 34.1219 23.4171 32.0127 22.9697C29.9035 22.5222 27.9661 21.4178 26.4454 19.796C24.9248 18.1743 23.8892 16.108 23.4697 13.8586C23.0501 11.6091 23.2655 9.27749 24.0884 7.15856C24.9114 5.03962 26.305 3.22853 28.0931 1.95432C29.8812 0.680108 31.9835 0 34.134 0C35.5619 0 36.9758 0.299946 38.295 0.882712C39.6142 1.46548 40.8129 2.31965 41.8225 3.39646C42.8322 4.47327 43.6331 5.75164 44.1796 7.15856C44.726 8.56548 45.0072 10.0734 45.0072 11.5962Z" fill="#0096DC"/>
                <path d="M10.8732 48C16.8784 48 21.7465 42.8082 21.7465 36.4037C21.7465 29.9993 16.8784 24.8075 10.8732 24.8075C4.86812 24.8075 0 29.9993 0 36.4037C0 42.8082 4.86812 48 10.8732 48Z" fill="#0096DC"/>
                <path d="M45.0072 36.4037C45.0089 38.6976 44.3725 40.9405 43.1788 42.8487C41.985 44.7568 40.2874 46.2445 38.3007 47.1236C36.314 48.0026 34.1275 48.2335 32.0178 47.7871C29.908 47.3406 27.9698 46.2369 26.4484 44.6155C24.9269 42.9941 23.8905 40.9278 23.4703 38.6781C23.0501 36.4284 23.2649 34.0964 24.0876 31.9769C24.9104 29.8575 26.304 28.0459 28.0923 26.7712C29.8805 25.4966 31.9831 24.8163 34.134 24.8163C37.0163 24.8163 39.7807 26.0368 41.8196 28.2097C43.8585 30.3825 45.005 33.3298 45.0072 36.4037Z" fill="#0096DC"/>
              </g>
              <defs>
                <clipPath id="british">
                <rect width="157" height="48" fill="white"/>
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className='partners-items--single'>
            <svg width="143" height="117" viewBox="0 0 143 117" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M65.1601 93.7632H63.6184L66.7408 102.868H68.0425L70.3686 96.1639C70.4847 95.8064 70.5702 95.4397 70.6243 95.0677H70.6438C70.7075 95.4398 70.8002 95.8063 70.9209 96.1639L73.1807 102.868H74.4824L77.6048 93.7632H76.227L74.1565 100.455C74.0445 100.838 73.9591 101.229 73.9009 101.624H73.8677C73.7969 101.228 73.7004 100.838 73.5789 100.455L71.3912 93.7632H70.0369L67.7809 100.455C67.6532 100.835 67.5617 101.227 67.5077 101.624H67.4746C67.4183 101.229 67.3342 100.838 67.2228 100.455L65.1601 93.7632ZM66.0812 53.5845L66.3095 53.2477C66.5235 53.1126 66.7817 53.0658 67.0296 53.1172C67.4531 53.1892 67.7712 53.4949 67.7712 53.8045V53.8805C67.7048 54.2173 67.2814 54.4296 66.8208 54.3478C66.3603 54.266 66.0285 53.9214 66.089 53.5845H66.0812ZM66.089 52.905C65.9746 52.9786 65.8781 53.0769 65.8065 53.1925C65.735 53.3081 65.6902 53.4381 65.6754 53.5732C65.6607 53.7082 65.6763 53.8449 65.7212 53.9732C65.766 54.1014 65.839 54.2181 65.9348 54.3147C66.1504 54.5465 66.4363 54.7011 66.7486 54.7547C67.0597 54.8143 67.3819 54.7683 67.6639 54.6243C67.7966 54.5608 67.9125 54.4671 68.0023 54.3508C68.0921 54.2344 68.1533 54.0987 68.181 53.9545C68.2825 53.3937 67.8063 52.8368 67.1194 52.7064C66.7636 52.6392 66.3955 52.7087 66.089 52.9011V52.905ZM65.4528 51.2168C65.4531 51.4706 65.3552 51.7147 65.1796 51.8983L64.8108 52.0521L64.4439 51.8788C64.2764 51.6899 64.189 51.4435 64.2 51.1915C64.198 51.0663 64.2209 50.9419 64.2675 50.8256C64.3141 50.7093 64.3833 50.6033 64.4712 50.5139L64.8459 50.3581C65.1855 50.3581 65.4606 50.7476 65.4528 51.2168ZM65.4704 52.1904C65.5972 52.0622 65.697 51.9101 65.764 51.7429C65.8311 51.5757 65.8639 51.3969 65.8607 51.2168C65.8736 50.9009 65.7787 50.5899 65.5914 50.3348C65.5059 50.2152 65.3945 50.1166 65.2654 50.0461C65.1363 49.9756 64.9929 49.9352 64.8459 49.9278C64.5955 49.9283 64.3555 50.0277 64.1785 50.2043C64.0515 50.3323 63.9516 50.4844 63.8845 50.6517C63.8175 50.8189 63.7847 50.9978 63.7882 51.1779V51.211C63.7803 51.561 63.9067 51.9009 64.1414 52.1612C64.3079 52.3462 64.5405 52.4588 64.7893 52.4747C64.9137 52.4751 65.0369 52.4509 65.1518 52.4034C65.2667 52.356 65.371 52.2862 65.4587 52.1982L65.4704 52.1904ZM25.1153 60.0314C25.6442 59.751 25.5837 59.3888 25.4412 59.1747C25.168 58.7444 24.8226 58.8651 24.4967 59.0286L24.3542 59.1046L24.9592 60.1171L25.1153 60.0314ZM47.0541 64.5818L47.2492 64.1067L47.0541 63.6589L46.5604 63.4895L46.051 63.6842L45.8559 64.1593L46.051 64.611L46.5486 64.7765L47.0541 64.5818ZM55.1567 55.1558C55.2914 54.8151 55.184 54.5503 54.6357 54.4003L54.4561 54.3556L54.0326 55.5238L54.1946 55.5647C54.6727 55.6835 54.9752 55.6056 55.1567 55.15V55.1558ZM57.4497 55.849L57.4692 55.7731L57.3639 55.6212L57.1687 55.5044L57.0067 55.7808L57.1824 55.8821L57.3658 55.9191L57.4497 55.849ZM59.8969 57.9791L59.9652 57.5196L59.6588 57.1302L59.1417 57.0406L58.7397 57.3502L58.6616 57.8175L58.9797 58.2069L59.4929 58.2887L59.8969 57.9791ZM64.5805 59.2058L64.239 59.823C64.0438 59.7374 63.6926 59.5797 63.4291 59.4453C63.2047 59.8055 62.5568 60.8258 62.4397 61.0166L61.7547 60.7168C61.7547 60.7051 62.5236 59.5096 62.7773 59.1085C62.5568 58.9858 62.2465 58.8067 62.0884 58.7054L62.4338 58.0882C63.1301 58.4965 63.8465 58.8696 64.5805 59.2058ZM62.1899 57.8974L60.7985 60.1716L60.1428 59.7822L61.544 57.5196L62.1899 57.8974ZM60.7399 57.689C60.7361 57.9292 60.6644 58.1634 60.5331 58.3647C60.4397 58.5213 60.3143 58.6565 60.165 58.7615C60.0157 58.8665 59.8459 58.939 59.6666 58.9741C59.2979 59.0494 58.9142 58.9841 58.5913 58.7911C58.433 58.7052 58.2935 58.5886 58.1809 58.4481C58.0683 58.3077 57.9849 58.1463 57.9356 57.9733C57.8875 57.8043 57.8763 57.6269 57.9029 57.4532C57.9295 57.2795 57.9932 57.1136 58.0898 56.9666C58.1831 56.8091 58.3081 56.6726 58.4569 56.5657C58.6056 56.4588 58.775 56.3838 58.9543 56.3455C59.3163 56.2605 59.6972 56.3199 60.0159 56.511C60.341 56.6878 60.5825 56.9862 60.6873 57.3405L60.7399 57.689ZM58.1386 55.4382C58.2062 55.552 58.2402 55.6825 58.2368 55.8148C58.2333 55.9471 58.1925 56.0757 58.1191 56.1858L57.7073 56.5188L57.5122 56.5363L57.557 56.9257C57.5883 57.4787 57.6624 58.0804 57.6624 58.094L56.8565 57.578L56.7921 56.8109C56.7706 56.5305 56.755 56.4214 56.6691 56.3591L56.1851 57.1828L55.5255 56.8381L56.8487 54.5386L57.7444 55.0546L58.1386 55.4382ZM55.871 55.3622C55.4631 56.3533 54.7001 56.4137 53.9604 56.2443L53.0647 56.0242L53.9604 53.493L54.983 53.7461C55.6231 53.9077 56.2164 54.4919 55.871 55.3583V55.3622ZM51.8196 56.5363C52.4558 57.3444 54.0951 57.9421 54.0951 58.978C54.0951 59.6108 53.5213 60.23 52.4988 60.7538C52.7895 59.4122 49.5715 59.0014 49.5715 58.0064C49.5715 57.1536 50.8536 56.7018 51.8235 56.5363H51.8196ZM50.9571 61.9357L50.7893 64.646L50.2194 64.8408L49.0875 63.6997C49.0661 63.9879 49.0017 65.162 49.0017 65.162L48.2523 65.3081L48.4162 62.4964L48.9568 62.403L50.1179 63.5615C50.1296 63.2811 50.1999 62.1343 50.1999 62.1343L50.9571 61.9357ZM48.0493 64.0775C48.0522 64.2687 48.0144 64.4583 47.9384 64.6339C47.8624 64.8094 47.7499 64.9669 47.6083 65.0958C47.3149 65.3643 46.933 65.516 46.535 65.5222C46.1509 65.5383 45.7755 65.4058 45.487 65.1523C45.351 65.0295 45.2429 64.8791 45.1699 64.7112C45.0968 64.5433 45.0606 64.3617 45.0636 64.1787C45.06 63.9887 45.0957 63.8001 45.1686 63.6245C45.2415 63.4489 45.3499 63.2903 45.487 63.1585C45.7715 62.8842 46.1511 62.7301 46.5467 62.7281C46.7399 62.7157 46.9337 62.7414 47.1168 62.8039C47.3 62.8664 47.469 62.9644 47.6142 63.0923C47.7551 63.2159 47.8672 63.3689 47.9424 63.5405C48.0176 63.7121 48.0541 63.8981 48.0493 64.0853V64.0775ZM44.8411 65.5884L44.0741 65.6001V64.1495L43.436 64.905C43.436 64.905 42.9794 64.3696 42.7959 64.1495V65.5962L42.0309 65.5748V62.8489L42.6749 62.8703L43.4399 63.7952L44.1815 62.8781L44.8411 62.8605V65.5884ZM40.5478 63.4661C40.3273 63.4427 39.9623 63.3979 39.7672 63.3687V65.4229L38.9983 65.312V63.2655L38.2177 63.1429V62.4166C38.891 62.5256 39.8023 62.6561 40.5439 62.7457L40.5478 63.4661ZM38.083 65.1523C37.4844 65.0361 36.8992 64.8593 36.3364 64.6246L36.194 61.9279C36.6136 62.0486 37.5132 62.2842 37.9855 62.3699L38.003 63.1059C37.7708 63.0611 37.3259 62.9676 37 62.8781L37.0136 63.1176L37.9445 63.3493L37.9699 64.0931L37.0526 63.8653L37.0663 64.1495C37.3871 64.2497 37.7128 64.3335 38.0421 64.4007L38.083 65.1523ZM34.664 60.7577C33.6453 60.2339 33.0677 59.6147 33.0677 58.9819C33.0677 57.946 34.705 57.3483 35.347 56.5441C36.313 56.7057 37.5991 57.1575 37.5991 58.0103C37.5991 59.0014 34.3791 59.4161 34.6718 60.7577H34.664ZM31.9846 56.7778C31.204 57.1146 30.722 56.7778 30.4605 56.2248L29.8341 54.8112L30.5093 54.4627L31.1455 55.884C31.284 56.1839 31.4304 56.2735 31.7114 56.143C32.0451 55.9853 32.0451 55.8432 31.9065 55.5706L31.2547 54.0791L31.9963 53.8279L32.6149 55.2785C32.855 55.8626 32.7984 56.4156 31.9768 56.7778H31.9846ZM28.5597 56.4526L28.6866 56.6609L29.5003 56.1177L29.875 56.7135L29.0769 57.2606L29.2232 57.4885L30.0936 56.9043L30.4683 57.5001L28.9695 58.4737L27.5742 56.2404L29.0437 55.2843L29.4145 55.886L28.5597 56.4526ZM26.696 56.8187L28.1011 59.052L27.4825 59.4511L26.0774 57.2237L26.696 56.8187ZM25.5915 58.3374C25.8014 58.4518 25.9751 58.6224 26.093 58.83C26.3936 59.3888 26.4228 60.1463 25.449 60.6564L24.6684 61.075L23.3278 58.8456L24.1474 58.4017C24.3803 58.2604 24.6442 58.1782 24.9163 58.1622C25.1507 58.1581 25.3816 58.2188 25.5837 58.3374H25.5915ZM53.8804 53.1737C52.7407 53.1737 51.4098 53.6079 50.758 55.1772C50.0691 56.8459 49.3042 57.395 49.3042 58.1349C49.3042 58.7794 49.8896 59.2798 50.879 59.7997C51.523 60.1365 52.1865 60.3235 52.1494 60.929C50.2897 61.778 47.22 62.3601 43.5628 62.3601C39.9057 62.3601 36.8477 61.776 34.9763 60.929C34.947 60.3235 35.6105 60.1365 36.2467 59.7997C37.24 59.2798 37.8254 58.7852 37.8254 58.1349C37.8254 57.395 37.0605 56.8459 36.3755 55.1772C35.7217 53.6079 34.3928 53.1737 33.2531 53.1737C29.1725 53.1737 23.1755 60.5026 18.8354 59.2428C20.5566 60.008 21.7744 61.7371 23.1521 61.7371C26.6648 61.7371 30.7454 56.4799 34.5684 56.4799L34.7362 56.4896C33.8483 57.5858 32.6013 57.8136 32.6013 58.9254C32.6013 59.7043 33.2784 60.1735 33.7468 61.2133C34.0395 61.8675 34.0922 62.327 34.3323 63.248C34.5528 64.058 35.1129 66.1336 43.555 66.1336C51.9972 66.1336 52.5612 64.058 52.7739 63.248C53.0218 62.327 53.0784 61.8675 53.373 61.2133C53.8414 60.1735 54.5166 59.7062 54.5166 58.9254C54.5166 57.8097 53.2696 57.5858 52.3836 56.4838H52.5495C56.3725 56.4838 60.4453 61.741 63.9716 61.741C65.3377 61.741 66.5691 60.0158 68.2825 59.2506C63.9423 60.5104 57.9493 53.1815 53.8648 53.1815L53.8804 53.1737ZM45.8188 47.4122L45.7505 47.2875L45.9456 47.3635L45.8188 47.4122ZM45.7466 47.4706L45.7329 47.527L45.6919 47.4706L45.6802 47.527H45.5905L45.6041 47.6049L45.5905 47.6848L45.4773 47.7373L45.4441 47.6127L45.4968 47.5504L45.5592 47.5154L45.5046 47.4375L45.5378 47.3966H45.4773L45.5046 47.3557H45.5592L45.7134 47.4258L45.7466 47.4706ZM45.6646 47.2174L45.5436 47.2544L45.4987 47.124L45.6646 47.2174ZM45.9534 48.4772L46.4062 48.3195L46.3457 48.5785L46.5155 48.8238V48.8394L46.3769 48.8725L46.0725 48.7128L46.0315 48.7459L45.8929 48.8842L45.9944 48.8277V48.8589L46.051 48.9075L46.1115 48.892L46.133 48.9114L45.9749 49.0419L46.0022 49.0906L46.1213 49.1646L46.0842 49.0984H46.1213L46.1447 49.075L46.1622 49.0906L46.1486 49.1276L46.1661 49.1762L46.332 49.2366L46.2423 49.1957L46.2832 49.1801L46.3086 49.1237L46.3203 49.1022H46.3613L46.3945 49.1198L46.5116 49.1685L46.613 49.0263H46.6794L46.8453 49.0127L46.7692 48.7732C46.7204 48.7498 46.8453 48.4208 46.5935 48.2708L47.1595 48.2572L47.419 48.3838L47.4073 48.4578L47.2648 48.5668L47.1595 48.4655H47.0814L46.9194 48.5337H47.0365V48.5629L47.0619 48.6116V48.6311L46.9155 48.6875V48.7284L46.8902 48.8589L46.9682 48.7946L46.9916 48.8219L47.1438 48.7946L47.0541 48.9114L47.0736 48.9484L47.1399 49.075L47.1302 48.9971H47.1965L47.2785 48.8219H47.46L47.4815 48.7323V48.7206L47.5673 48.7576L47.6025 48.6233L47.6239 48.6116L47.741 48.5493L47.6434 48.4519L47.7293 48.2864L47.4444 48.0294H47.6122C48.1977 48.0294 48.5684 47.8678 48.5567 47.6887C48.545 47.5095 48.3889 47.4823 47.9713 47.5095C47.458 47.5426 46.8004 47.6069 46.8004 47.4375L47.0463 47.233L47.1712 47.3265C47.8386 47.5212 48.6094 47.0111 49.0212 47.1318C48.4865 46.9487 48.1567 47.27 47.6551 47.161C47.9537 47.161 48.266 47.0948 48.2835 47.0227C48.0513 47.1688 47.3956 46.9176 47.1126 47.087L47.0599 47.1357C46.8511 47.1843 46.6696 47.2953 46.6696 47.4453C46.6696 47.64 46.9214 47.6964 47.3975 47.677C47.8737 47.6575 48.3909 47.603 48.3909 47.677C48.3909 47.7977 48.0572 47.9087 47.6005 47.9087C47.259 47.9087 46.6618 47.677 45.9164 47.8678L46.0588 47.4686L46.1603 47.344L46.0413 47.2895L46.0139 47.2019L45.9769 47.1162L45.8383 47.0188L45.6841 46.9741L45.5944 46.9896L45.5085 47.0305L45.3992 46.9741L45.3777 47.1532L45.208 47.2895L45.2607 47.3518L45.1338 47.5465L45.1943 47.6108L45.167 48.0294L44.7962 47.6069L44.6986 47.4122L44.7318 47.1649L44.7064 47.087L44.5757 47.0013L44.6284 47.0909L44.5932 47.1357V47.2213V47.2408V47.2778H44.5796L44.4742 47.1279H44.4332V47.1123L44.2869 47.0792L44.3493 47.0987L44.3278 47.1688L44.443 47.2583L44.4664 47.27V47.2992L44.3044 47.3557V47.4005L44.3278 47.5348L44.3532 47.4647H44.3688L44.3981 47.49L44.4664 47.4686H44.4937L44.5249 47.49V47.5095L44.562 47.6711L44.5815 47.6925L44.3864 47.6672L44.5991 47.8619H44.6147L44.6635 47.9106L44.6928 47.8814L44.7045 47.8931L44.7708 47.9866L44.7864 47.9301L44.9816 48.2553L45.2216 48.4305L45.2919 48.5921H44.9582L44.7786 48.6622L44.7377 48.6739L44.5698 48.633L44.5249 48.524L44.4527 48.4636H44.4L44.2439 48.4461L44.3298 48.5025L44.3064 48.5512L44.4449 48.6817V48.6992H44.3591L44.2283 48.6311L44.1873 48.6544H44.1717L44.0546 48.8102L44.1307 48.7362L44.1483 48.7849L44.3434 48.8141L44.3552 48.8258L44.2947 49.001L44.3298 49.0244V49.0399L44.4605 49.184L44.4078 49.0575L44.4566 49.0692L44.5347 48.9231L44.5542 48.9348L44.6635 49.0399L44.7786 48.9192L44.8235 49.0088L44.884 48.9465L44.8469 49.0945L44.9855 48.9523L45.0226 49.001H45.1943V49.0906L45.2314 49.0458L45.2841 49.1801C45.3055 48.966 45.4226 49.0497 45.5573 48.966H45.5729L45.5124 49.0341L45.7193 48.8881C45.788 48.7737 45.8325 48.6465 45.85 48.5142L45.9534 48.4772ZM46.0647 45.2197L45.9905 45.0854L46.1974 45.1671L46.0647 45.2197ZM45.9827 45.2801L45.971 45.3365L45.9261 45.2801V45.3404H45.8324L45.8442 45.4222L45.8324 45.504L45.7134 45.5682L45.6763 45.4339L45.7329 45.3696L45.7993 45.3326L45.7388 45.2489L45.7778 45.2041H45.7095L45.7388 45.1613H45.7915L45.9612 45.2372L45.9827 45.2801ZM45.8637 45.0211L45.7388 45.0659L45.6861 44.9237L45.8637 45.0211ZM49.0856 46.7501L49.0329 46.7015L49.0856 46.645L49.0641 46.4503L49.2281 46.3043L49.191 46.2225L49.2924 46.1816L49.2476 46.057L49.2612 46.0355L49.3334 45.8973H49.191L49.0973 45.8525C48.8688 45.8513 48.6406 45.835 48.4143 45.8038V45.7844C48.7109 45.7649 49.3295 45.7396 49.3295 45.4962C49.3295 45.3911 49.2554 45.2353 48.7714 45.2645C48.2464 45.2879 47.0697 45.4592 47.0697 45.1671L47.5712 45.0484L47.6961 45.1301C48.3733 45.3249 49.1383 44.8225 49.55 44.9354C49.0153 44.7407 48.6816 45.0737 48.1723 44.9646C48.467 44.9646 48.787 44.9062 48.8046 44.8264C48.5684 44.9763 47.9166 44.7193 47.6337 44.8907L47.5927 44.9237C47.3117 44.9237 46.9175 44.9121 46.9175 45.1632C46.9175 45.6792 48.3187 45.3735 48.7577 45.3735C49.0953 45.3735 49.148 45.4183 49.148 45.5001C49.148 45.6306 48.6485 45.6578 48.3987 45.6578C48.0201 45.6578 46.8726 45.4631 46.1798 45.5975L46.2891 45.2606L46.4003 45.1224L46.2735 45.0698L46.2403 44.9763L46.2052 44.8868L46.0491 44.7855L45.8949 44.7368L45.7973 44.7485L45.7114 44.7933L45.5905 44.7368L45.5729 44.9315L45.3777 45.0776L45.4343 45.1418L45.3055 45.3541L45.3582 45.4105L45.329 45.6052L45.2685 45.5858H45.2353L44.9621 45.5079L44.8567 45.2918L44.8938 45.0328L44.8684 44.9549L44.7318 44.8653L44.7845 44.9588L44.7474 45.0036V45.0931V45.1146V45.1593L44.6323 44.9958H44.5913V44.9783L44.441 44.9452L44.5035 44.9685L44.4859 45.0347L44.6049 45.1321L44.6284 45.1438V45.1769H44.6167L44.4449 45.2294V45.2781L44.4683 45.4203L44.4937 45.3482L44.5093 45.3385L44.5425 45.3677L44.6069 45.3443H44.6401L44.6713 45.3677V45.3833L44.7084 45.5585L44.7298 45.5838L44.5347 45.5546L44.7669 45.7669H44.7806L44.8294 45.8233L44.8606 45.7863L44.8743 45.8019L44.9426 45.8954L44.964 45.8389L45.1592 45.872L45.2275 45.944L45.3582 45.9246V46.1757L45.0616 46.1894L44.6498 46.2244L44.601 46.1115L44.523 46.0472H44.4664L44.2986 46.0297L44.3922 46.0862L44.3649 46.1368L44.5113 46.2692V46.2984L44.4293 46.2828L44.2869 46.2127L44.2381 46.2381H44.2225L44.0995 46.3919L44.1854 46.3257L44.201 46.3705L44.4059 46.4074H44.4176L44.3571 46.5905L44.3942 46.6197L44.3844 46.6353L44.5191 46.7852L44.4703 46.6528L44.5152 46.6645L44.601 46.5087L44.6206 46.5223L44.7396 46.6353L44.8528 46.5087H44.8665L44.9113 46.61L44.9718 46.5418L44.9387 46.6995L45.0811 46.5457L45.1182 46.5944H45.3016L45.3133 46.6061L45.327 46.6995L45.3582 46.6508L45.4109 46.7969C45.4324 46.5691 45.6197 46.6255 45.7622 46.5282H45.7739L45.7134 46.6061L46.0783 46.3744L46.1193 46.3296L46.0959 46.3958L46.291 46.2887C46.7477 46.3374 46.3925 45.9109 47.1341 46.0414L47.3136 45.9596L47.3585 46.2731L47.5322 46.3432V46.3588L47.3897 46.3958L47.0638 46.2283L47.019 46.2614L46.8765 46.4074L46.9877 46.3471V46.3821L47.0482 46.4347L47.1126 46.4191L47.1341 46.4406L46.9624 46.573L46.9955 46.6275L47.1204 46.7034L47.0814 46.6392H47.1204L47.1458 46.6138L47.1575 46.6022L47.1692 46.6177V46.6547L47.1829 46.7112L47.3605 46.7774L47.2668 46.7326L47.3117 46.7112L47.3331 46.6508L47.3488 46.6353H47.3897L47.4229 46.6469L47.5517 46.7034L47.659 46.5496H47.7234L47.9635 46.5282L47.8776 46.2731L47.8327 46.0979L48.1586 46.1796C48.3238 46.1919 48.489 46.1567 48.6348 46.0784L48.9295 46.0531L48.9568 46.1056L48.8963 46.3004H48.7011L48.6192 46.3354L48.4514 46.4659L48.5782 46.4133V46.4386L48.7207 46.4951H48.7324L48.627 46.645L48.668 46.6664L48.7207 46.7793L48.746 46.6781H48.787L48.908 46.5438L48.8963 46.6976H48.9334L49.0856 46.7501ZM46.1174 43.0506L46.0393 42.9085L46.252 42.9903L46.1174 43.0506ZM46.0315 43.1129L46.0198 43.1694L45.971 43.1129V43.1733H45.8637L45.8812 43.259L45.8676 43.3485L45.7427 43.405L45.7056 43.2707L45.7622 43.2064L45.8324 43.1577L45.77 43.0759L45.811 43.0273H45.7388L45.7739 42.9825H45.8285L45.9983 43.0682L46.0315 43.1129ZM45.9046 42.8364L45.77 42.8851L45.7173 42.7313L45.9046 42.8364ZM49.9579 44.6434L49.9013 44.5888L49.9423 44.5324L49.8857 44.3377L50.0282 44.18L49.9794 44.0982L50.0809 44.0534L50.0106 43.9268V43.9035L50.073 43.7613H49.913L49.8116 43.7126C49.5977 43.7131 49.3843 43.6955 49.1734 43.6601V43.6426C49.5637 43.6231 50.0594 43.5705 50.0594 43.3661C50.0594 43.1967 49.8779 43.0896 49.3276 43.0896C48.7773 43.0896 47.0912 43.294 47.0912 42.9844C47.0912 42.7897 47.6571 42.8715 48.0767 42.8832L48.2035 42.9572C48.9119 43.1519 49.7179 42.632 50.155 42.7625C49.5969 42.5677 49.2476 42.9007 48.7109 42.7878C49.0231 42.7878 49.3529 42.7216 49.3744 42.6417C49.1246 42.7995 48.4416 42.5346 48.1528 42.7099L48.104 42.7547C47.5829 42.7547 46.9428 42.6865 46.9428 42.9903C46.9428 43.5394 48.869 43.2181 49.3334 43.2181C49.7979 43.2181 49.8916 43.2668 49.8916 43.3563C49.8916 43.4868 49.4349 43.5179 49.1734 43.5179C48.746 43.5179 46.9468 43.2784 46.2266 43.4946L46.3652 43.0954L46.4784 42.9572L46.3437 42.8968L46.3164 42.7994L46.2754 42.706L46.1076 42.597L45.9495 42.5483L45.8481 42.5639L45.7583 42.6086L45.6275 42.5483L45.6119 42.743L45.4168 42.8968L45.4773 42.9669L45.3387 43.1811L45.4285 43.2629L45.4168 43.4245L45.3192 43.3933H45.2333L45.1436 43.3758L44.8411 43.1441L44.7318 42.9143L44.7728 42.6495L44.7435 42.56L44.601 42.4665L44.6537 42.5639L44.6186 42.6164V42.706V42.7313V42.7761H44.6049L44.4879 42.6047H44.443V42.5931L44.281 42.5483L44.3493 42.5794L44.3298 42.6495L44.4547 42.7508L44.4801 42.7664V42.7917V42.8033L44.3005 42.8598V42.9124L44.3298 43.0604L44.3532 42.9786H44.3727L44.4059 43.0058L44.4801 42.9825H44.4937L44.5308 43.0058V43.0273L44.5757 43.2103L44.5913 43.2337L44.3844 43.2064L44.6206 43.4245H44.6401L44.6947 43.479L44.722 43.4498L44.7337 43.4654L44.8157 43.5627L44.8274 43.5024C44.8606 43.5024 44.9582 43.7302 45.1826 43.8509L45.3212 43.7711L45.3934 43.8684L45.4343 43.847L45.5202 44.0592L45.206 44.0709L44.7747 44.1157L44.722 43.9891L44.6401 43.9249H44.5874L44.4098 43.9054L44.5074 43.9697L44.482 44.0222L44.6323 44.1605V44.1839H44.5445L44.3961 44.1079L44.3474 44.1352H44.3317L44.201 44.2987L44.2986 44.1994L44.3142 44.2442L44.5308 44.2812L44.5464 44.2929L44.4781 44.4876L44.5191 44.5168V44.5363L44.6576 44.6959L44.6049 44.5538L44.6479 44.5655L44.7377 44.4058L44.763 44.4156L44.884 44.5363L45.007 44.4019L45.0518 44.5032L45.126 44.435L45.0792 44.5888L45.2333 44.4272L45.2665 44.4798H45.4617L45.4734 44.4915L45.487 44.5888L45.5222 44.5363L45.5807 44.6901C45.6002 44.4467 45.7349 44.5441 45.8851 44.4428L45.9027 44.4545L45.8324 44.5324L46.1135 44.3377L46.2676 44.2929L46.4628 44.1877C47.3585 44.3085 46.8531 43.7983 47.8991 43.8996L48.022 43.8022L48.0669 44.1352L48.2504 44.2072V44.2286L48.0942 44.2676L47.7566 44.0865L47.7078 44.1215L47.5615 44.2734L47.6708 44.2111V44.2481L47.7371 44.3046L47.8015 44.2851L47.821 44.3085L47.6473 44.4506L47.6786 44.509L47.8132 44.585L47.7683 44.5168H47.8132L47.8347 44.4876H47.8464L47.862 44.5032L47.8503 44.5441L47.8659 44.6005L48.0611 44.6706L47.9635 44.622L48.0084 44.6064L48.0337 44.5402L48.0493 44.5207H48.0942L48.1274 44.5324L48.2621 44.585L48.3713 44.4233H48.4436L48.6933 44.4019L48.6075 44.1352L48.5587 43.9521L48.9041 44.0359C49.0612 44.0506 49.2188 44.0136 49.3529 43.9307L49.6574 43.8996L49.7023 43.9599L49.671 44.1663H49.4583L49.3803 44.2033L49.2378 44.3416L49.3568 44.2851V44.3124L49.5149 44.3708L49.5364 44.3825L49.4544 44.5402L49.4954 44.5655L49.5637 44.6784L49.5774 44.5733H49.6262L49.7276 44.4311H49.7393V44.5927L49.7842 44.6025L49.9579 44.6434ZM41.9568 43.5452H41.8514L41.5548 43.7574L41.8143 44.0242H41.8924L41.7089 45.2197L40.5244 43.5257C41.0786 43.3057 41.5255 43.0662 41.7655 43.0662C41.9607 43.0662 41.9977 43.1558 41.9607 43.5452H41.9568ZM40.2355 43.6309L41.6445 45.6422C41.6035 45.9187 41.5587 46.2108 41.5138 46.4873L39.6267 43.81L40.2355 43.6309ZM39.3144 43.8704L41.4435 46.9137C41.3986 47.2058 41.3498 47.4784 41.3186 47.6925L38.6626 43.8957H38.9027L39.3144 43.8704ZM38.3133 43.919L41.2152 48.0936C39.654 47.5329 38.1045 46.0979 38.2997 43.9249L38.3133 43.919ZM42.5207 48.2728L42.3959 48.2553L42.4934 44.0748H42.5871L42.8876 43.847L42.6359 43.59H42.5012V43.4595C42.5148 43.354 42.5047 43.2469 42.4717 43.1458C42.4387 43.0447 42.3836 42.9521 42.3105 42.8748C42.2373 42.7975 42.1478 42.7374 42.0485 42.6987C41.9492 42.6601 41.8426 42.644 41.7362 42.6515C41.2913 42.6515 40.4287 43.2356 39.2149 43.2356C38.6804 43.2004 38.1617 43.0403 37.7005 42.7683L37.5542 43.1266V43.0896L37.2576 42.7897L36.959 43.0896L37.2576 43.3875L37.4937 43.2726L37.3376 43.6348L37.4976 43.699C37.322 45.5235 38.6334 47.8386 41.0318 48.5493C41.385 48.4519 41.7928 48.5181 41.7928 48.9036C41.7999 48.9498 41.7961 48.997 41.7817 49.0415C41.7673 49.086 41.7428 49.1265 41.7101 49.1599C41.6774 49.1933 41.6373 49.2187 41.5931 49.234C41.5489 49.2494 41.5017 49.2542 41.4552 49.2483L41.223 49.0711L41.5333 48.8959L41.3128 48.6778C41.2595 48.6754 41.2063 48.6837 41.1562 48.7021C41.1062 48.7204 41.0603 48.7486 41.0212 48.7848C40.9822 48.8211 40.9508 48.8647 40.9288 48.9132C40.9068 48.9617 40.8947 49.014 40.8932 49.0672C40.8934 49.1374 40.9078 49.2068 40.9355 49.2714C40.9633 49.3359 41.0038 49.3942 41.0546 49.4427C41.1054 49.4912 41.1656 49.529 41.2314 49.5539C41.2972 49.5787 41.3674 49.59 41.4377 49.5871C41.707 49.5871 42.269 49.4352 42.187 48.7907L42.4934 48.6486L42.5207 48.2728ZM35.3002 46.7404C35.4016 46.7057 35.4898 46.6408 35.553 46.5544C35.6162 46.4681 35.6512 46.3644 35.6534 46.2575L35.6085 46.0258C35.5837 45.9579 35.5455 45.8956 35.4963 45.8426C35.4471 45.7895 35.3878 45.7468 35.3219 45.7168C35.256 45.6868 35.1847 45.6702 35.1123 45.6679C35.0399 45.6657 34.9678 45.6778 34.9001 45.7036C34.8324 45.7295 34.7706 45.7684 34.7182 45.8183C34.6657 45.8682 34.6238 45.928 34.5947 45.9942C34.5657 46.0605 34.5501 46.1318 34.5489 46.2041C34.5478 46.2763 34.561 46.3481 34.5879 46.4152L34.8806 46.7404H35.3002ZM45.165 53.419C45.1666 53.5462 45.1301 53.6709 45.0604 53.7774C44.9906 53.8839 44.8906 53.9672 44.7732 54.0167C44.6558 54.0663 44.5263 54.0799 44.4011 54.0557C44.276 54.0316 44.1609 53.9708 44.0704 53.8811C43.98 53.7915 43.9184 53.677 43.8934 53.5523C43.8685 53.4275 43.8813 53.2982 43.9302 53.1808C43.9792 53.0633 44.0621 52.9631 44.1683 52.8928C44.2746 52.8225 44.3994 52.7854 44.5269 52.7862C44.6951 52.7872 44.8563 52.8541 44.9756 52.9724C45.095 53.0908 45.163 53.2511 45.165 53.419ZM42.1402 52.4123C42.1414 52.5511 42.1012 52.6872 42.0248 52.8031C41.9484 52.9191 41.8392 53.0099 41.711 53.0639C41.5829 53.1179 41.4416 53.1327 41.3049 53.1065C41.1683 53.0803 41.0426 53.0142 40.9437 52.9166C40.8448 52.819 40.7771 52.6943 40.7493 52.5583C40.7215 52.4223 40.7348 52.2811 40.7875 52.1527C40.8402 52.0242 40.9299 51.9142 41.0453 51.8367C41.1607 51.7592 41.2966 51.7176 41.4357 51.7172C41.6214 51.7167 41.7997 51.7895 41.9317 51.9198C42.0637 52.05 42.1387 52.2271 42.1402 52.4123ZM40.6707 50.2141L40.378 49.9979L40.2024 49.8655C39.8804 49.6241 39.6169 49.6299 39.3222 49.8655L38.9436 50.2549L38.77 50.4633L38.8871 50.5606C39.2247 50.8235 39.2774 51.1175 39.1798 51.2908L39.0061 51.4252C38.7779 51.4573 38.5459 51.4009 38.3582 51.2674L38.2314 51.1896L38.1494 51.3161L38.0928 51.4096L38.003 51.5439C37.8833 51.7215 37.8107 51.9265 37.7923 52.1397L37.804 52.2663L38.1377 52.6071L38.2157 52.6518L38.7407 52.9653C38.6069 53.0486 38.4538 53.0961 38.2962 53.1032C38.1387 53.1104 37.9819 53.077 37.8411 53.0062C37.3922 52.7862 37.1034 52.2741 37.1034 52.019C37.1406 51.5205 37.3126 51.0414 37.601 50.6327L37.6498 50.5567L37.601 50.4789L37.359 50.0408L37.8684 50.1303L37.9523 50.1556L38.0108 50.0894C38.206 49.8753 38.9027 49.1801 39.5447 49.1801C39.7019 49.1868 39.856 49.2261 39.9971 49.2955C40.1382 49.3649 40.2633 49.4629 40.3643 49.5832C40.5175 49.7628 40.6199 49.9799 40.661 50.2121L40.6707 50.2141ZM37.884 48.7167L35.9208 50.0953L35.511 49.5111L36.2194 49.0166L35.8291 48.4558L35.1246 48.9504L34.7128 48.3662L36.6799 46.9896L37.0917 47.5621L36.3833 48.0625L36.7736 48.6213L37.482 48.1268L37.884 48.7167ZM36.3325 46.275L36.2311 46.7599C36.0981 47.055 35.8531 47.2854 35.55 47.4005C35.4028 47.4616 35.2447 47.4921 35.0853 47.4901C34.9259 47.4881 34.7686 47.4536 34.623 47.3888C34.3119 47.2422 34.0685 46.9827 33.9427 46.6632C33.8168 46.3436 33.818 45.9882 33.9459 45.6695C34.0106 45.5231 34.1043 45.3913 34.2214 45.2819C34.3384 45.1725 34.4763 45.0878 34.6269 45.0328C34.7752 44.9715 34.9345 44.9412 35.095 44.9439C35.2554 44.9466 35.4136 44.9821 35.5598 45.0484C35.7158 45.1196 35.8561 45.221 35.9727 45.3467C36.0893 45.4723 36.1797 45.6198 36.2389 45.7805L36.3325 46.275ZM46.3945 52.4591C44.5284 51.9666 42.7081 51.3152 40.9537 50.512V50.4866C40.9718 50.2867 40.9482 50.0853 40.8844 49.8949C40.8206 49.7046 40.7179 49.5295 40.5829 49.3807C40.4543 49.2283 40.2951 49.1046 40.1156 49.0174C39.9361 48.9302 39.7403 48.8815 39.5408 48.8744L39.0412 48.9718C38.7732 48.7278 38.5203 48.4677 38.284 48.193C37.5814 47.3644 37.0334 46.4167 36.6663 45.395C36.4516 44.793 36.2935 44.1725 36.194 43.5413C36.1042 44.0709 35.4739 44.692 34.4376 44.7096L34.3323 44.4136C34.059 44.7135 33.7039 45.0133 32.7711 44.6843C32.9138 45.4092 33.1148 46.1216 33.3721 46.8144C33.9133 48.2668 34.7169 49.6079 35.7432 50.7709C36.0707 51.1431 36.4227 51.4931 36.797 51.8185L36.7814 52.0307C36.7814 52.4201 37.1561 53.0218 37.6888 53.2846C37.9043 53.3888 38.1449 53.43 38.3828 53.4035C38.6208 53.3769 38.8463 53.2838 39.0334 53.1347C39.9653 53.6104 40.9452 53.9857 41.9568 54.2543C43.0483 54.5765 44.1774 54.7552 45.3153 54.7859C46.1174 54.7859 47.1751 54.414 48.2269 53.7558C48.6171 53.5139 48.9848 53.2376 49.3256 52.9303L49.4388 52.8173C48.625 52.9303 47.3995 52.7064 46.3906 52.4552L46.3945 52.4591ZM41.6836 58.7638C41.5862 58.7773 41.494 58.8158 41.416 58.8756C41.338 58.9353 41.2769 59.0142 41.2386 59.1046C41.1167 58.8941 41.0458 58.658 41.0318 58.4153C41.0318 58.2087 41.114 58.0106 41.2604 57.8646C41.4068 57.7185 41.6053 57.6364 41.8124 57.6364C42.712 57.6364 42.5051 58.8514 42.9286 58.8514L43.2623 58.5555C43.2623 58.2089 42.6359 57.8798 42.6359 57.3872C42.6359 56.8946 43.0964 56.4682 43.596 56.071C44.0937 56.4604 44.5523 56.8868 44.5523 57.3872C44.5523 57.8876 43.9258 58.2108 43.9258 58.5555L44.2595 58.8514C44.6869 58.8514 44.4762 57.6364 45.3719 57.6364C45.5789 57.6364 45.7775 57.7185 45.9239 57.8646C46.0702 58.0106 46.1525 58.2087 46.1525 58.4153C46.1366 58.6577 46.0659 58.8933 45.9456 59.1046C45.9065 59.0159 45.8459 58.9383 45.7692 58.8788C45.6926 58.8194 45.6023 58.7798 45.5065 58.7638C44.8294 58.7638 45.0909 60.5279 44.2927 60.5279C44.2257 60.5355 44.1578 60.5291 44.0935 60.509C44.0291 60.4889 43.9696 60.4556 43.9189 60.4112C43.8682 60.3668 43.8273 60.3124 43.799 60.2513C43.7706 60.1903 43.7553 60.124 43.7541 60.0567C43.7541 59.8075 43.9297 59.7315 43.9297 59.531L43.5999 59.2603L43.2662 59.531C43.2662 59.7257 43.4419 59.8075 43.4419 60.0567C43.4407 60.124 43.4254 60.1903 43.397 60.2513C43.3686 60.3124 43.3277 60.3668 43.277 60.4112C43.2263 60.4556 43.1669 60.4889 43.1025 60.509C43.0381 60.5291 42.9703 60.5355 42.9032 60.5279C42.1012 60.5279 42.3666 58.7638 41.6953 58.7638H41.6836ZM43.1491 61.1393C43.1487 61.053 43.174 60.9686 43.2217 60.8967C43.2694 60.8247 43.3375 60.7685 43.4172 60.7351C43.4969 60.7018 43.5848 60.6928 43.6696 60.7092C43.7545 60.7257 43.8326 60.7668 43.894 60.8276C43.9554 60.8883 43.9974 60.9658 44.0146 61.0504C44.0319 61.1349 44.0236 61.2226 43.9909 61.3025C43.9581 61.3823 43.9024 61.4507 43.8307 61.4989C43.7591 61.5472 43.6747 61.5731 43.5882 61.5735C43.4724 61.5735 43.3613 61.5279 43.2791 61.4466C43.1969 61.3652 43.1502 61.2548 43.1491 61.1393ZM42.8506 60.8667L42.8018 61.1393C42.8018 61.3459 42.884 61.544 43.0304 61.69C43.1768 61.8361 43.3753 61.9181 43.5824 61.9181C43.7894 61.9181 43.9879 61.8361 44.1343 61.69C44.2807 61.544 44.363 61.3459 44.363 61.1393L44.3103 60.8667C45.3153 60.8219 45.1436 59.1143 45.4909 59.1143C45.6607 59.1143 45.7719 59.346 45.9222 59.6673C46.2508 59.3242 46.4483 58.877 46.4803 58.4036C46.4803 58.2565 46.4512 58.1109 46.3947 57.975C46.3382 57.8391 46.2553 57.7158 46.1509 57.6119C46.0464 57.5081 45.9225 57.4259 45.7861 57.3699C45.6498 57.314 45.5037 57.2854 45.3563 57.286L45.0304 57.3307V55.4284C44.0578 55.3787 43.0931 55.228 42.1519 54.9786V57.3502L41.8006 57.2976C41.5036 57.2976 41.2186 57.4154 41.0086 57.625C40.7985 57.8346 40.6805 58.1189 40.6805 58.4153C40.7125 58.8887 40.9101 59.3359 41.2386 59.679C41.3694 59.3733 41.4884 59.126 41.6582 59.126C41.9997 59.126 41.8533 60.8278 42.8466 60.8784L42.8506 60.8667ZM22.3344 82.8554C22.3344 84.5942 20.8552 85.2679 19.0169 85.2679C18.3034 85.2779 17.5933 85.17 16.9151 84.9486V80.2346H17.9533C21.0074 80.2346 22.3305 81.031 22.3305 82.8554H22.3344ZM17.9728 79.4947H16.9054V75.3201C17.544 75.1034 18.2157 75 18.89 75.0144C20.9411 75.0144 21.8739 75.7777 21.8739 77.1796C21.8739 78.7003 20.8767 79.4947 17.9709 79.4947H17.9728ZM20.7693 79.8316V79.7985C22.0651 79.6038 23.3687 78.7509 23.3687 77.0725C23.3687 75.2656 21.7763 74.1518 18.9252 74.1518C17.6352 74.1518 16.3648 74.3466 15.432 74.7574V85.5678C16.3804 85.9728 17.7855 86.1733 19.093 86.1733C21.8583 86.1733 23.8937 85.1647 23.8937 82.8126C23.8937 81.0096 22.1783 80.0866 20.7713 79.8238L20.7693 79.8316ZM31.4616 74.3173C31.4431 74.5012 31.4808 74.6864 31.5697 74.8484C31.6587 75.0105 31.7948 75.1419 31.96 75.2254C32.1253 75.3088 32.312 75.3404 32.4955 75.316C32.6791 75.2915 32.851 75.2122 32.9885 75.0884C33.126 74.9647 33.2228 74.8023 33.2661 74.6226C33.3093 74.4429 33.297 74.2544 33.2308 74.0818C33.1646 73.9092 33.0476 73.7606 32.8952 73.6557C32.7428 73.5507 32.5621 73.4943 32.3769 73.4937C32.2625 73.4877 32.1481 73.5042 32.0402 73.5424C31.9323 73.5805 31.833 73.6395 31.7479 73.716C31.6629 73.7926 31.5939 73.8851 31.5447 73.9882C31.4956 74.0914 31.4673 74.2033 31.4616 74.3173ZM33.1048 76.87H31.647V85.9728H33.1048V76.87ZM41.2289 74.3173C41.2562 74.5406 41.3645 74.7461 41.5333 74.8952C41.7021 75.0442 41.9197 75.1265 42.1451 75.1265C42.3705 75.1265 42.5881 75.0442 42.7569 74.8952C42.9257 74.7461 43.0339 74.5406 43.0613 74.3173C43.0379 74.0912 42.9313 73.8817 42.762 73.7294C42.5928 73.5771 42.373 73.4928 42.1451 73.4928C41.9172 73.4928 41.6974 73.5771 41.5281 73.7294C41.3589 73.8817 41.2523 74.0912 41.2289 74.3173ZM42.874 76.87H41.4162V85.9728H42.874V76.87ZM46.2501 79.1481C46.2501 78.1746 47.0482 77.5904 48.2523 77.5904C48.9716 77.5967 49.6797 77.7693 50.3209 78.0947L50.7385 77.2809C49.9106 76.8571 48.9893 76.6476 48.0591 76.6714C46.1622 76.6714 44.7903 77.6878 44.7903 79.2027C44.7903 82.0746 49.5383 81.2958 49.5383 83.5252C49.5383 84.5533 48.7226 85.1959 47.3175 85.1959C46.5152 85.2076 45.7205 85.0378 44.9933 84.6993L44.5698 85.5775C45.47 85.9848 46.4482 86.1914 47.4366 86.183C49.5832 86.183 51.0273 85.0849 51.0273 83.4844C51.0273 80.5442 46.2481 81.288 46.2481 79.1579L46.2501 79.1481ZM73.7077 74.3602H67.3106V85.9786H73.7077V85.0167H68.8289V80.4391H73.2237V79.4947H68.8367V75.3026H73.7155L73.7077 74.3602ZM72.5504 51.4193C72.5489 51.1809 72.6183 50.9473 72.7498 50.7482C72.8813 50.5491 73.0691 50.3934 73.2893 50.3008C73.5096 50.2082 73.7524 50.1829 73.9871 50.2281C74.2218 50.2732 74.4377 50.3868 74.6077 50.5545C74.7776 50.7221 74.8939 50.9363 74.9418 51.17C74.9897 51.4036 74.9671 51.6461 74.8768 51.8669C74.7865 52.0877 74.6326 52.2768 74.4346 52.4103C74.2365 52.5438 74.0032 52.6156 73.7642 52.6168C73.4442 52.6183 73.1366 52.4931 72.909 52.2686C72.6815 52.0441 72.5525 51.7386 72.5504 51.4193ZM72.1347 51.4193C72.134 51.7401 72.2286 52.0539 72.4065 52.3211C72.5845 52.5882 72.8379 52.7967 73.1346 52.9202C73.4314 53.0437 73.7582 53.0766 74.0737 53.0147C74.3891 52.9529 74.6792 52.7991 74.907 52.5728C75.1349 52.3466 75.2905 52.0579 75.3539 51.7435C75.4174 51.429 75.386 51.1028 75.2637 50.8061C75.1414 50.5094 74.9336 50.2556 74.6667 50.0768C74.3998 49.8979 74.0858 49.802 73.7642 49.8013C73.3333 49.8008 72.9197 49.9708 72.6142 50.2741C72.3087 50.5775 72.1363 50.9893 72.1347 51.4193ZM56.0681 98.2941C56.0681 96.2165 56.8838 94.4583 58.8665 94.4583C60.8492 94.4583 61.663 96.2107 61.663 98.2941C61.663 100.377 60.8492 102.124 58.8665 102.124C56.8838 102.124 56.0681 100.372 56.0681 98.2941ZM54.5947 98.3136C54.5947 101.01 56.0856 103.07 58.8665 103.07C61.6474 103.07 63.1403 101.01 63.1403 98.3136C63.1403 95.6168 61.6474 93.5607 58.8665 93.5607C56.0856 93.5607 54.5947 95.6032 54.5947 98.3136ZM54.2044 85.9786V78.0247C54.925 77.7083 55.7042 77.5464 56.4915 77.5496C58.1171 77.5496 58.968 78.4316 58.968 80.036V85.9786H60.4082V80.036C60.4082 77.7852 59.0695 76.6714 56.712 76.6714C55.8458 76.6758 54.9907 76.8657 54.2044 77.2283V72.7188H52.7427V85.9786H54.2044ZM46.7555 98.3136C46.7555 100.979 48.2504 103.07 50.9785 103.07C51.9309 103.07 52.7739 102.876 53.4374 102.465L53.0315 101.589C52.4632 101.925 51.8109 102.094 51.1503 102.075C49.1832 102.075 48.2504 100.337 48.2504 98.2941C48.2504 96.2516 49.1832 94.507 51.1503 94.507C51.8161 94.4907 52.4731 94.6607 53.0471 94.9976L53.4374 94.174C52.7739 93.7515 51.9309 93.5607 50.9785 93.5607C48.2464 93.5607 46.7555 95.6402 46.7555 98.3136ZM39.3613 101.589L38.9378 102.465C39.8382 102.871 40.8163 103.078 41.8045 103.07C43.9512 103.07 45.4012 101.974 45.4012 100.37C45.4012 97.4315 40.6161 98.1753 40.6161 96.0471C40.6161 95.0736 41.4142 94.4894 42.6203 94.4894C43.3393 94.4947 44.0472 94.6681 44.6869 94.9957L45.1104 94.1721C44.2833 93.7477 43.3628 93.5368 42.4329 93.5587C40.5302 93.5587 39.1583 94.579 39.1583 96.09C39.1583 98.9619 43.9063 98.185 43.9063 100.416C43.9063 101.445 43.0925 102.085 41.6875 102.085C40.884 102.095 40.0887 101.923 39.3613 101.583V101.589ZM38.8695 86.1402C39.1748 86.1466 39.479 86.1011 39.7691 86.0059V85.1452L39.2774 85.1978C38.2431 85.1978 37.7005 84.5397 37.7005 83.8446V77.7209H39.7691V76.8759H37.7005V74.3232L36.2545 74.7691V76.8817H34.7811V77.7267H36.2545V83.8037C36.2545 84.9544 36.918 86.1519 38.8695 86.1519V86.1402ZM30.7298 98.2999C30.7298 96.2224 31.5436 94.4641 33.5263 94.4641C35.509 94.4641 36.3247 96.2165 36.3247 98.2999C36.3247 100.383 35.5168 102.124 33.5263 102.124C31.5358 102.124 30.7298 100.372 30.7298 98.2941V98.2999ZM29.2525 98.3136C29.2525 101.01 30.7454 103.07 33.5263 103.07C36.3072 103.07 37.802 101.01 37.802 98.3136C37.802 95.6168 36.3091 93.5607 33.5263 93.5607C30.7435 93.5607 29.2525 95.6032 29.2525 98.3136ZM27.1664 77.8845C27.541 77.6897 28.1421 77.5963 28.7802 77.5963C29.2073 77.5949 29.6333 77.64 30.0507 77.7306L30.4254 76.6987C30.2302 76.6831 29.9472 76.6656 29.6799 76.6656C27.8142 76.6656 26.7526 76.87 25.7086 77.2711V85.9728H27.1664V77.8845ZM16.2946 91.2494L14.5382 102.868H15.8496L17.083 93.9111C17.1844 93.2199 17.1844 92.8461 17.2059 92.5754L17.2371 92.5579C17.332 93.0167 17.4571 93.4688 17.6118 93.9111L20.7635 102.868H21.7392L24.926 93.9111C25.0871 93.4662 25.2175 93.0108 25.3163 92.5482H25.3476C25.3557 93.0041 25.3902 93.4592 25.451 93.9111L26.6551 102.868H28.146L26.3897 91.2494H24.7836L21.6807 99.8985C21.5269 100.329 21.4017 100.768 21.306 101.215H21.2709C21.1771 100.768 21.0532 100.328 20.9001 99.8985L17.8948 91.2494H16.2946ZM21.7236 19.3251L21.3489 18.9512L20.9742 19.3251L21.3489 19.6989L21.7236 19.3251ZM21.4797 19.9462L21.105 20.3239L21.4797 20.6978C21.5292 20.6983 21.5784 20.689 21.6243 20.6705C21.6702 20.6519 21.7119 20.6244 21.7472 20.5897C21.7824 20.5549 21.8103 20.5135 21.8294 20.4679C21.8485 20.4223 21.8583 20.3734 21.8583 20.3239C21.8553 20.2247 21.8145 20.1303 21.7441 20.0601C21.6738 19.9899 21.5792 19.9491 21.4797 19.9462ZM21.9383 18.887C21.9876 18.8877 22.0365 18.8788 22.0823 18.8605C22.128 18.8423 22.1697 18.8152 22.205 18.7808C22.2402 18.7464 22.2682 18.7054 22.2874 18.6601C22.3066 18.6148 22.3166 18.5662 22.3169 18.517C22.3169 18.4174 22.2772 18.3218 22.2066 18.2513C22.1359 18.1808 22.0401 18.1412 21.9402 18.1412C21.8403 18.1412 21.7445 18.1808 21.6739 18.2513C21.6033 18.3218 21.5636 18.4174 21.5636 18.517L21.9383 18.887ZM24.362 17.892L23.8332 17.4013L23.8566 17.339L24.4967 17.3955L24.2391 16.7218L23.7668 17.1248H23.7434L23.7063 16.4278L23.0467 16.6751L23.4858 17.1949L23.4585 17.2475L22.8828 17.2923L23.1853 17.9504L23.5756 17.4948L23.6205 17.5084C23.6531 17.7791 23.6694 18.0516 23.6693 18.3243C23.6693 18.4508 23.7196 18.5721 23.8093 18.6616C23.899 18.751 24.0206 18.8013 24.1474 18.8013C24.2742 18.8013 24.3958 18.751 24.4855 18.6616C24.5751 18.5721 24.6255 18.4508 24.6255 18.3243L24.362 17.892ZM22.9414 18.075L22.5667 18.4489L22.9414 18.8227L23.3199 18.4489L22.9414 18.075ZM24.7523 17.8024H25.2812V17.265H24.7484L24.7523 17.8024ZM25.6032 17.1696H26.1321V16.6342H25.6032V17.1696ZM26.6004 17.3312H27.1254V16.7977H26.5946L26.6004 17.3312ZM27.2151 18.1315H27.7499V17.5941H27.2151V18.1315ZM27.8006 18.4236L27.2347 18.4489C27.3526 18.5989 27.4256 18.7791 27.4454 18.9688L27.0551 18.6105L27.1371 19.4847L27.4493 19.1674C27.4181 19.7359 27.1898 19.9715 26.9946 20.0124C26.9459 20.0235 26.8954 20.0247 26.8462 20.0159C26.797 20.0071 26.75 19.9886 26.7081 19.9613C26.6663 19.9341 26.6303 19.8987 26.6024 19.8573C26.5745 19.8159 26.5553 19.7693 26.5458 19.7203C26.497 19.4692 26.7175 19.3095 26.9361 19.5373C26.9751 19.0135 26.5458 19.0174 26.3643 19.2452C26.5887 18.7332 26.4989 18.4002 26.0481 18.1315C25.7671 18.6027 25.8842 18.9103 26.2433 19.2725C25.892 19.0992 25.5837 19.3913 25.892 19.7768C25.9584 19.4438 26.2511 19.5178 26.3214 19.7768C26.3819 20.0124 26.1574 20.3064 25.7827 20.4155C25.2461 20.581 25.0665 20.2324 24.9358 19.9443C25.0548 19.8664 25.3261 19.8956 25.6403 20.0903L25.3807 19.2375C25.3368 19.356 25.2679 19.4637 25.1787 19.5533C25.0895 19.643 24.982 19.7126 24.8636 19.7573C24.8822 19.4997 24.9394 19.2464 25.0334 19.0057L24.003 19.4302L24.6431 19.8527C24.5263 19.901 24.4007 19.9243 24.2743 19.9213C24.148 19.9183 24.0236 19.889 23.9093 19.8352L24.325 20.6277C24.4069 20.2714 24.5904 20.0591 24.7153 20.0319C24.8226 20.3356 24.9397 20.7017 24.444 20.9665C24.0927 21.1398 23.7356 21.0833 23.6127 20.8769C23.4897 20.6705 23.6283 20.3804 23.9093 20.5751C23.8605 20.0844 23.4292 20.0883 23.3082 20.4583C23.3082 19.9501 23.1775 19.6444 22.6428 19.5023C22.5101 20.0105 22.6838 20.3123 23.1931 20.5225C22.9043 20.4894 22.594 20.7796 22.998 21.1242C22.998 20.8068 23.2673 20.7659 23.4136 20.986L23.2907 21.5058C23.1287 21.611 22.795 21.6032 22.3793 21.2138H22.8223L22.2681 20.5362C22.2998 20.712 22.2891 20.8929 22.2369 21.0638C22.1136 20.9179 22.038 20.7379 22.0202 20.5479L21.6007 20.9217C22.1638 21.2866 22.6471 21.7615 23.0214 22.3178C23.7611 21.8876 24.5284 21.5064 25.3183 21.1768C26.1139 20.8616 26.9302 20.6014 27.7616 20.3979C27.6397 19.7394 27.6536 19.0629 27.8025 18.4099L27.8006 18.4236ZM29.0125 21.9147C28.4914 22.715 28.8446 23.0674 28.427 23.3965C27.8982 23.8073 27.1976 23.4335 26.8834 22.898C27.6148 22.6245 28.3256 22.2991 29.0105 21.9245L29.0125 21.9147ZM25.6813 25.1625L27.6425 24.4226C27.8962 24.3292 28.0718 24.2844 28.2455 24.4596L28.589 24.9347C28.4895 25.1294 28.0836 24.7108 27.7947 24.9347C27.5547 25.1177 27.7655 25.3085 28.2006 25.439C27.7772 25.6824 27.3264 25.8479 27.4688 26.2879C27.5898 26.6657 27.8143 26.763 28.226 26.7669C28.4465 26.7669 28.6046 27.0882 28.788 27.4659C28.9715 27.8437 29.0359 28.5427 28.3158 28.8503C27.6347 29.1444 27.1098 28.5505 26.979 28.1474C26.8483 27.7444 26.739 27.4095 26.8951 27.2498C27.1917 26.9655 27.2854 26.7416 27.102 26.3814C26.9068 25.9667 26.4619 26.1614 25.9857 26.2802C26.2062 25.8907 26.2257 25.6006 25.9213 25.6376C25.5622 25.6785 25.5583 26.2587 25.3593 26.1906L25.2734 25.6065C25.2734 25.3631 25.4334 25.2774 25.6813 25.1645V25.1625ZM25.369 23.4919C25.5076 24.0974 25.2597 24.8549 24.5884 24.9094C24.0635 24.9542 24.0771 24.4518 23.1482 24.2279C23.9056 24.0372 24.6478 23.7912 25.369 23.4919ZM34.4025 32.7115C34.3791 32.0611 34.223 31.4342 33.7683 31.0175C33.9381 30.0984 33.7917 28.9847 31.7153 27.612C32.7789 27.869 33.4053 28.827 34.2152 28.091C33.4873 28.0715 33.4697 26.4866 30.8391 25.1703C31.846 25.1508 32.6306 26.763 33.7917 25.8498C32.6969 25.7194 32.33 23.7781 30.359 23.1804C31.044 23.2563 31.7485 23.5912 32.3378 22.7909C31.6509 22.9525 31.2469 22.3197 30.5132 22.2672C30.7864 21.4163 30.7259 20.8925 30.4293 20.2597C29.9147 20.2798 29.4185 20.4557 29.0066 20.764C28.95 20.2967 28.4582 20.2675 28.0309 20.3006C28.0543 20.507 28.148 20.7951 27.9235 20.836C27.0973 21.0288 26.2845 21.2747 25.49 21.572C24.7024 21.8999 23.9493 22.305 23.2419 22.7812L22.7891 22.4736C22.4691 22.7403 22.1549 23.0947 22.3871 23.4471C21.8334 23.4756 21.3005 23.6666 20.8552 23.9962C20.8552 24.5803 21.3411 25.1469 22.0651 25.4624C20.8474 26.6657 21.9519 27.7833 20.8767 28.8348C22.3871 28.8912 22.1217 26.8 22.8828 26.5119C22.8106 27.9819 21.9832 28.2409 21.9832 29.822C21.9832 30.6709 22.4886 31.5938 22.0359 32.1585C23.2985 31.8119 22.9648 29.0431 23.7512 28.1922C23.8664 28.6647 23.8295 29.1613 23.6458 29.6117C23.2087 30.9104 23.6946 32.6862 23.0097 33.2586C24.1376 33.1496 24.3933 31.5568 25.1563 30.6553C24.3581 32.7543 23.4819 36.3915 22.3052 38.0933C20.1 41.0471 18.8159 44.6434 16.8 44.6434C15.9121 44.6434 15.2388 44.1021 15.2388 42.9844C15.2388 39.6257 21.0133 37.3183 21.0133 33.7473C21.024 33.4635 20.9775 33.1804 20.8767 32.9148C20.7759 32.6492 20.6227 32.4065 20.4262 32.201C20.2297 31.9955 19.9939 31.8314 19.7327 31.7184C19.4715 31.6054 19.1903 31.5459 18.9057 31.5432C18.2511 31.5844 17.6283 31.8396 17.1337 32.2695C16.9169 32.1789 16.6855 32.1281 16.4507 32.1195C14.4055 32.1195 14.9519 35.7762 13.1761 35.7392C13.8805 36.1286 15.0983 35.3693 15.8106 34.3412C15.514 36.7206 12.0852 36.0897 12.3506 38.9422C12.8267 36.7128 18.2909 37.0379 18.2909 33.6578C18.2841 33.4746 18.2389 33.2949 18.1582 33.1303C18.0776 32.9656 17.9632 32.8196 17.8226 32.7017C18.1635 32.4738 18.5636 32.35 18.974 32.3454C19.6297 32.3454 20.2249 32.8283 20.2249 33.7863C20.2249 36.7809 14.4797 39.3122 14.4797 42.9883C14.4713 43.5408 14.6394 44.0816 14.9597 44.5324C14.7582 44.6224 14.5317 44.6404 14.3184 44.5833C14.1051 44.5262 13.9181 44.3975 13.7888 44.2189C13.7576 45.171 15.1158 45.7668 15.9726 45.2879L16.558 45.4066C16.2985 46.1134 15.4222 46.3237 14.9617 46.2926C16.3707 47.4005 18.8217 45.946 18.6929 44.6998C19.8073 43.8022 20.5156 42.2659 21.3275 41.2534C21.2767 41.489 21.2338 41.7208 21.1967 41.9486C20.3829 43.4401 19.6141 44.7836 19.3974 46.7307C19.2198 48.376 18.3846 49.8597 17.2196 49.8597C16.9678 49.8597 16.5482 49.5267 16.357 49.6883C15.994 49.9979 16.3316 50.327 16.3316 50.6307C16.3316 51.1019 15.4281 51.5692 15.4281 53.0121C15.4281 53.6624 15.8067 54.4373 15.6642 54.8677C16.035 54.6729 16.5268 54.0635 16.7317 53.2671C17.122 55.1695 15.9121 55.0916 16.7883 56.7817C16.8976 56.2248 17.4596 55.9892 17.7972 56.2248C18.1348 56.4604 17.9924 56.6239 17.7328 56.8712C17.4733 57.1185 17.241 58.39 18.4041 58.3179C18.1856 58.1719 18.168 57.8389 18.7417 57.7202C19.5438 57.5625 19.776 57.9266 20.6269 57.9266C21.1538 57.9266 21.3001 57.2412 21.7158 57.2412C22.1315 57.2412 22.1295 57.5625 21.9871 57.7981C22.6603 57.6189 22.7813 57.2568 22.7813 56.879C22.7813 56.5013 22.4769 56.2657 22.713 56.1235C22.9492 55.9814 23.7259 56.1391 23.4214 56.77C23.8117 56.6999 24.0361 56.4117 24.0361 55.921C24.0361 55.4304 23.478 55.1422 22.9492 55.2376C22.8594 54.93 22.4027 54.7664 21.9871 54.7664C21.0425 54.7664 21.1928 55.5063 20.5469 55.5063C19.5126 55.5063 18.5095 54.1706 18.5095 51.91C18.5095 50.7047 19.8131 50.3951 20.7381 49.9979C21.6631 49.6007 23.2751 48.6116 24.2508 46.9916C25.008 45.724 25.0314 44.326 24.9299 42.6807C26.2374 43.4245 26.3877 44.4973 26.3877 45.2723C26.3877 46.2848 25.8628 46.6937 25.451 46.8806C25.0978 47.0403 24.9826 46.9741 24.9455 47.1824C24.93 47.2823 24.949 47.3845 24.9993 47.4723C25.0497 47.56 25.1284 47.6281 25.2227 47.6653C25.691 47.9048 25.5973 48.3565 25.7281 48.8336C25.9665 49.5541 26.4175 50.1859 27.0219 50.6463C27.0894 50.1778 27.094 49.7024 27.0356 49.2327C28.0406 49.7234 27.2308 51.727 29.1823 51.727C28.8251 51.5225 28.9188 50.9987 29.1218 50.9228C29.3247 50.8469 29.594 51.0552 29.9687 51.5751C30.3434 52.095 30.2419 52.056 31.1611 52.056C32.0802 52.056 31.6665 51.7386 32.1544 51.7386C32.6423 51.7386 32.6032 52.2994 32.3495 52.7122C33.1692 52.4669 33.4209 51.8457 33.1438 51.2032C33.8658 50.8138 34.2483 51.3706 34.3537 51.764C35.066 51.0494 34.3537 50.1926 33.7956 50.1362C33.7939 49.9939 33.7385 49.8576 33.6405 49.7544C33.5425 49.6511 33.409 49.5886 33.2667 49.5793C32.9618 49.5514 32.6554 49.5442 32.3495 49.5579C32.0119 49.5793 31.8246 50.0622 31.4304 50.0622C30.2126 50.0622 27.8025 47.8639 27.8025 46.9137C27.8025 45.9635 30.1073 45.3833 30.1073 43.9074C30.1073 41.9778 28.2046 41.3196 26.6043 40.0813C27.1703 39.4465 28.8407 39.3024 29.7853 39.7561C29.8906 39.2187 30.2419 39.3492 30.3707 38.4262C30.7044 39.2401 30.2575 39.906 30.6029 40.2546C30.8723 39.8652 31.5592 39.9177 31.5201 38.9111C31.7309 39.54 31.2508 40.5077 31.7309 40.9302C31.8168 40.4103 32.1212 40.313 32.3164 40.313C32.5115 40.313 32.6813 40.4551 32.6813 40.7589C32.6813 41.5377 31.7543 41.3196 31.7543 42.19C31.7543 42.558 32.2188 42.6807 32.2188 42.9241C32.2188 43.1675 31.8285 43.5257 31.3757 43.2161C31.4424 43.3918 31.5586 43.5444 31.7103 43.6556C31.8619 43.7669 32.0426 43.832 32.2305 43.8431C32.4603 43.8263 32.6806 43.7453 32.8663 43.6092C33.052 43.4732 33.1955 43.2877 33.2804 43.074C33.5009 43.627 33.3331 44.2423 32.935 44.3182C33.3585 44.5285 34.3557 44.3338 34.2425 43.0584C34.8045 43.1519 35.1011 43.5335 34.7674 44.2092C35.2319 44.0982 35.6554 43.8743 35.6554 43.3797C35.6554 43.0058 35.2807 42.7449 35.3451 42.2212C35.3939 41.7986 34.8084 41.3936 34.7226 40.8192C34.6367 40.2448 34.7108 39.6938 34.0454 38.9228C33.3799 38.1517 31.243 35.8268 30.5678 35.048C30.7376 35.0285 30.9425 35.0655 31.3601 35.4627C31.6216 35.7061 32.2695 36.3331 32.7262 36.7829C33.3031 35.2929 34.1417 33.9174 35.2026 32.7212C35.3978 32.5129 35.5812 32.3104 35.7881 32.1195C35.2993 32.2341 34.8339 32.4317 34.4123 32.7037L34.4025 32.7115ZM34.8201 24.1831C34.8201 24.321 34.875 24.4532 34.9727 24.5507C35.0705 24.6482 35.203 24.703 35.3412 24.703C35.4794 24.703 35.6119 24.6482 35.7096 24.5507C35.8073 24.4532 35.8622 24.321 35.8622 24.1831C35.8622 24.0452 35.8073 23.913 35.7096 23.8155C35.6119 23.718 35.4794 23.6632 35.3412 23.6632C35.203 23.6632 35.0705 23.718 34.9727 23.8155C34.875 23.913 34.8201 24.0452 34.8201 24.1831ZM35.0836 22.3957C34.9801 22.3953 34.8789 22.4255 34.7927 22.4825C34.7065 22.5395 34.6391 22.6208 34.5992 22.716C34.5593 22.8112 34.5485 22.9161 34.5683 23.0174C34.5881 23.1187 34.6376 23.2118 34.7104 23.2851C34.7833 23.3583 34.8763 23.4084 34.9777 23.4289C35.0791 23.4494 35.1843 23.4395 35.28 23.4003C35.3757 23.3612 35.4576 23.2946 35.5154 23.209C35.5732 23.1234 35.6042 23.0226 35.6046 22.9194C35.6049 22.8509 35.5916 22.783 35.5656 22.7196C35.5395 22.6562 35.5012 22.5985 35.4528 22.5499C35.4044 22.5012 35.3469 22.4626 35.2836 22.4361C35.2202 22.4097 35.1523 22.3959 35.0836 22.3957ZM35.2592 21.132C35.1562 21.132 35.0554 21.1625 34.9697 21.2196C34.8841 21.2767 34.8173 21.3579 34.7778 21.4529C34.7384 21.5479 34.7281 21.6524 34.7482 21.7533C34.7683 21.8541 34.8179 21.9468 34.8908 22.0195C34.9637 22.0922 35.0565 22.1417 35.1576 22.1618C35.2586 22.1818 35.3634 22.1715 35.4586 22.1322C35.5538 22.0928 35.6352 22.0262 35.6925 21.9407C35.7497 21.8552 35.7803 21.7547 35.7803 21.6519C35.7798 21.5141 35.7247 21.3822 35.6271 21.2848C35.5295 21.1874 35.3973 21.1325 35.2592 21.132ZM36.354 20.4622C36.3544 20.3588 36.324 20.2577 36.2667 20.1715C36.2094 20.0854 36.1277 20.0182 36.0321 19.9785C35.9364 19.9388 35.8311 19.9283 35.7295 19.9483C35.6278 19.9684 35.5345 20.0182 35.4612 20.0913C35.3879 20.1644 35.3381 20.2575 35.318 20.3589C35.2978 20.4603 35.3084 20.5654 35.3482 20.6608C35.388 20.7563 35.4554 20.8377 35.5417 20.8949C35.628 20.9521 35.7294 20.9825 35.833 20.9821C35.9015 20.9823 35.9693 20.9691 36.0327 20.943C36.096 20.917 36.1535 20.8787 36.202 20.8304C36.2504 20.782 36.2888 20.7246 36.3149 20.6614C36.341 20.5982 36.3543 20.5305 36.354 20.4622ZM37.3766 19.5646C37.3762 19.4614 37.3452 19.3606 37.2874 19.275C37.2296 19.1894 37.1476 19.1228 37.0519 19.0837C36.9562 19.0445 36.851 19.0346 36.7497 19.0551C36.6483 19.0756 36.5553 19.1257 36.4824 19.1989C36.4095 19.2722 36.3601 19.3653 36.3403 19.4666C36.3205 19.5679 36.3312 19.6728 36.3712 19.768C36.4111 19.8632 36.4784 19.9445 36.5647 20.0015C36.6509 20.0585 36.7521 20.0887 36.8555 20.0883C36.9242 20.0881 36.9922 20.0743 37.0555 20.0479C37.1189 20.0214 37.1764 19.9828 37.2248 19.9341C37.2732 19.8855 37.3115 19.8278 37.3375 19.7644C37.3636 19.701 37.3769 19.6331 37.3766 19.5646ZM38.6763 19.1751C38.6767 19.0718 38.6463 18.9706 38.589 18.8845C38.5316 18.7984 38.45 18.7312 38.3543 18.6915C38.2587 18.6517 38.1534 18.6412 38.0517 18.6613C37.9501 18.6814 37.8567 18.7311 37.7835 18.8042C37.7102 18.8773 37.6604 18.9705 37.6402 19.0719C37.6201 19.1733 37.6307 19.2784 37.6705 19.3738C37.7103 19.4692 37.7776 19.5507 37.8639 19.6079C37.9503 19.6651 38.0516 19.6954 38.1552 19.695C38.2933 19.6945 38.4255 19.6396 38.5231 19.5422C38.6207 19.4448 38.6758 19.3129 38.6763 19.1751ZM40.0423 19.2959C40.0342 19.1627 39.9754 19.0377 39.8781 18.9463C39.7807 18.8549 39.6521 18.804 39.5184 18.804C39.3847 18.804 39.256 18.8549 39.1587 18.9463C39.0613 19.0377 39.0025 19.1627 38.9944 19.2959C38.99 19.3672 39.0003 19.4387 39.0247 19.5059C39.0491 19.5731 39.0869 19.6346 39.136 19.6867C39.1851 19.7387 39.2444 19.7802 39.3101 19.8086C39.3759 19.8369 39.4467 19.8516 39.5184 19.8516C39.59 19.8516 39.6609 19.8369 39.7266 19.8086C39.7924 19.7802 39.8516 19.7387 39.9007 19.6867C39.9498 19.6346 39.9877 19.5731 40.012 19.5059C40.0364 19.4387 40.0467 19.3672 40.0423 19.2959ZM39.7125 22.5105C39.4101 23.0947 39.1544 23.4198 39.1954 23.8618C39.2364 24.3038 39.6989 24.6232 39.9194 25.0652C40.1145 24.5492 40.4561 24.1598 40.417 23.7528C40.378 23.3459 39.814 22.8065 39.7125 22.5105ZM41.3362 19.6697C41.3354 19.5671 41.3042 19.4669 41.2465 19.382C41.1888 19.297 41.1071 19.2309 41.0118 19.1922C40.9166 19.1534 40.8119 19.1437 40.7111 19.1642C40.6103 19.1847 40.5178 19.2345 40.4453 19.3074C40.3729 19.3802 40.3236 19.4729 40.3038 19.5736C40.284 19.6743 40.2946 19.7787 40.3341 19.8734C40.3737 19.9682 40.4405 20.0492 40.5261 20.1061C40.6117 20.1631 40.7122 20.1935 40.8151 20.1935C40.884 20.1937 40.9522 20.1803 41.0158 20.1541C41.0793 20.1278 41.1371 20.0892 41.1855 20.0404C41.234 19.9917 41.2723 19.9338 41.2982 19.8702C41.324 19.8065 41.337 19.7384 41.3362 19.6697ZM42.0368 19.7184C41.9331 19.7149 41.8307 19.7423 41.7426 19.7971C41.6546 19.8519 41.5849 19.9315 41.5423 20.0259C41.4998 20.1203 41.4863 20.2253 41.5037 20.3273C41.5211 20.4294 41.5685 20.524 41.6399 20.5991C41.7113 20.6742 41.8035 20.7264 41.9047 20.7491C42.006 20.7718 42.1117 20.7639 42.2084 20.7264C42.3051 20.689 42.3885 20.6237 42.448 20.5389C42.5074 20.454 42.5402 20.3535 42.5422 20.25C42.5425 20.1814 42.5292 20.1135 42.5032 20.0501C42.4771 19.9867 42.4388 19.929 42.3904 19.8804C42.342 19.8318 42.2845 19.7931 42.2212 19.7666C42.1578 19.7402 42.0898 19.7264 42.0212 19.7262L42.0368 19.7184ZM43.5609 20.1156C43.9336 20.1161 44.2954 19.9901 44.5869 19.7583C44.8784 19.5266 45.0823 19.2028 45.165 18.8402H41.9568C42.0395 19.2028 42.2434 19.5266 42.5349 19.7583C42.8264 19.9901 43.1882 20.1161 43.5609 20.1156ZM43.2545 23.0733V20.8341L42.6691 20.655V23.0674L43.2545 23.0733ZM44.4566 23.0733V20.6569L43.8712 20.836V23.0694L44.4566 23.0733ZM41.9353 18.2055H43.2233V16.8698C42.9003 16.9369 42.6049 17.0991 42.3753 17.3355C42.1457 17.5719 41.9924 17.8715 41.9353 18.1957V18.2055ZM43.7482 15.5048C44.2196 15.613 44.6393 15.8798 44.9367 16.2603V14.4651C44.64 14.8456 44.2198 15.1113 43.7482 15.2167C43.797 14.7825 44.0644 14.3833 44.4313 13.9296H42.6886C43.0555 14.3833 43.3248 14.7825 43.3775 15.2167C42.904 15.112 42.4818 14.8463 42.1831 14.4651V16.2603C42.4832 15.88 42.9046 15.6134 43.3775 15.5048C43.2983 15.9717 43.0418 16.3901 42.6613 16.6731H44.4605C44.0798 16.391 43.8243 15.9719 43.7482 15.5048ZM43.9083 18.1957H45.1865C45.1311 17.8724 44.9796 17.5731 44.7517 17.3367C44.5238 17.1003 44.2299 16.9376 43.9083 16.8698V18.1957ZM45.6334 20.25C45.6342 20.1461 45.604 20.0444 45.5467 19.9577C45.4894 19.871 45.4076 19.8033 45.3116 19.7631C45.2156 19.7229 45.1099 19.7121 45.0077 19.732C44.9056 19.7519 44.8117 19.8017 44.7379 19.875C44.6642 19.9483 44.614 20.0418 44.5936 20.1436C44.5733 20.2455 44.5837 20.351 44.6236 20.4469C44.6636 20.5428 44.7311 20.6247 44.8178 20.6822C44.9045 20.7397 45.0063 20.7702 45.1104 20.7698C45.2488 20.7698 45.3815 20.7151 45.4795 20.6177C45.5775 20.5202 45.6329 20.388 45.6334 20.25ZM46.8492 19.6775C46.8494 19.6092 46.8361 19.5414 46.81 19.4782C46.7839 19.4151 46.7456 19.3576 46.6971 19.3093C46.6487 19.261 46.5912 19.2227 46.5278 19.1967C46.4645 19.1706 46.3966 19.1574 46.3281 19.1576C46.2245 19.1572 46.1231 19.1876 46.0368 19.2448C45.9505 19.3019 45.8832 19.3834 45.8434 19.4789C45.8035 19.5743 45.793 19.6794 45.8131 19.7808C45.8332 19.8822 45.8831 19.9753 45.9564 20.0484C46.0296 20.1215 46.123 20.1713 46.2246 20.1913C46.3263 20.2114 46.4316 20.2009 46.5272 20.1612C46.6229 20.1214 46.7045 20.0543 46.7618 19.9681C46.8192 19.882 46.8496 19.7809 46.8492 19.6775ZM47.4483 22.5183C47.3468 22.8143 46.7848 23.3498 46.7438 23.7606C46.7028 24.1714 47.0365 24.557 47.2414 25.0729C47.46 24.631 47.9323 24.3136 47.9693 23.8696C48.0064 23.4257 47.7508 23.0908 47.4483 22.5183ZM48.1489 19.3037C48.1489 19.1647 48.0936 19.0315 47.9951 18.9333C47.8967 18.8351 47.7631 18.7799 47.6239 18.7799C47.4847 18.7799 47.3512 18.8351 47.2527 18.9333C47.1543 19.0315 47.099 19.1647 47.099 19.3037C47.099 19.4426 47.1543 19.5758 47.2527 19.674C47.3512 19.7722 47.4847 19.8274 47.6239 19.8274C47.7631 19.8274 47.8967 19.7722 47.9951 19.674C48.0936 19.5758 48.1489 19.4426 48.1489 19.3037ZM49.5149 19.1829C49.5149 19.0445 49.4598 18.9118 49.3617 18.8139C49.2637 18.7161 49.1306 18.6611 48.9919 18.6611C48.8532 18.6611 48.7202 18.7161 48.6221 18.8139C48.524 18.9118 48.4689 19.0445 48.4689 19.1829C48.4689 19.3213 48.524 19.4541 48.6221 19.5519C48.7202 19.6498 48.8532 19.7048 48.9919 19.7048C49.1306 19.7048 49.2637 19.6498 49.3617 19.5519C49.4598 19.4541 49.5149 19.3213 49.5149 19.1829ZM53.2969 42.4568L53.3906 42.3477V42.2095H53.1954V42.3224L53.2247 42.4412L53.2969 42.4568ZM50.1296 34.6041L50.2643 34.7735L50.3911 34.5301L50.1296 34.6041ZM49.1773 39.5108L48.9451 39.4874L49.0309 39.3453L48.7733 39.2966C48.6797 39.394 48.0376 39.2674 48.0376 38.7923L48.2328 38.9714C48.5431 39.1545 48.8475 39.0357 48.8729 38.7767C48.8982 38.5178 48.6446 38.3873 48.3674 38.1595L48.0864 37.9025C48.0006 37.7194 48.0864 37.55 47.8386 37.2132L47.7566 36.9114C47.6713 37.0744 47.6398 37.2601 47.6668 37.442C47.6938 37.6239 47.7779 37.7926 47.9069 37.9239C48.1723 38.216 48.746 38.4963 48.7265 38.7475L48.5665 38.8819L48.1762 38.6872L48.1235 38.6346C47.9095 38.4082 47.7137 38.1654 47.5381 37.9083C47.2707 37.5656 47.3917 37.2443 47.4327 36.9601C47.6278 36.7011 47.3156 36.1812 47.1438 36.0508L47.1321 35.7782L46.9682 35.7996L46.8336 35.6691L46.7126 35.5387L46.5525 35.6652L46.3789 35.6983L46.1837 35.7665L46.0861 35.9047L46.1681 36.0586L46.1974 36.0761L46.2774 36.1734L46.3398 36.0663L46.5545 36.1111L46.494 36.2085L46.2657 36.226L46.2091 36.3604L46.4042 36.4207L46.7594 36.4733C46.7594 36.7615 46.412 36.7342 46.3476 37.0788L46.1525 36.8997L45.9046 36.596L45.6646 36.4012L45.5456 36.1598L45.5866 35.8755L45.5612 35.786L45.407 35.6886L45.4675 35.7918L45.4226 35.8444V35.9456V35.9612V36.0099H45.409L45.288 35.8307H45.2353V35.8191L45.0596 35.7743L45.1338 35.8074L45.1162 35.8794L45.2431 35.9904L45.2665 36.0021L45.2802 36.0313L45.2665 36.043L45.0714 36.0994V36.1559L45.1006 36.3117L45.1299 36.226H45.1494L45.1904 36.2611L45.2587 36.2338H45.2919L45.329 36.2611V36.2864L45.3699 36.4811L45.1748 36.3915L45.4031 36.6388L45.4324 36.8335L45.4656 36.7965L45.4773 36.814L45.5592 36.9192L45.5709 36.8588L45.6529 36.9932C45.7633 37.2577 45.9637 37.4749 46.2188 37.6065L45.8149 37.9959L45.4929 38.1342L45.3914 38.0368L45.286 38.0076L45.2255 38.0271L45.0499 38.0855L45.167 38.105V38.1653L45.3758 38.2393L45.3953 38.2549L45.3055 38.2841L45.1299 38.2724L45.0948 38.3211H45.0694L45.0206 38.5314L45.0694 38.4223L45.1065 38.4632L45.3348 38.4107H45.3504L45.366 38.621L45.4207 38.6326V38.6541L45.6158 38.7475L45.5065 38.6326L45.5553 38.621L45.5709 38.4262H45.6002L45.77 38.4924L45.8442 38.3776L46.1525 38.3211L46.332 38.1381L46.5604 38.1829L46.6911 37.9589C46.6735 38.4632 47.3507 38.4516 47.5127 38.7378L46.9506 38.6404L46.4628 39.0143L46.7555 39.5497L46.3086 39.5711H46.291L45.93 39.3881L45.8812 39.4193L45.7251 39.5828L45.8402 39.5166V39.5575L45.9086 39.6159L45.9827 39.5945L46.0022 39.6159L45.8071 39.7697L45.8402 39.8262L45.9827 39.9119L45.9339 39.8379H45.9827L46.0061 39.8067L46.0256 39.8223L46.0139 39.8632L46.0295 39.9275L46.2247 39.9976L46.1271 39.9489L46.172 39.9275L46.1935 39.8554L46.213 39.8379H46.2618L46.291 39.8554L46.4374 39.9158L46.4979 39.8593L46.5799 39.9158L46.775 39.8866L46.8843 39.797H47.0931L47.138 39.6315L47.0033 39.3511C46.9546 39.098 47.3 38.9617 47.5029 38.9928C47.5508 39.1494 47.6326 39.2935 47.7426 39.415C47.8525 39.5365 47.9879 39.6323 48.1391 39.6958C48.3752 39.7775 48.4689 39.5244 48.5411 39.5614L48.5782 39.614L48.5587 39.9041H48.3226L48.2367 39.9391L48.0864 40.0949L48.2113 40.0326V40.0618L48.4065 40.1261L48.4279 40.1436L48.3967 40.3052L48.4494 40.3344L48.5392 40.461V40.3422H48.5938L48.6992 40.1806L48.7324 40.3558L48.7812 40.3675L48.9548 40.4162L48.8787 40.3597L48.9275 40.2935L48.8417 40.0793L48.988 39.908V39.8846L49.1344 39.7425L48.9392 39.7094L49.1773 39.5108ZM49.7803 40.4843L49.5266 40.424L49.634 40.7199H47.7527L47.6259 40.5252L47.3644 40.6128L47.2258 40.2663L47.0755 40.5992L46.814 40.5116L46.6892 40.7063H45.0792L45.1689 40.4181L44.8743 40.5116V37.918L45.1026 37.7895L45.0089 37.5325L45.3465 37.3865L45.0089 37.2366L45.1026 36.9756L44.8743 36.8413V34.6449L45.1182 34.7345L45.0655 34.4444C46.2444 34.836 47.2834 35.5621 48.0552 36.5336L48.0181 36.7089L48.2425 36.8588L48.0669 37.1801L48.426 37.0983L48.5118 37.3573L48.6582 37.3787C49.2412 38.3238 49.6263 39.3769 49.7901 40.4746L49.7803 40.4843ZM50.034 40.8893L50.0184 40.792C49.8534 39.2288 49.2493 37.744 48.2757 36.5083C47.8235 35.9283 47.2813 35.4242 46.6696 35.0149C46.1018 34.63 45.4712 34.3467 44.806 34.1776L44.6869 34.1523V40.8893H50.034ZM48.3596 36.4441C49.3946 37.7541 50.0191 39.3397 50.155 41.0023H44.5698V34.018C45.9905 34.2867 47.3273 35.1473 48.3518 36.4441H48.3596ZM48.504 36.3273C47.6397 35.2021 46.4474 34.3716 45.0909 33.9498L44.7806 33.6987L44.6518 33.8447L44.5893 33.8311L44.2927 33.7025L44.3864 34.0472V34.0744L44.1912 34.1757L44.3864 34.5164V37.2424L44.0566 37.3923L44.3864 37.5384V40.4804L44.1912 40.8017L44.3864 40.9224V40.9886L44.3044 41.2632L44.5698 41.1911H44.6518L44.7689 41.3859L45.087 41.1911H47.0658L47.2161 41.5319L47.3663 41.1911H49.6144L49.9579 41.3956L50.073 41.1853H50.1218L50.4185 41.271L50.3365 41.0062V40.9283L50.5317 40.8076L50.2916 40.4863C50.1041 39.153 49.6076 37.8816 48.8417 36.7731L49.0583 36.4285L48.668 36.5336L48.504 36.3273ZM40.981 35.2427L40.9108 35.1181L41.1059 35.194L40.981 35.2427ZM40.9069 35.305L40.8951 35.3576L40.8503 35.305V35.3615H40.7566L40.7683 35.4413L40.7566 35.5192L40.6473 35.5757L40.6141 35.4511L40.6629 35.3887L40.7273 35.3537L40.6707 35.2719L40.7078 35.231H40.6434L40.6707 35.1862H40.7195L40.8795 35.2602L40.9069 35.305ZM40.7937 35.0558L40.6707 35.0928L40.6258 34.9623L40.7937 35.0558ZM41.5548 34.8611L41.6738 34.6858C42.4876 34.6294 42.5188 34.0491 43.1062 33.9343C42.3978 33.8369 42.3002 34.386 41.9977 34.4152L42.2105 34.0764C42.0641 34.2711 41.7499 34.2847 41.5743 34.5028L41.543 34.6177L41.3713 34.8533C41.3713 35.4666 43.0164 35.048 43.0164 35.4919C43.0164 35.6458 42.7315 35.7548 42.2788 35.7548C41.9412 35.7548 41.6933 35.5114 41.0669 35.673L41.1957 35.2836L41.303 35.157L41.1801 35.1006L41.1469 35.0149L41.1157 34.9292L40.9732 34.8319L40.8229 34.7929L40.7332 34.8046L40.6512 34.8455L40.5322 34.7929L40.5205 34.9701L40.3409 35.1045L40.3995 35.1668L40.2765 35.3615L40.3175 35.4102L40.2277 35.784L40.1009 35.6769L40.0248 35.4822L40.1009 35.2505L40.0814 35.1824L39.9584 35.0967L39.9994 35.1824L39.9545 35.2232V35.305V35.3245L39.9428 35.3615H39.9292L39.8452 35.2116H39.8004V35.194L39.654 35.157L39.7106 35.1824L39.6852 35.2427L39.7867 35.3323L39.8121 35.344V35.3693H39.7965L39.6208 35.4141V35.4588V35.5893L39.6618 35.5192H39.6735L39.7028 35.5445L39.7711 35.527H39.8101L39.8374 35.5445V35.564L39.855 35.7236L39.8667 35.7392L39.6716 35.7139L39.8667 35.9086H39.8843L39.9233 35.9573L39.9604 35.9281V35.9398L40.0189 36.0293L40.0462 35.9768L40.1926 36.1715L39.8257 36.2825L39.5467 36.2942L39.1564 36.335L39.1115 36.2163L39.0354 36.1598H38.9827L38.8266 36.1442L38.9163 36.1968L38.8929 36.2494L39.0256 36.3759L39.0354 36.3954L38.9573 36.3837L38.8227 36.3175L38.7778 36.3389H38.7622L38.6431 36.485L38.7212 36.4207L38.7329 36.4636L38.928 36.4928L38.9417 36.5044L38.8851 36.6797L38.9163 36.7089V36.7206L39.0432 36.8627L38.9983 36.7361L39.0354 36.7478L39.1154 36.6018L39.1408 36.6154L39.25 36.7206L39.3613 36.5979L39.4023 36.6953L39.4667 36.631L39.4296 36.7809L39.5681 36.6349L39.6013 36.6836H39.773H39.7847V36.7731L39.8218 36.7284L39.8706 36.8627C39.8901 36.6466 40.0092 36.7323 40.1477 36.6466H40.1594L40.1028 36.7206L40.2726 36.594L40.3624 36.5161L40.5146 36.4519V36.5531L40.8659 36.3876C41.1742 36.3214 40.6707 36.0975 41.3089 36.1306L41.4884 36.0702L41.5333 36.3662L41.7011 36.4363L41.6914 36.4519L41.5626 36.4889L41.2523 36.3253L41.2074 36.3545L41.0727 36.4928L41.1742 36.4363V36.4674L41.2328 36.52L41.2933 36.5044L41.3128 36.52L41.1547 36.6544L41.184 36.703L41.3011 36.777L41.2601 36.7167H41.3011L41.3225 36.6875L41.342 36.703L41.3264 36.7361L41.3459 36.7887L41.5099 36.853L41.4279 36.8101L41.465 36.7887L41.4806 36.7323L41.4962 36.7206H41.5411L41.5704 36.7323L41.6933 36.7809L41.7909 36.631H41.8553L42.0797 36.6096L42.0056 36.3701L41.9568 36.2085L42.2671 36.2805C42.4954 36.2805 42.2788 36.2494 42.3802 36.191L42.6535 36.1637L42.6983 36.2163L42.6866 36.3993H42.4915L42.4212 36.4266L42.3002 36.557L42.4017 36.5044V36.5298L42.5481 36.5823L42.5598 36.594L42.5032 36.7323L42.5442 36.7517L42.6183 36.8627V36.7654H42.6593L42.7393 36.6349L42.7686 36.7809H42.8057L42.9442 36.8218L42.8818 36.7731L42.9189 36.7206L42.8545 36.5492L42.9715 36.4032L42.9189 36.3311V36.3214L43.0047 36.2864L42.9306 36.1676L42.9403 36.1481L42.9754 36.0177H42.8369L42.7393 35.9729C42.593 35.9846 42.5168 35.9086 42.2358 35.8833V35.8638C42.8213 35.8638 43.114 35.6691 43.114 35.4939C43.114 34.8397 41.4982 35.2408 41.4982 34.8474L41.5548 34.8611ZM39.6247 37.4566L39.5486 37.3222L39.7633 37.404L39.6247 37.4566ZM39.5428 37.5247L39.5271 37.5812L39.4823 37.5247L39.4706 37.5851H39.3691L39.3847 37.6688L39.373 37.7545L39.2461 37.8168L39.213 37.6824L39.2715 37.6123L39.3398 37.5715L39.2754 37.4819L39.3164 37.4371H39.2461L39.2793 37.3923H39.3359L39.5076 37.4741L39.5428 37.5247ZM39.4179 37.2482L39.2793 37.293L39.2305 37.1431L39.4179 37.2482ZM43.0613 37.3008C42.5617 36.9114 42.1422 37.3144 41.5996 37.1996C41.9138 37.1996 42.0231 37.1061 42.0446 37.0243C41.7948 37.184 41.3303 36.9445 41.0415 37.1236L41.0005 37.1587C40.6102 37.147 40.2921 37.147 40.2921 37.4079C40.2921 37.9511 41.7636 37.6338 42.2222 37.6338C42.6808 37.6338 42.7803 37.6785 42.7803 37.7642C42.7803 37.8947 42.3256 37.9278 42.068 37.9278C41.666 37.9278 40.4639 37.7194 39.7262 37.8655L39.8433 37.5091L39.9565 37.3709L39.8238 37.3105L39.7906 37.2073L39.7496 37.1178L39.5915 37.0087L39.4276 36.9601L39.3261 36.9756L39.2364 37.0165L39.1056 36.9601L39.09 37.1548L38.8949 37.3105L38.9554 37.3787L38.8168 37.5948L38.9027 37.6747L38.891 37.883L38.7758 37.8421L38.6782 37.8051L38.4382 37.6104L38.3406 37.3865L38.3933 37.11L38.3738 37.0282L38.2314 36.9348L38.284 37.0282L38.2353 37.0827V37.1762V37.1957V37.2404H38.2235L38.1162 37.0691H38.0713V37.0574L37.9133 37.0165L37.9777 37.0457L37.9581 37.1139L38.0752 37.2151L38.1006 37.2327V37.2599H38.0889L37.9055 37.3222V37.3845L37.9211 37.5306L37.9542 37.4527H37.9699L38.0069 37.478L38.0772 37.4566H38.1045L38.1416 37.4819V37.5091L38.1748 37.6844L38.1904 37.7097L37.9952 37.6805L38.2235 37.9044H38.2392L38.2879 37.9609L38.3211 37.9278V37.9453L38.3933 38.0427L38.4148 37.9804L38.6334 38.1751L38.8753 38.2549L38.9397 38.4866L38.5494 38.5041L38.1182 38.5431L38.0655 38.4185L37.9835 38.3522H37.9211L37.7513 38.3367L37.8489 38.4009L37.8196 38.4496L37.9757 38.5917V38.6171L37.8859 38.6054L37.7357 38.5314L37.6869 38.5567H37.6693L37.5405 38.7241L37.6244 38.6502L37.642 38.7027L37.8606 38.7319L37.8781 38.7436L37.8079 38.9383L37.8489 38.9753V38.987L37.9913 39.1467L37.9347 39.0045L37.9835 39.0162L38.0733 38.8585L38.0967 38.8702L38.2157 38.9928L38.3406 38.8546H38.3504L38.3953 38.9578L38.4675 38.8916L38.4265 39.0552L38.5807 38.8955L38.6138 38.9442H38.6256H38.8207L38.8324 38.9559L38.8441 39.0532L38.8773 39.0006L38.9339 39.1564C38.9534 38.9111 39.0881 39.0084 39.2442 38.9111L39.2559 38.9208L39.1895 38.9967L39.6579 38.6755L39.8218 38.6599C40.3019 38.7047 39.9682 38.2335 40.741 38.3639L40.9361 38.2783L40.9849 38.6112L41.1684 38.6852V38.7047L41.0142 38.7378L40.6727 38.5625L40.6239 38.5995L40.4756 38.7495L40.5946 38.6852V38.7241L40.659 38.7826L40.7254 38.7572L40.7449 38.7865L40.5653 38.9247L40.6024 38.9812L40.7371 39.0571L40.6922 38.9967H40.7332L40.7566 38.9695L40.7663 38.9597L40.7859 38.9773L40.7703 39.0143L40.7898 39.0746L40.9732 39.1389L40.8795 39.0941L40.9244 39.0785L40.9439 39.0084L40.9615 38.9928H41.0103L41.0376 39.0045L41.1762 39.061L41.2874 38.8994H41.3596L41.6074 38.876L41.586 38.5528L41.5313 38.3698L41.8787 38.4516C42.0296 38.4709 42.1823 38.4327 42.3061 38.3445L42.6066 38.3172L42.6515 38.3776L42.6398 38.5723H42.4446L42.3666 38.6034L42.2319 38.7456L42.351 38.6852V38.7183L42.5129 38.7748L42.5344 38.7865L42.4642 38.9403L42.5129 38.9656L42.5949 39.0824V38.9734H42.6359L42.7296 38.8351L42.7588 38.9909L42.8037 39.0065L42.9579 39.0513L42.8876 38.9948L42.9286 38.9364L42.8525 38.7417L42.9813 38.5878L42.9286 38.5022L43.0223 38.4574L42.9403 38.3269L42.9501 38.3075L42.995 38.1653H42.8349L42.7296 38.1128C42.5289 38.1122 42.3286 38.0959 42.1304 38.0641C42.4934 38.0641 43.0223 37.9745 43.0223 37.772C43.0223 37.6007 42.8388 37.4955 42.2905 37.4955C41.7421 37.4955 40.5029 37.6902 40.5029 37.3943C40.5029 37.2385 40.7429 37.2521 41.0357 37.2677L41.1527 37.332C41.8611 37.5364 42.6964 37.1665 43.1199 37.2872L43.0613 37.3008ZM38.5963 39.9606L38.6529 39.8963L38.7231 39.8515L38.6607 39.7659L38.7017 39.7133H38.6392L38.6704 39.6685H38.729L38.8988 39.7503L38.9358 39.7951L38.9241 39.8515L38.8792 39.7951L38.8675 39.8593H38.7641L38.7817 39.9528L38.7641 40.0384L38.6392 40.1105L38.5963 39.9606ZM38.9339 39.5867L39.1466 39.6724L39.012 39.7289L38.9339 39.5867ZM38.8051 39.5225L38.6665 39.5634L38.6119 39.4173L38.8051 39.5225ZM36.9922 40.7822L36.8614 40.9439L36.9473 40.8718L36.9687 40.9205L37.1873 40.9516V40.9653L37.1268 41.16L37.1639 41.1872V41.2009L37.3063 41.3625L37.2537 41.2164L37.2985 41.232L37.3922 41.0743L37.4117 41.086L37.5347 41.2048L37.6635 41.084L37.7123 41.1814L37.7825 41.1113L37.7415 41.2788L37.8957 41.121L37.9328 41.1697H38.1279L38.1416 41.1833V41.2807L38.1865 41.232L38.2353 41.3781C38.2548 41.1386 38.5436 41.2632 38.6997 41.1619H38.7114L38.6451 41.2398L38.8168 41.1833L39.0861 41.0003L39.1759 40.9789L39.1583 41.012L39.3671 40.8815C40.2629 40.9964 39.7574 40.4921 40.8073 40.5973L40.9225 40.5369L40.9752 40.8251L41.1586 40.903V40.9185L41.0064 40.9555L40.6649 40.7842L40.62 40.8134L40.4736 40.9672L40.5829 40.9069V40.9439L40.6493 40.9964L40.7176 40.9789L40.739 40.9964L40.5634 41.1425L40.5966 41.1989L40.7293 41.2768L40.6805 41.2106H40.7254L40.7468 41.1833H40.7585L40.7781 41.1989L40.7624 41.2359L40.7781 41.2963L40.9732 41.3664L40.8795 41.3119L40.9244 41.2963L40.9459 41.2281L40.9615 41.2145H41.0064L41.0396 41.2281L41.1781 41.2846L41.2874 41.121H41.3577L41.6133 41.0977L41.5196 40.829L41.4708 40.6459L41.8124 40.7316C41.9629 40.7495 42.1148 40.7121 42.2397 40.6265L42.55 40.5973L42.5949 40.6576L42.5793 40.8523H42.3744L42.2983 40.8854L42.1636 41.0276L42.2768 40.9692V40.9984L42.4407 41.0509L42.4603 41.0665L42.3919 41.2223L42.4368 41.2457L42.5168 41.3644V41.2573H42.5656L42.6515 41.1113L42.6691 41.121L42.6925 41.2788L42.7335 41.2904L42.8915 41.3313L42.8271 41.2788L42.8642 41.2223L42.7862 41.0276L42.9208 40.8679L42.8642 40.7881V40.7783L42.9618 40.7336L42.8759 40.6051V40.5797L42.9169 40.4376H42.7666L42.6613 40.3889C42.4591 40.3926 42.2571 40.3763 42.0582 40.3402C42.3744 40.3169 42.954 40.2507 42.954 40.0482C42.954 39.8768 42.7588 39.7717 42.2163 39.7717C41.6738 39.7717 39.9721 39.9664 39.9721 39.6704C39.9721 39.4757 40.5575 39.5478 40.9674 39.5614L41.0883 39.6373C41.7967 39.8321 42.5383 39.3647 43.0398 39.5361C42.6359 39.1739 42.1148 39.577 41.5821 39.4621C41.8904 39.4621 42.2202 39.4017 42.2417 39.3122C41.9977 39.4718 41.3089 39.2031 41.0239 39.3862L40.9752 39.4271C40.4541 39.4271 39.814 39.3531 39.814 39.6704C39.814 40.2137 41.7401 39.8905 42.2007 39.8905C42.6613 39.8905 42.7627 39.9391 42.7627 40.0268C42.7627 40.1572 42.3022 40.1903 42.0426 40.1903C41.6133 40.1903 39.814 39.9508 39.0978 40.1689L39.2325 39.7795L39.3496 39.6412L39.2169 39.577L39.1837 39.4796L39.1427 39.3862L38.9846 39.2752L38.8168 39.2343L38.7192 39.2479L38.6256 39.2888L38.4987 39.2343L38.4792 39.429L38.284 39.5789L38.3406 39.6471L38.206 39.8632L38.2626 39.9314L38.2431 40.0988L38.1865 40.0735H38.1006L38.0108 40.0618L37.7103 39.8262L37.5991 39.5984L37.6361 39.3297L37.6127 39.2499L37.4644 39.1525L37.523 39.2499L37.482 39.2985V39.3959V39.4115V39.4563H37.4703L37.3551 39.2908L37.3141 39.281V39.2693L37.1522 39.2284L37.2166 39.2577L37.1971 39.3297L37.3259 39.4329H37.3473L37.359 39.464H37.3473L37.1639 39.5244V39.5692L37.1893 39.7191L37.2127 39.6471L37.2341 39.6335L37.2693 39.6665L37.3395 39.6412H37.3727L37.4039 39.6665V39.686L37.4449 39.8652L37.4625 39.8944L37.2732 39.8768L37.5093 40.1008H37.5308L37.5796 40.1572L37.6147 40.1241L37.6244 40.1416L37.6966 40.239L37.7181 40.1786C37.8234 40.3062 37.9463 40.4183 38.083 40.5116L38.2099 40.4454L38.2548 40.498L38.3075 40.7258L37.8508 40.7511L37.4234 40.792L37.3707 40.6693L37.2907 40.6051H37.2283L37.0585 40.5836L37.1561 40.644L37.1268 40.6985L37.281 40.8407V40.864H37.1912L37.0448 40.7861L36.9941 40.8115L36.9922 40.7822ZM41.4221 31.8976L41.4747 31.6776L41.4338 31.4828L41.1527 31.1655L40.7293 31.1538L40.3956 31.4595L40.38 31.8859C40.4025 31.9591 40.4409 32.0264 40.4924 32.0831C40.5439 32.1398 40.6073 32.1845 40.678 32.2141C40.7488 32.2436 40.8252 32.2573 40.9019 32.254C40.9785 32.2508 41.0535 32.2308 41.1215 32.1955L41.4221 31.8976ZM36.1979 36.5044L36.2584 36.2474L35.991 35.7937C35.9306 35.7598 35.8637 35.7388 35.7946 35.732C35.7256 35.7253 35.6559 35.733 35.59 35.7546C35.5241 35.7762 35.4634 35.8113 35.4118 35.8576C35.3603 35.9039 35.3189 35.9604 35.2904 36.0235L35.2417 36.4305L35.4973 36.7264L35.8876 36.7712L36.1979 36.5044ZM49.5325 29.9018C49.5325 30.2912 49.2846 30.6164 48.7148 30.9493C47.7391 30.3009 46.0393 29.5864 43.5843 29.5864C41.1293 29.5864 39.4393 30.3107 38.4538 30.9493C37.884 30.6164 37.6361 30.2912 37.6361 29.9018C37.6361 28.5077 41.5821 28.3869 43.5843 28.3869C45.5846 28.3869 49.5286 28.5077 49.5286 29.9018H49.5325ZM38.3114 32.4447L37.8313 32.9062L38.9515 34.1114L38.4441 34.571L37.3239 33.3696L36.8477 33.8116L36.395 33.3287L37.8664 31.9832L38.3114 32.4447ZM36.1023 33.685L37.9152 35.0986L37.4937 35.6321L35.6768 34.2146L36.1023 33.685ZM35.427 35.1123C35.7249 35.0265 36.0445 35.0599 36.318 35.2053C36.5916 35.3507 36.7977 35.5967 36.8926 35.8911L36.9453 36.2279L36.7833 36.8374C36.7118 36.9824 36.6117 37.1114 36.489 37.2168C36.3662 37.3222 36.2234 37.4018 36.0691 37.4507C35.7721 37.54 35.4518 37.5092 35.1773 37.3651C34.9034 37.2223 34.6972 36.9774 34.6035 36.6836C34.5566 36.5274 34.5419 36.3634 34.5604 36.2014C34.5788 36.0394 34.63 35.8828 34.7108 35.7412C34.7834 35.5957 34.884 35.466 35.0069 35.3594C35.1298 35.2528 35.2726 35.1715 35.427 35.12V35.1123ZM41.9821 32.3396C42.1614 32.3566 42.3422 32.3474 42.5188 32.3123L42.2183 32.9665C41.8153 33.0407 41.4008 33.0254 41.0044 32.9218C40.7316 32.9583 40.4545 32.9011 40.2186 32.7595C39.9827 32.6179 39.8022 32.4005 39.7067 32.1429C39.6464 31.9968 39.6174 31.8398 39.6214 31.6819C39.6254 31.524 39.6625 31.3686 39.7301 31.2258C39.89 30.9044 40.1705 30.6588 40.5107 30.5424C40.6637 30.4827 40.8272 30.4543 40.9914 30.4589C41.1556 30.4636 41.3172 30.5012 41.4666 30.5696C41.6159 30.6379 41.7499 30.7355 41.8606 30.8566C41.9713 30.9777 42.0565 31.1199 42.1109 31.2745L42.1831 31.6795C42.182 31.9153 42.1144 32.1461 41.988 32.3454L41.9821 32.3396ZM36.6819 38.5509C37.0465 37.5282 37.5933 36.5797 38.2958 35.7509C38.9552 34.9691 39.7681 34.3303 40.6844 33.8739C41.5498 33.445 42.4992 33.2116 43.4653 33.1905V41.7831H36.0847C36.0965 40.6805 36.2944 39.5878 36.6702 38.5509H36.6819ZM42.5247 31.7165V30.2834L43.233 30.2659V31.6444L43.2974 31.8995L43.5785 32.0008L43.8927 31.8956L43.9531 31.6075V30.2445H44.6615V31.662C44.6709 31.9185 44.5783 32.1683 44.4039 32.3571C44.296 32.4605 44.1684 32.5412 44.0286 32.5943C43.8888 32.6475 43.7397 32.6721 43.5902 32.6667C43.0769 32.6667 42.5481 32.3824 42.5325 31.6931L42.5247 31.7165ZM45.5905 32.8614L44.8977 32.7231L45.3738 30.3107L46.0666 30.4489L45.5905 32.8614ZM43.8927 33.1671C44.7987 33.2108 45.6858 33.4416 46.4979 33.8447C47.4126 34.3027 48.2246 34.9413 48.8846 35.7217C49.5898 36.5489 50.1374 37.4979 50.5004 38.5216C50.8743 39.5591 51.0722 40.6515 51.0859 41.7539H43.8907L43.8927 33.1671ZM50.1823 36.4246L49.7179 35.7899L49.954 35.3595L49.4896 34.7754L49.0836 34.9078L48.5177 34.3724L51.1639 33.6052L51.4567 33.9712L50.1823 36.4246ZM49.9345 32.361L48.4806 34.3198L47.8952 33.9128L48.6387 32.951L47.9225 33.134L47.8093 32.3824L47.1282 33.356L46.5018 33.023L47.903 31.0116L48.3792 31.2628L48.5333 32.2714L49.5091 32.0319L49.9345 32.361ZM51.2849 44.9783L53.5194 45.8759L53.3242 46.3666L51.8255 46.8825L52.9339 47.3304L52.6724 47.9671L50.4458 47.0656L50.6409 46.5574L52.1143 46.0511L51.0234 45.6111L51.2849 44.9783ZM49.872 47.8503C50.0397 47.6275 50.2731 47.4627 50.5395 47.3791L51.2069 47.8288L51.0976 47.8542C50.8523 47.9083 50.6268 48.0289 50.4458 48.2027L50.4048 48.2962L50.4165 48.3137L50.7873 48.2124C51.0566 48.0898 51.3942 47.9359 51.7279 48.1637L52.0421 48.6174L52.0538 48.7557L51.886 49.2444L51.324 49.6513L50.6468 49.2016C51.3552 48.9815 51.4001 48.7829 51.363 48.7459L51.082 48.8472C50.8302 48.9776 50.4516 49.1646 50.0574 48.8959L49.7393 48.4247L49.872 47.8503ZM49.3061 48.6427L51.0195 50.325L49.9364 51.4213L49.4525 50.9501L50.0379 50.3523L49.913 50.2257L49.3412 50.8099L48.8612 50.3387L49.4271 49.7545L49.2846 49.6124L48.666 50.2063L48.182 49.7351L49.3061 48.6427ZM53.695 45.2178L53.0315 45.0912L53.1818 44.2754L53.0062 44.2423L52.8598 45.0347L52.1963 44.916L52.3426 44.1196L52.1475 44.0845L51.9933 44.9335L51.324 44.8147L51.605 43.2707L53.9721 43.7029L53.695 45.2178ZM54.0736 42.3458C54.0759 42.4602 54.0555 42.574 54.0137 42.6806C53.9718 42.7872 53.9093 42.8845 53.8297 42.9669C53.7543 43.0347 53.6661 43.0868 53.5702 43.1202C53.4744 43.1537 53.3729 43.1677 53.2716 43.1616C53.1744 43.1623 53.0782 43.1433 52.9886 43.1059C52.8991 43.0684 52.8181 43.0132 52.7505 42.9435C52.5934 42.7672 52.5115 42.5367 52.5222 42.301V42.1783L51.6674 42.1666L51.6791 41.4637L54.0853 41.5085L54.0736 42.3458ZM49.6184 24.8451C49.5085 25.3998 49.3268 25.9378 49.0778 26.4457C49.5013 26.251 49.8584 26.1536 50.278 26.3366C50.0645 26.6123 49.7736 26.8182 49.4424 26.9281C49.1111 27.0381 48.7546 27.047 48.4182 26.9539C47.8874 26.8312 47.3624 26.5644 47.3878 26.1458C47.3874 26.078 47.401 26.0108 47.4275 25.9484C47.4541 25.886 47.4931 25.8296 47.5423 25.7828C47.5914 25.736 47.6496 25.6996 47.7133 25.676C47.777 25.6524 47.8449 25.642 47.9127 25.6454C48.2308 25.6785 48.2504 26.1653 48.1528 26.3814C48.5762 26.1458 49.0153 24.9055 48.3479 24.7244C47.8269 24.5803 47.3507 25.2891 47.177 25.8401C47.0736 25.1781 46.7965 24.5453 46.2754 24.5862C45.5963 24.631 45.8168 25.8849 46.053 26.2062C46.092 25.7642 46.334 25.5325 46.533 25.5441C46.7321 25.5558 46.9604 25.6863 46.9233 26.0835C46.8862 26.4807 46.3086 26.7338 45.649 26.7338C45.0265 26.7338 43.9258 26.5391 43.8204 25.3378C44.2322 25.4098 44.8625 25.7155 45.1397 26.1166C45.0538 25.4508 45.0538 24.7768 45.1397 24.1111C44.8225 24.5264 44.3582 24.805 43.8419 24.8899C44.0136 24.3101 44.3993 23.8168 44.9211 23.5094H42.228C42.7452 23.8307 43.1901 24.3739 43.3033 24.886C42.7946 24.7978 42.3389 24.5192 42.029 24.1072C42.1109 24.7732 42.1109 25.4467 42.029 26.1127C42.2944 25.7116 42.9169 25.4059 43.3248 25.3339C43.2174 26.5313 42.1226 26.726 41.4962 26.726C40.8366 26.726 40.2668 26.4788 40.2219 26.0757C40.177 25.6727 40.417 25.548 40.6122 25.5364C40.8073 25.5247 41.0552 25.7564 41.0962 26.1984C41.3323 25.8771 41.5567 24.6232 40.8756 24.5784C40.3507 24.5375 40.0736 25.1625 39.976 25.8323C39.8023 25.2813 39.3261 24.5725 38.8051 24.7166C38.1455 24.8977 38.5865 26.138 39.01 26.3736C38.9085 26.1575 38.928 25.6707 39.25 25.6376C39.3178 25.6339 39.3856 25.6441 39.4492 25.6676C39.5129 25.6912 39.5709 25.7276 39.6198 25.7746C39.6687 25.8215 39.7074 25.878 39.7334 25.9406C39.7594 26.0031 39.7723 26.0703 39.7711 26.138C39.7945 26.5489 39.2695 26.8234 38.7446 26.9461C38.4086 27.0397 38.0523 27.0313 37.7211 26.9221C37.3898 26.8129 37.0987 26.6077 36.8848 26.3327C37.3239 26.138 37.6654 26.2354 38.1065 26.4379C37.8539 25.9309 37.6702 25.3927 37.56 24.8373C37.4311 25.304 37.1299 25.7047 36.717 25.9589C36.6077 25.3814 36.7229 24.7841 37.039 24.2883L35.5558 24.9113C36.2642 25.6902 37.0917 27.4659 37.5522 28.9458C37.4117 29.0659 37.2994 29.2153 37.2232 29.3836C37.1469 29.5518 37.1087 29.7347 37.1112 29.9193C37.1112 30.6027 37.5522 31.0116 37.9952 31.292C37.1681 31.8338 36.4167 32.4826 35.7608 33.2216C34.7354 34.3736 33.9316 35.7043 33.3897 37.147L33.3136 37.3631L33.8015 37.883L33.8229 37.8168L34.2815 37.2969L35.027 37.589C34.7187 37.809 34.3479 38.1089 34.424 38.1867L34.6894 38.029C34.9138 37.8577 35.2397 37.5851 35.6827 37.7603L36.0984 38.1497V38.7339C35.9801 38.9874 35.7884 39.1997 35.548 39.3433L34.8728 39.0746C35.1048 38.9318 35.3042 38.7421 35.4583 38.5178V38.4009L35.1207 38.5801L34.6113 38.8604C34.9255 39.3063 35.1421 39.7289 35.1499 40.0696C35.136 40.5814 35.3246 41.078 35.6749 41.4521C36.2076 42.1258 35.6593 42.0732 36.1276 42.9104C36.1062 42.6709 36.0945 42.4353 36.0906 42.1959H43.4633V50.216C43.2994 50.201 43.1342 50.2245 42.981 50.2847C42.8278 50.3449 42.6909 50.4401 42.5812 50.5626C43.436 50.9072 44.2908 51.211 45.1182 51.468C45.1551 51.057 45.3218 50.6684 45.5944 50.3581C45.5944 50.3581 44.4879 50.2491 43.9063 50.2199V42.2056H51.1034C51.0838 43.296 50.8861 44.3759 50.518 45.4027C50.1554 46.4261 49.6077 47.3745 48.9021 48.2007C48.2381 48.977 47.427 49.6148 46.5155 50.0778C46.3067 50.1829 46.1525 50.5217 46.0139 50.8177C45.8994 51.0688 45.8244 51.3361 45.7915 51.6101C46.1291 51.7114 46.1974 51.7795 46.5155 51.8574C49.0524 52.4922 49.7081 52.3656 49.8506 52.2566C50.4258 51.8109 50.9571 51.3115 51.4371 50.7651C52.4663 49.6057 53.2704 48.2653 53.8082 46.8125C54.3846 45.2656 54.678 43.6281 54.6747 41.9778C54.6747 41.6682 54.663 41.3644 54.6435 41.0626C54.3541 40.8518 54.1182 40.5765 53.9546 40.2585C53.6931 40.1689 52.9788 39.9216 52.6842 39.8126L52.5163 39.7503L51.5191 40.019L51.3376 39.3414L52.327 39.0727L52.4148 38.9597L52.9496 38.2841C52.7017 37.8304 52.4695 37.4196 52.3095 37.1509C52.174 36.9461 52.0965 36.7086 52.085 36.4636L51.1737 36.9348L51.5738 37.737L50.9629 38.0368L50.2545 36.6057L52.4012 35.5543L52.5007 35.7373L52.6627 35.4978L52.8578 35.2291C52.4446 34.5136 51.9573 33.8434 51.404 33.2294C50.7509 32.4882 50.0021 31.8367 49.1773 31.292C49.6164 31.0116 50.0613 30.6027 50.0613 29.9193C50.0622 29.7334 50.0216 29.5497 49.9427 29.3813C49.8637 29.213 49.7483 29.0642 49.6047 28.9458C50.0652 27.4718 50.8907 25.6999 51.5952 24.925L50.114 24.3019C50.4303 24.7948 50.5468 25.3893 50.4399 25.9647C50.0341 25.71 49.7388 25.3125 49.6125 24.851L49.6184 24.8451ZM53.0803 39.2343L53.2306 39.283L53.5116 39.3823L53.2755 38.9422L53.1408 39.1369L53.0803 39.2343ZM51.2927 24.1909C51.2924 24.2943 51.3227 24.3954 51.3801 24.4815C51.4374 24.5677 51.519 24.6348 51.6147 24.6746C51.7103 24.7143 51.8157 24.7248 51.9173 24.7047C52.0189 24.6847 52.1123 24.6349 52.1856 24.5618C52.2588 24.4887 52.3087 24.3956 52.3288 24.2942C52.3489 24.1928 52.3384 24.0877 52.2986 23.9923C52.2587 23.8968 52.1914 23.8153 52.1051 23.7582C52.0188 23.701 51.9174 23.6706 51.8138 23.671C51.7453 23.6708 51.6774 23.684 51.6141 23.7101C51.5508 23.7361 51.4932 23.7744 51.4448 23.8227C51.3963 23.871 51.358 23.9285 51.3319 23.9917C51.3058 24.0548 51.2925 24.1226 51.2927 24.1909ZM50.8244 19.5763C50.8244 19.4725 50.7935 19.3711 50.7356 19.2849C50.6778 19.1986 50.5956 19.1315 50.4994 19.092C50.4033 19.0525 50.2975 19.0423 50.1956 19.0628C50.0936 19.0834 50.0001 19.1336 49.9268 19.2073C49.8536 19.2809 49.8039 19.3746 49.7841 19.4765C49.7643 19.5783 49.7752 19.6838 49.8156 19.7794C49.8559 19.875 49.9238 19.9566 50.0106 20.0137C50.0975 20.0707 50.1993 20.1008 50.3033 20.1C50.4419 20.099 50.5744 20.0434 50.672 19.9452C50.7696 19.8471 50.8244 19.7145 50.8244 19.5763ZM51.8489 20.4739C51.8497 20.3703 51.8196 20.2688 51.7626 20.1822C51.7056 20.0957 51.6241 20.0279 51.5285 19.9876C51.4328 19.9472 51.3274 19.9361 51.2254 19.9555C51.1234 19.975 51.0295 20.0242 50.9555 20.0969C50.8816 20.1696 50.8309 20.2625 50.8099 20.364C50.7889 20.4654 50.7985 20.5708 50.8375 20.6668C50.8765 20.7628 50.9432 20.8451 51.0291 20.9033C51.115 20.9615 51.2162 20.993 51.3201 20.9937C51.4591 20.9943 51.5928 20.9399 51.6918 20.8425C51.7909 20.7451 51.8474 20.6126 51.8489 20.4739ZM52.4207 21.6636C52.4207 21.5951 52.4072 21.5274 52.3809 21.4642C52.3545 21.401 52.316 21.3436 52.2674 21.2953C52.2188 21.247 52.1611 21.2087 52.0977 21.1827C52.0343 21.1567 51.9663 21.1434 51.8977 21.1437C51.7936 21.1433 51.6918 21.1738 51.6051 21.2313C51.5185 21.2888 51.4509 21.3707 51.411 21.4666C51.371 21.5625 51.3606 21.668 51.3809 21.7699C51.4013 21.8717 51.4515 21.9652 51.5253 22.0385C51.599 22.1118 51.6929 22.1616 51.795 22.1815C51.8972 22.2014 52.0029 22.1906 52.0989 22.1504C52.1949 22.1102 52.2767 22.0425 52.334 21.9558C52.3913 21.8691 52.4215 21.7674 52.4207 21.6636ZM52.5983 22.9311C52.598 22.8623 52.5841 22.7941 52.5574 22.7307C52.5306 22.6672 52.4915 22.6096 52.4424 22.5613C52.3932 22.513 52.3349 22.4749 52.2709 22.4491C52.2069 22.4233 52.1384 22.4105 52.0694 22.4112C52.001 22.4112 51.9333 22.4247 51.87 22.4508C51.8068 22.4769 51.7494 22.5152 51.701 22.5635C51.6526 22.6118 51.6142 22.6691 51.588 22.7322C51.5619 22.7952 51.5484 22.8629 51.5484 22.9311C51.5484 22.9994 51.5619 23.067 51.588 23.1301C51.6142 23.1931 51.6526 23.2505 51.701 23.2987C51.7494 23.347 51.8068 23.3853 51.87 23.4114C51.9333 23.4376 52.001 23.451 52.0694 23.451C52.1384 23.4515 52.2067 23.4385 52.2706 23.4126C52.3345 23.3868 52.3927 23.3486 52.4418 23.3004C52.4909 23.2521 52.53 23.1946 52.5568 23.1313C52.5837 23.0679 52.5978 22.9999 52.5983 22.9311ZM67.9898 44.5168C67.7263 44.8906 67.2697 45.025 66.973 44.8167C66.6764 44.6083 66.6588 44.1352 66.9242 43.7652C67.1896 43.3953 67.6443 43.257 67.9371 43.4634C68.2298 43.6698 68.2591 44.1469 67.9898 44.5168ZM67.4648 40.0384L67.6209 39.6743L67.9995 39.5478C68.2522 39.5683 68.4883 39.6812 68.6627 39.8649C68.837 40.0485 68.9372 40.2899 68.944 40.5427L68.7879 40.9127L68.4093 41.0432C68.1563 41.0208 67.9203 40.9066 67.7462 40.7221C67.5721 40.5376 67.472 40.2957 67.4648 40.0423V40.0384ZM66.0773 47.5348C65.8119 47.9087 65.3552 48.043 65.0625 47.8347C64.7698 47.6263 64.7405 47.1571 65.0059 46.7793C65.2713 46.4016 65.7221 46.2712 66.0207 46.4834C66.3193 46.6956 66.3407 47.161 66.0773 47.5348ZM59.4559 31.0564V31.0214C59.6842 30.3263 60.1116 28.9438 60.1116 28.9282L60.1291 28.8796L61.0366 29.2281L60.9136 29.2729C60.6871 29.386 60.4803 29.5345 60.3009 29.7129L60.8473 29.6389L60.98 29.5494L60.5897 30.5229L60.5409 30.4333L60.1369 30.0439L60.1135 30.2386C60.1135 30.6008 60.3692 30.7663 60.615 30.8929C61.0541 31.1168 61.3137 31.1401 61.421 30.9746L61.4483 30.8598L61.3722 30.6651L60.9449 30.593L60.8863 30.6164V30.5521C60.8717 30.464 60.8762 30.3737 60.8994 30.2874C60.9226 30.2011 60.9641 30.1207 61.021 30.0517L61.3664 29.9018L61.745 30.1452C61.7556 29.8945 61.8453 29.6536 62.0012 29.4567C62.1572 29.2599 62.3714 29.1172 62.6134 29.049L62.6583 29.0314L62.6739 29.0762L62.7676 29.5688C62.7565 29.9044 62.6168 30.2229 62.3773 30.4587C62.4667 30.4324 62.5619 30.4325 62.6513 30.4592C62.7406 30.4858 62.8203 30.5377 62.8807 30.6086L62.951 30.9863C62.9254 31.0713 62.8821 31.15 62.824 31.2171C62.7658 31.2842 62.694 31.3383 62.6134 31.3757L62.5509 31.4088L62.5392 31.3426L62.2504 31.0428L61.9538 31.181C61.8425 31.3913 62.0026 31.6152 62.4182 31.8469C62.4987 31.9033 62.5901 31.9421 62.6866 31.961C62.783 31.9799 62.8824 31.9784 62.9782 31.9565C63.074 31.9347 63.1642 31.893 63.2429 31.8342C63.3216 31.7754 63.387 31.7008 63.435 31.6152C63.2284 31.5904 63.02 31.6424 62.8495 31.7613L62.6895 31.8586L63.3374 30.6612L63.3628 30.7994L63.6028 31.2531L63.6789 30.8189L63.6106 30.4742L63.5403 30.3321L64.8693 31.0954L64.7132 31.1109C64.4487 31.153 64.2093 31.2918 64.0419 31.5004C64.2143 31.5425 64.3954 31.5337 64.5629 31.475L64.6937 31.4264L63.9736 32.5849V32.4019V32.361C63.9801 32.1693 63.9224 31.9809 63.8097 31.8255L63.716 32.215C63.7191 32.3429 63.7571 32.4676 63.8258 32.5757C63.8946 32.6837 63.9915 32.7711 64.1063 32.8283C64.5161 33.0717 64.7932 33.0931 64.9201 32.8925L64.8908 32.5693L64.4849 32.4661L64.4244 32.4876V32.4213C64.4154 32.3347 64.4251 32.2472 64.4527 32.1647C64.4803 32.0821 64.5252 32.0063 64.5844 31.9424L64.9454 31.808L65.3357 32.1702C65.5153 31.6016 65.8236 31.3251 66.3778 31.22L66.4227 31.2083L66.4344 31.2511L66.4715 31.549C66.4689 31.7482 66.4169 31.9437 66.3202 32.118C66.2235 32.2923 66.0851 32.44 65.9173 32.5479L66.3076 32.7543L66.3759 32.9957L66.3505 33.1281C66.3202 33.211 66.2722 33.2863 66.2099 33.3488C66.1475 33.4113 66.0723 33.4596 65.9895 33.4903L65.929 33.5195L65.9192 33.4533L65.6421 33.1243L65.3533 33.2352C65.2557 33.4124 65.4157 33.6247 65.8216 33.8895C66.0988 34.0667 66.4169 34.2185 66.7974 33.8895L66.2549 33.7298H66.1553L66.8072 32.9062V33.0639V33.0931L67.0179 33.5721C67.0644 33.3806 67.0905 33.1849 67.096 32.988L67.0804 32.8147L67.0628 32.6881L67.8219 33.2937L67.7888 33.3306C67.777 33.3423 66.7818 34.4016 66.2939 34.9429L66.2705 34.9721L59.4559 31.0564ZM62.8163 23.9806C62.1175 24.0192 61.4352 24.2078 60.8161 24.5336C61.0444 24.1072 60.8161 23.4491 61.6103 23.4491C62.0006 23.4491 62.348 23.8385 62.8163 23.9865V23.9806ZM56.5364 33.2956C56.5289 33.5123 56.4372 33.7176 56.2808 33.8681L55.9744 33.9868C55.7012 33.9693 55.4904 33.6617 55.4904 33.2956V33.2391C55.4921 33.1333 55.515 33.0289 55.5575 32.932C55.6 32.835 55.6615 32.7475 55.7383 32.6745L56.0524 32.5518L56.353 32.7056C56.4855 32.8704 56.551 33.079 56.5364 33.2898V33.2956ZM70.3764 53.3625C70.4416 53.1187 70.5938 52.907 70.8044 52.7672C71.0149 52.6273 71.2694 52.569 71.52 52.6032L71.8674 52.8232L71.9318 53.2126C71.8665 53.458 71.7112 53.67 71.4966 53.8065C71.1063 54.0615 70.6243 54.0382 70.4408 53.7539L70.3764 53.3625ZM76.3793 39.7211C76.9081 37.6532 73.4149 38.2899 73.2881 35.5036C73.813 36.9445 74.8629 37.4663 75.665 37.0925C73.8735 36.8978 75.3274 33.833 73.0188 33.833L72.648 33.8739C72.2577 33.4631 71.8049 33.2898 71.1453 33.2898C70.1696 33.2898 68.4913 34.2283 68.4913 36.1656C68.4972 40.3286 73.3564 40.6946 73.3564 44.3941C73.3644 44.6244 73.3252 44.854 73.2413 45.0686C73.1573 45.2833 73.0304 45.4787 72.8682 45.6427C72.7059 45.8067 72.5119 45.936 72.2979 46.0227C72.0838 46.1093 71.8544 46.1514 71.6235 46.1465C70.8077 46.1465 70.1481 45.2294 69.4612 43.7983C69.1314 43.1168 68.4269 42.1822 67.6736 41.2106C67.8846 41.365 68.1363 41.4544 68.3976 41.4676C68.5211 41.4726 68.6443 41.4531 68.7602 41.4103C68.8761 41.3675 68.9823 41.3023 69.0728 41.2184C69.1616 41.1337 69.2324 41.0323 69.2814 40.9199C69.3303 40.8076 69.3563 40.6866 69.3578 40.5642V40.5252C69.345 40.1689 69.2003 39.8299 68.9516 39.5738C68.7029 39.3177 68.3678 39.1628 68.0112 39.1389C67.763 39.1296 67.521 39.2169 67.336 39.3823C67.2474 39.4671 67.1764 39.5686 67.1272 39.6808C67.078 39.7931 67.0514 39.914 67.0491 40.0365V40.0735L67.1272 40.4999C66.0812 39.1369 65.1074 37.8032 65.1074 37.0711C65.1074 36.4207 65.5523 35.8561 66.1085 35.1707L66.3037 35.2797L66.452 35.1161C66.6471 34.9059 67.053 34.458 67.8961 33.5585L67.941 33.5059L68.1459 33.2956L67.619 32.877C67.7646 32.5447 67.8821 32.2008 67.9702 31.8489C68.1322 32.5187 68.4796 32.9451 68.9558 32.8127C68.6416 32.1215 69.2778 31.1908 68.8582 29.5026C69.2485 30.1569 69.8339 30.5054 70.2418 30.3886C69.1626 29.4325 70.5599 28.1046 69.1587 26.0484C69.6193 26.2042 69.9198 26.1108 70.1247 25.8868C68.8406 25.7077 69.428 24.078 67.1799 23.4977C67.7419 23.4004 68.0678 23.0713 67.982 22.7831C67.3867 23.2096 66.8657 21.9829 64.9201 22.0199C64.803 21.2917 64.1258 20.5284 63.3589 20.1584C63.4649 20.6578 63.418 21.1775 63.2242 21.6499L56.8701 15.4289L56.5325 15.277L56.6067 15.5827L62.0572 22.3918C61.6513 22.53 61.2473 22.6994 60.8239 22.8552C60.6816 22.9099 60.5598 23.0072 60.4752 23.1337C60.3906 23.2603 60.3475 23.4099 60.3516 23.562C59.5117 23.9708 58.7252 24.4808 58.0098 25.0807C57.6761 25.3864 57.4068 25.4585 57.7054 26.1458C57.8146 26.4009 57.4653 27.0434 58.2537 26.5722C58.7709 26.2626 59.9476 25.622 60.1233 26.0231C60.213 26.2393 59.6315 26.5099 59.2353 26.6618C58.8392 26.8137 58.4059 27.1194 58.4703 27.2751L58.8606 27.4251L59.1709 27.7658L59.6627 27.5419L59.4676 28.5836C59.7421 28.5399 59.9935 28.4043 60.1804 28.199C60.3673 27.9937 60.4786 27.7311 60.496 27.4543C60.5136 26.9986 60.6385 26.8896 60.736 26.8234C60.8336 26.7572 60.9449 27.3121 60.8141 27.6451C61.1439 27.5711 61.4815 27.1447 61.4366 26.3522L61.8933 26.1302C62.1001 26.1302 62.508 26.6988 63.0974 26.6988C64.1726 26.6988 64.7717 25.8245 64.8361 25.4176C64.8726 25.2655 64.878 25.1078 64.8522 24.9536C64.8264 24.7994 64.7698 24.6519 64.6859 24.52C64.8511 24.6658 64.9824 24.8459 65.0704 25.0478C65.1583 25.2496 65.201 25.4682 65.1952 25.6882C65.1952 27.207 62.4963 27.9235 61.3839 28.975L61.261 29.0879L59.9964 28.6011L59.9106 28.8776L59.8364 29.1171C59.7057 29.5474 59.4246 30.4548 59.2509 30.9707L59.1846 31.181L59.2997 31.2453C58.5504 32.2364 57.9337 33.354 57.8049 34.5009C57.5148 34.2033 57.2079 33.9225 56.8857 33.6597L56.9501 33.3092C56.9725 32.9866 56.869 32.6677 56.6613 32.4194C56.5889 32.3337 56.4998 32.2636 56.3993 32.2134C56.2988 32.1632 56.1891 32.1341 56.0769 32.1277C55.9647 32.1213 55.8524 32.1379 55.7469 32.1763C55.6413 32.2147 55.5448 32.2743 55.4631 32.3512L55.346 32.4739L55.2113 32.3668C54.77 32.0491 54.352 31.7003 53.9604 31.3232C53.8942 31.2439 53.8097 31.1819 53.7142 31.1422C53.6188 31.1025 53.5151 31.0865 53.4121 31.0954L52.8461 31.0837C52.651 31.0837 52.5534 31.2297 52.3368 31.4166C52.2138 31.5179 51.8118 31.8314 51.4079 32.1351L51.9699 32.7193L52.1241 32.8984L52.5358 32.5771L53.0042 32.4389C53.1186 32.4531 53.2282 32.4935 53.3243 32.557C53.4205 32.6206 53.5006 32.7054 53.5584 32.8049C53.6716 32.9743 54.702 34.3159 55.549 35.2466L55.2816 35.3479C54.9147 35.5017 54.0951 35.4686 53.7341 35.4374C53.373 35.4063 53.2969 35.3186 53.0491 35.71L52.7115 36.1754C52.5885 36.3234 52.4949 36.4889 52.7525 36.927C53.1271 37.5539 54.0541 39.2187 54.3644 39.9664C54.6747 40.7141 55.0357 40.8368 55.627 41.0763C56.2183 41.3158 57.2272 41.8921 57.3482 42.0264L57.3892 41.454C57.2194 41.2749 56.6496 41.0646 56.4369 40.9906C56.2242 40.9166 56.1637 40.8231 56.4252 40.8231C56.6867 40.8231 57.3892 41.0763 57.8869 41.2749C57.7405 40.7141 57.2019 40.0969 56.876 39.7522C56.4486 39.6296 56.0173 39.6296 55.8417 39.7639L55.6017 40.0326L55.3753 39.7347C55.428 39.5653 55.6836 39.5108 55.627 39.1876C55.5704 38.8643 55.1743 38.8176 54.9147 38.7884C54.5556 38.2685 54.1341 37.5053 53.939 37.1957C53.7438 36.8861 53.8629 36.7128 53.9917 36.6115C54.302 36.3545 54.9498 36.7439 56.2359 36.8257C56.6847 36.851 57.2585 36.8783 57.8361 36.9075C58.0039 38.399 58.6011 39.8165 60.6912 40.3364C61.7118 40.5875 62.7597 41.3274 63.1169 42.3068C58.9563 42.2289 58.3006 43.8509 58.3006 45.3735C58.3006 47.1084 59.7701 47.0111 59.7701 48.3117C59.7701 49.4449 56.2691 49.9123 55.2094 50.0641C54.3137 50.1985 53.8004 50.3932 53.3691 50.8235C52.9379 51.2538 52.5027 51.6647 51.7201 52.4454C51.9394 52.4918 52.1635 52.512 52.3875 52.5058L52.973 51.7425C53.1525 51.4855 53.2696 51.2713 53.3847 51.2908C53.4999 51.3103 53.4238 51.5069 53.2852 51.7795L52.7973 52.5954C54.8542 52.7336 54.9889 51.9742 54.9889 51.6646C54.9889 51.3551 54.4834 51.1409 54.7762 50.9462C55.0689 50.7515 55.3187 50.8858 55.5568 51.1565C55.7948 51.4271 55.8651 51.6647 56.4349 51.4544C56.4349 51.4544 60.9234 49.6007 61.4815 49.3456C61.9928 49.1178 61.8425 48.8939 61.542 48.6466C61.2044 48.3701 61.1517 47.9184 61.1517 47.4569C61.1517 46.1076 61.9655 45.689 63.4233 45.7182C63.3967 45.9334 63.3817 46.1498 63.3784 46.3666C63.3784 48.4714 66.5788 50.5314 67.4414 50.5314C67.8317 50.5314 68.3488 50.2472 68.3781 51.5186C68.4035 52.4493 68.5908 53.1114 68.423 54.1881C68.2552 55.2649 67.9429 55.4304 67.295 55.886C66.6471 56.3416 66.0285 57.7708 65.7514 58.0668C66.0461 58.2615 66.3583 58.2829 66.5944 57.5878C66.7896 57.0153 67.0257 56.6045 67.2755 56.4662C67.0218 57.101 66.8345 58.0239 66.7174 58.3082C67.5312 58.4542 68.864 57.7104 68.864 57.1399C68.864 56.5694 68.4054 56.6142 68.4054 56.2326C68.4276 56.1248 68.4893 56.0291 68.5785 55.9643C68.6676 55.8995 68.7778 55.8701 68.8875 55.8821C69.0145 55.8838 69.1385 55.9213 69.2452 55.9902C69.3518 56.0591 69.4369 56.1566 69.4905 56.2715C69.8495 56.0768 70.0759 55.7185 70.0642 54.8813C70.0642 54.5561 70.0486 54.2115 70.033 53.861L70.1052 53.9992C70.1877 54.1201 70.2974 54.2202 70.4254 54.2915C70.5535 54.3628 70.6964 54.4034 70.8428 54.4101C71.1817 54.4285 71.5164 54.3295 71.7903 54.1296C72.0642 53.9298 72.2604 53.6416 72.3455 53.3139L72.3689 53.1094L72.2187 52.611C72.15 52.5093 72.0616 52.4225 71.9587 52.3556C71.8558 52.2887 71.7405 52.2431 71.6195 52.2215C71.2736 52.1666 70.9194 52.2374 70.6214 52.421C70.3234 52.6047 70.1014 52.8891 69.9959 53.2223C69.9296 52.0794 69.8456 50.9987 69.8769 50.5606C69.9256 49.9181 69.951 49.6299 69.7305 49.5326C69.51 49.4352 69.2738 49.8013 68.9655 49.8013C68.6572 49.8013 67.7107 48.9348 67.7107 48.0255C67.7107 47.1162 68.6962 45.9382 68.6513 44.694C68.6318 44.3046 68.8796 44.1099 69.0416 44.4584C69.2669 44.9893 69.5687 45.4845 69.9374 45.9285C69.6778 47.5017 71.4088 49.0244 72.8334 47.8912C72.1289 47.9963 71.6449 47.3674 71.3307 46.7501L71.721 46.7793H71.9376C72.4333 47.3966 74.0257 47.3479 74.4336 45.8175C74.2727 45.9885 74.0765 46.1226 73.8584 46.2104C73.6404 46.2981 73.4058 46.3375 73.171 46.3257C73.4681 46.0796 73.7044 45.7686 73.8618 45.4168C74.0191 45.065 74.0933 44.6818 74.0784 44.2968C74.0784 40.3208 69.2368 39.8574 69.2368 36.2377C69.2368 34.8961 70.4077 34.0355 71.2332 34.0355C71.5039 34.0297 71.769 34.1139 71.9864 34.275C71.8194 34.4618 71.6929 34.681 71.615 34.9189C71.5371 35.1569 71.5094 35.4083 71.5337 35.6574C71.6605 38.5119 76.3461 38.3737 76.4124 39.7464L76.3793 39.7211ZM58.0352 30.4002L58.3377 30.5638L58.4177 30.8968L58.0801 31.4419C57.762 31.6892 57.3443 31.7009 57.1609 31.4692L57.075 31.2064C57.0838 31.0847 57.1188 30.9663 57.1778 30.8594C57.2367 30.7525 57.3182 30.6597 57.4165 30.5872L58.0352 30.4002ZM58.0879 29.9914C57.7557 29.9552 57.4227 30.051 57.1609 30.2581C56.6594 30.6475 56.5091 31.3076 56.835 31.7262C57.1609 32.1449 57.8322 32.1565 58.3377 31.771C58.6003 31.5694 58.7761 31.2756 58.8294 30.9493C58.8485 30.8372 58.844 30.7224 58.8164 30.6121C58.7887 30.5018 58.7385 30.3983 58.6688 30.3084C58.5992 30.2184 58.5116 30.1437 58.4116 30.0892C58.3116 30.0346 58.2014 30.0013 58.0879 29.9914ZM56.5813 38.7748C56.1578 38.5801 55.9354 38.1575 56.0856 37.8479L56.394 37.587C56.637 37.5239 56.8946 37.549 57.1209 37.6577C57.3471 37.7665 57.5273 37.9519 57.6293 38.1809L57.6195 38.584L57.3151 38.839C57.1947 38.8781 57.0677 38.8926 56.9416 38.8815C56.8155 38.8705 56.693 38.8342 56.5813 38.7748ZM56.3998 39.1486C56.5608 39.2306 56.7365 39.2798 56.9167 39.2935C57.097 39.3072 57.2781 39.2851 57.4497 39.2284C57.5674 39.1913 57.6763 39.1308 57.7699 39.0504C57.8635 38.9701 57.9398 38.8717 57.9942 38.7611C58.0471 38.6501 58.0767 38.5294 58.0811 38.4065C58.0854 38.2836 58.0645 38.1611 58.0196 38.0466C57.8856 37.7121 57.6312 37.4396 57.3063 37.2825C56.9813 37.1255 56.6093 37.0952 56.2632 37.1976C56.0263 37.2765 55.8305 37.446 55.7187 37.6688C55.4709 38.1848 55.7792 38.8371 56.4076 39.1486H56.3998ZM86.9447 85.9786H88.3868V79.8491C88.3868 77.8046 87.0208 76.6714 84.7746 76.6714C83.6626 76.6628 82.5884 77.0739 81.7673 77.8222C81.0707 77.1115 79.9876 76.6714 78.4498 76.6714C77.2489 76.664 76.0573 76.882 74.9371 77.314V85.9786H76.3832V77.9078C77.0556 77.6642 77.7678 77.548 78.483 77.5651C80.0793 77.5651 80.9438 78.2603 80.9438 79.4071V85.9786H82.384V78.5134C82.6705 78.2129 83.0153 77.9738 83.3975 77.8108C83.7797 77.6478 84.1911 77.5642 84.6068 77.5651C86.1133 77.5651 86.9486 78.3615 86.9486 79.8491L86.9447 85.9786ZM96.8056 81.3192C96.8056 83.6323 95.7401 85.2854 93.4314 85.2854C92.8423 85.2917 92.2565 85.1955 91.7005 85.0012V77.9078C92.3289 77.645 93.0059 77.5176 93.6871 77.534C95.7225 77.534 96.8095 79.0527 96.8095 81.3192H96.8056ZM98.2731 81.2841C98.2731 78.4472 96.6065 76.6714 93.9798 76.6714C93.2013 76.6666 92.429 76.81 91.7044 77.0939V72.7188H90.2661V85.5697C91.0975 85.9747 92.282 86.1753 93.4178 86.1753C96.5909 86.1753 98.2731 84.1834 98.2731 81.2802V81.2841ZM103.296 85.3341C101.669 85.3341 100.597 84.7617 100.597 83.4766C100.597 81.5158 102.479 81.0933 105.349 80.7915V84.9973C104.691 85.2309 103.995 85.345 103.296 85.3341ZM103.281 86.1753C104.6 86.1753 105.874 85.9591 106.737 85.5697V79.6369C106.737 77.5418 105.283 76.6792 103.007 76.6792C101.92 76.666 100.841 76.8733 99.8363 77.2886L100.193 78.1337C101.054 77.7792 101.975 77.596 102.906 77.5943C104.45 77.5943 105.349 78.1142 105.349 79.5161V80.0769C101.973 80.3612 99.1884 81.0388 99.1884 83.5213C99.1884 85.3945 100.871 86.1869 103.287 86.1869L103.281 86.1753ZM109.561 79.1618C109.561 78.1882 110.359 77.6041 111.561 77.6041C112.281 77.6104 112.991 77.783 113.633 78.1084L114.057 77.2828C113.229 76.8599 112.308 76.6503 111.377 76.6734C109.475 76.6734 108.103 77.6897 108.103 79.2046C108.103 82.0766 112.851 81.2977 112.851 83.5272C112.851 84.5553 112.037 85.1978 110.632 85.1978C109.829 85.2085 109.035 85.0381 108.308 84.6993L107.884 85.5775C108.784 85.9848 109.761 86.1915 110.749 86.183C112.896 86.183 114.346 85.0849 114.346 83.4844C114.346 80.5442 109.561 81.288 109.561 79.1579V79.1618ZM116.662 79.1579C116.662 78.1843 117.456 77.6002 118.66 77.6002C119.38 77.6055 120.088 77.7782 120.729 78.1045L121.153 77.2789C120.319 76.8536 119.391 76.6447 118.456 76.6714C116.559 76.6714 115.183 77.6878 115.183 79.2027C115.183 82.0746 119.931 81.2958 119.931 83.5252C119.931 84.5533 119.121 85.1959 117.712 85.1959C116.912 85.206 116.119 85.0363 115.394 84.6993L114.97 85.5775C115.87 85.9844 116.849 86.1911 117.837 86.183C119.984 86.183 121.434 85.0849 121.434 83.4844C121.434 80.5442 116.652 81.288 116.652 79.1579H116.662ZM130.664 76.8797H129.308L126.847 83.5817C126.703 83.986 126.58 84.3974 126.478 84.8142H126.441C126.358 84.3962 126.247 83.9844 126.107 83.5817L123.713 76.8759H122.117L125.781 85.9786L124.002 89.6119H125.61L130.664 76.8797Z" fill="#163C66"/>
            </svg>
          </div>
          <div className='partners-items--single jager'>
            <svg width="100%" height="100%" viewBox="0 0 152 55" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M152 0H0V55H152V0Z" fill="black"/>
              <path d="M17.6902 40.8598C17.2005 40.8554 16.7165 40.7536 16.2662 40.5605C15.8159 40.3673 15.4082 40.0866 15.0666 39.7345C14.3086 38.964 13.8861 37.9234 13.8917 36.8408V32.8218H17.6902V36.238C17.6937 36.4942 17.7932 36.7398 17.9688 36.9259C18.1444 37.112 18.3833 37.2251 18.6381 37.2427H20.5407C20.7958 37.2251 21.0351 37.1122 21.2113 36.9261C21.3874 36.7401 21.4876 36.4945 21.492 36.238V12.7469H25.2972V36.8408C25.2995 37.9224 24.876 38.9612 24.1189 39.7311C23.7775 40.0837 23.3699 40.3649 22.9196 40.5587C22.4693 40.7524 21.9852 40.8547 21.4953 40.8598H17.6902Z" fill="#E63B11"/>
              <path d="M35.7522 40.8598L35.1447 36.4423H30.6219L30.0411 40.8598H26.0957L30.8088 12.7469H34.9945L39.7209 40.8598H35.7522ZM33.3189 22.7743L33.0151 18.839H32.7881L32.4844 22.7743L31.1159 32.8218H34.6507L33.3189 22.7743Z" fill="#E63B11"/>
              <path d="M44.2329 40.8598C43.7432 40.8554 43.2593 40.7536 42.809 40.5605C42.3587 40.3673 41.951 40.0866 41.6094 39.7345C40.8498 38.9659 40.4249 37.9265 40.4278 36.8442V16.7626C40.4246 15.7177 40.8199 14.7111 41.5326 13.9493C41.8773 13.5748 42.2946 13.275 42.759 13.0683C43.2234 12.8615 43.7249 12.7522 44.2329 12.7469H48.4153C48.9429 12.7447 49.4646 12.8583 49.9438 13.0799C50.423 13.3015 50.848 13.6257 51.189 14.0297C51.8565 14.7819 52.2227 15.7554 52.2171 16.7626V20.7648H48.4153V17.3621C48.4109 17.1055 48.3107 16.8599 48.1345 16.6739C47.9584 16.4879 47.7191 16.3749 47.464 16.3573H45.1809C44.9247 16.3711 44.6835 16.4829 44.5071 16.6699C44.3307 16.8569 44.2326 17.1046 44.2329 17.3621V36.238C44.2365 36.4942 44.336 36.7398 44.5116 36.9259C44.6872 37.112 44.9261 37.2251 45.1809 37.2427H47.464C47.7191 37.2251 47.9584 37.1122 48.1345 36.9261C48.3107 36.7401 48.4109 36.4945 48.4153 36.238V28.4076H46.1322V24.7838H52.2171V36.8408C52.2244 37.3929 52.1202 37.9407 51.9108 38.4512C51.7015 38.9618 51.3912 39.4245 50.9988 39.8115C50.3013 40.4767 49.3775 40.8503 48.4153 40.8565L44.2329 40.8598Z" fill="#E63B11"/>
              <path d="M54.9912 40.8598V12.7469H64.4975V16.3607H58.793V24.5929H63.4193V28.2067H58.7797V37.2494H64.4841V40.8598H54.9912Z" fill="#E63B11"/>
              <path d="M75.2589 40.8598L72.098 28.2067H70.1987V40.8598H66.3936V12.7469H74.4044C74.9038 12.755 75.3967 12.8618 75.8549 13.0612C76.3131 13.2606 76.7276 13.5487 77.0747 13.9091C77.7958 14.6818 78.1916 15.7041 78.1796 16.7626V23.548C78.1914 24.586 77.811 25.59 77.1148 26.3579C76.7158 26.7531 76.2349 27.055 75.7062 27.2421L79.251 40.8598H75.2589ZM74.3844 17.3654C74.38 17.1089 74.2798 16.8633 74.1037 16.6772C73.9275 16.4912 73.6883 16.3782 73.4331 16.3607H70.2021V24.5929H73.3964C73.6616 24.5711 73.9096 24.4529 74.094 24.2605C74.2784 24.0681 74.3864 23.8147 74.3978 23.548L74.3844 17.3654Z" fill="#E63B11"/>
              <path d="M83.8138 40.8598L79.1074 12.7469H83.1763L85.6096 30.8324L85.9134 34.7711H86.117L86.4507 30.8123L88.8841 12.7436H92.7226L87.9962 40.8598H83.8138Z" fill="white"/>
              <path d="M93.8506 40.8598V12.7469H97.6524V40.8598H93.8506Z" fill="white"/>
              <path d="M100.921 40.8598V12.7469H108.908C109.426 12.7504 109.937 12.8627 110.408 13.0768C110.88 13.2908 111.301 13.6017 111.645 13.9895C112.329 14.7502 112.709 15.738 112.71 16.7626V22.3423C112.71 24.3116 111.455 25.879 109.82 26.157V26.3579C111.455 26.4785 113.091 28.0861 113.091 30.2965V36.8408C113.093 37.9224 112.67 38.9612 111.913 39.7311C111.57 40.0833 111.162 40.3641 110.711 40.5572C110.26 40.7504 109.776 40.8521 109.286 40.8565L100.921 40.8598ZM108.908 17.3654C108.904 17.1089 108.804 16.8633 108.628 16.6772C108.452 16.4912 108.212 16.3782 107.957 16.3607H104.723V24.5929H107.957C108.212 24.5753 108.452 24.4624 108.628 24.2763C108.804 24.0903 108.904 23.8447 108.908 23.5882V17.3654ZM109.286 30.2195C109.278 29.7067 109.078 29.2156 108.726 28.8434C108.375 28.4713 107.896 28.2452 107.386 28.21H104.716V37.2528H108.331C108.586 37.2351 108.825 37.1221 109 36.9359C109.176 36.7498 109.275 36.5043 109.279 36.248L109.286 30.2195Z" fill="white"/>
              <path d="M115.751 40.8598V12.7469H125.257V16.3607H119.553V24.5929H124.192V28.2067H119.553V37.2494H125.257V40.8598H115.751Z" fill="white"/>
              <path d="M130.124 40.8598C129.622 40.8661 129.124 40.7655 128.664 40.5646C128.204 40.3637 127.791 40.0671 127.454 39.6943C127.082 39.3211 126.789 38.8761 126.594 38.3862C126.398 37.8963 126.303 37.3718 126.315 36.8442V32.8218H130.117V36.238C130.117 36.496 130.216 36.7442 130.393 36.9312C130.57 37.1183 130.812 37.2298 131.069 37.2427H133.348C133.604 37.2251 133.843 37.1122 134.019 36.9261C134.195 36.7401 134.295 36.4945 134.3 36.238V31.5793C134.304 31.1999 134.221 30.8247 134.056 30.4834C133.891 30.1421 133.648 29.8442 133.348 29.6133L130.077 27.3225C128.138 25.9594 126.315 24.5929 126.315 21.8198V16.7626C126.304 16.2345 126.399 15.7095 126.594 15.2192C126.79 14.7288 127.082 14.2832 127.454 13.9091C127.791 13.5368 128.204 13.2407 128.664 13.0403C129.125 12.84 129.622 12.74 130.124 12.7469H134.306C134.815 12.7471 135.318 12.8542 135.783 13.0613C136.248 13.2684 136.665 13.5708 137.007 13.9493C137.725 14.7075 138.12 15.7167 138.108 16.7626V20.7648H134.306V17.3621C134.302 17.1055 134.202 16.8599 134.026 16.6739C133.849 16.4879 133.61 16.3749 133.355 16.3573H131.075C130.82 16.3741 130.58 16.4869 130.404 16.6731C130.228 16.8593 130.128 17.1053 130.124 17.3621V21.1801C130.111 21.567 130.191 21.9513 130.356 22.301C130.522 22.6506 130.768 22.9553 131.075 23.1896L134.266 25.3197C136.246 26.6828 138.108 28.21 138.108 31.0133V36.8408C138.119 37.8855 137.724 38.8934 137.007 39.6508C136.665 40.0296 136.249 40.3326 135.784 40.5403C135.319 40.7479 134.815 40.8556 134.306 40.8565L130.124 40.8598Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className='partners-subtitle--wrap'>Информационные партнеры:</div>
        <div className='partners-items--group-wrap'>
          <div className='partners-items--group'>
            <div className='partners-items--group-title'>Радиопартнер:</div>
            <div className='partners-items--wrap no-padding'>
              <div className='partners-items--single'>
                <svg width="88" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 119.39 113.6">
                  <path fill="#ed1a3b" fillRule="evenodd" d="M119.39,43.57c-.06-8.39-3.63-15.25-11.08-19.27l-.71-.39-.18-.8a19.92,19.92,0,0,0-9.26-12.63c-7.22-4.43-16.38-4.91-24.4-2.64l-.91.26-.73-.61C62.84-.27,48.88-1.64,37.58,1.73,26.75,5,18.18,12.4,15.12,23.44l-.21.72-.66.37C6,29.06,0,36.64,0,46.3c0,.73,0,1.46.1,2.18C1,58.07,7.49,65.83,16.23,69.53l1.71.72-.79,1.69q-3.94,8.52-7.91,17a1.35,1.35,0,0,0-.14.63,1.6,1.6,0,0,0,.24.82,1.52,1.52,0,0,0,1.27.69h4.16L13.29,93.8,3.53,111.35a1.46,1.46,0,0,0-.2.73,1.52,1.52,0,0,0,2.59,1.07L35.18,83.89a1.51,1.51,0,0,0-1.06-2.59H28.55l2.74-3c1.17-1.3,2.35-2.59,3.52-3.88l.69-.75,1,.19a80.46,80.46,0,0,0,27.21.38c6.4-1,13-3.06,18.45-6.72l.61-.41.72.14a39.81,39.81,0,0,0,12.61.09A31.07,31.07,0,0,0,110,62c6.12-4.51,8.92-11,9.42-18.44Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M25.08,24.86a2.33,2.33,0,0,0-1.66,2.54A2.18,2.18,0,0,0,26.33,29l2.45-.86L24,44.1c-.37,1.22.7,2.35,1.93,2.74A2.28,2.28,0,0,0,29,45.28c1.49-5.19,4.63-16.62,5.46-19.83a2.55,2.55,0,0,0-.48-2.4,2.26,2.26,0,0,0-2.32-.43l-6.58,2.24Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M76.37,24.86A2.33,2.33,0,0,0,74.7,27.4,2.18,2.18,0,0,0,77.61,29l2.45-.86-4.83,16c-.36,1.22.69,2.35,1.93,2.74a2.28,2.28,0,0,0,3.12-1.56c1.49-5.19,4.63-16.62,5.46-19.83a2.53,2.53,0,0,0-.48-2.4,2.25,2.25,0,0,0-2.32-.43l-6.57,2.24Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M44.65,37h0c-1.45,3-2.75,4.25-4.12,4.09-.83-.11-1.21-1.35-1.26-2C39,33.7,42,28.79,44,27.85c.47-.22.74-.3,1.09-.09,1.4.79,1.06,6.2-.4,9.23Zm3.64-13.87c-.5,0-.69.18-1.38.94l-.41.46-.17-.58a1.77,1.77,0,0,0-1.24-1.28,3.06,3.06,0,0,0-2.31.32c-2.8,1.25-6.27,4.51-8,11.48-1.11,4.4-.69,11.62,4.15,12.31,3.64.53,9.61-3.2,11.52-12.44,1.42-6.88-.72-9.89-.75-9.95-.34-.56-.8-1.22-1.4-1.26Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M62.58,37h0c-1.46,3-2.76,4.25-4.13,4.09-.83-.11-1.21-1.35-1.26-2-.32-5.33,2.75-10.24,4.69-11.18.46-.22.74-.3,1.09-.09,1.39.79,1.06,6.2-.39,9.23Zm3.63-13.87c-.49,0-.68.18-1.38.94l-.41.46-.17-.58A1.77,1.77,0,0,0,63,22.66,3.06,3.06,0,0,0,60.7,23c-2.8,1.25-6.27,4.51-8,11.48-1.1,4.4-.68,11.62,4.16,12.31,3.64.53,9.61-3.2,11.52-12.44,1.42-6.88-.72-9.89-.75-9.95-.34-.56-.8-1.22-1.4-1.26Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M90.23,39.46c1.25,0,1.36-.56,1.49-1.18a1,1,0,0,0-.8-1.23H86.77c-1.4.06-1.67,2.37-.8,2.41-.13.47-1.57,5.79-1.64,6.07a1.12,1.12,0,1,0,2.16.62c.23-.71.53-1.72.83-2.79h1.86c1.24,0,1.37-.56,1.49-1.17a.81.81,0,0,0-.81-1c-.29,0-1-.07-1.89-.12.15-.55.29-1.07.39-1.56Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M102.65,39.47a2.77,2.77,0,0,0,0-1.61,1.66,1.66,0,0,0-2.78.18c-.39.64-1,1.7-1.78,3-.3.53-.6,1-.86,1.41-.09.13-.13.2-.19.2s-.13,0-.15-.22c-.07-.53-.13-2.28-.17-3.07-.09-1.56-.5-1.93-.9-2.08a1.72,1.72,0,0,0-2.25.9c-.32,1.11-1.81,6.37-2.11,7.35-.36,1.24,1.61,2.29,2.17.62.33-1,.82-3.37,1.1-4.29.06-.22.13-.29.17-.27s0,.11.07.29c0,.95.1,2.62.18,3.62s.58,1.27,1.19,1.14c.4-.09.71-.56,1-1,.57-.88.72-1.23,1.44-2.44l.8-1.34c.1-.18.22-.13.16.11-.33,1.15-.75,2.64-1,3.55-.32,1.25,1.69,2.33,2.15.62s1.24-4.64,1.7-6.68Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M71.47,41.9A2.74,2.74,0,0,0,69,41.81c-1.26.61-1.66,1.54-1.37,3.18A2.65,2.65,0,0,0,69,46.52a2.26,2.26,0,0,0,1.81.18,2.8,2.8,0,0,0,1.9-3.1,2.22,2.22,0,0,0-1.2-1.7Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M80.43,56.23h0a.67.67,0,0,1-.65.37.52.52,0,0,1-.38-.47h0a2.91,2.91,0,0,1,1.17-2.81h0a.33.33,0,0,1,.33,0,.29.29,0,0,1,.13.26,4.08,4.08,0,0,1-.6,2.7ZM82,52c-.17,0-.44.08-.81.38l-.06.06L81,52.33c-.09-.21-.16-.38-.3-.43s-.36,0-.68.17a4.18,4.18,0,0,0-2.08,3,3,3,0,0,0,.42,2.34,1.78,1.78,0,0,0,1.21.72,2,2,0,0,0,1.57-.7,4.53,4.53,0,0,0,1.14-2,5.8,5.8,0,0,0,.25-1.65,3.29,3.29,0,0,0-.28-1.46c-.1-.21-.19-.3-.31-.32Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M90.3,52.28a.33.33,0,0,0,0-.15.63.63,0,0,0-.41-.21c-.18,0-.64-.08-.74.24a4.24,4.24,0,0,1-1.68,2.21l-.13.06s.44-1.55.47-1.75c.13-.61-.23-.78-.39-.83a.72.72,0,0,0-.86.39c-.1.36-.65,2.21-.65,2.21l-.07-.13a5.79,5.79,0,0,1-.39-1,5.54,5.54,0,0,1-.2-1.32.28.28,0,0,0-.2-.23.85.85,0,0,0-.6,0c-.19.07-.39.23-.32.84A5.25,5.25,0,0,0,84.43,54a5.73,5.73,0,0,0,.27.6l0,.05,0,0a13.48,13.48,0,0,0-2.37,2.76.39.39,0,0,0,0,.37.68.68,0,0,0,.46.35l.1,0c.2,0,.38.07.53-.16a9.52,9.52,0,0,1,2-2.31l.16-.1L85,57.36a.69.69,0,0,0,.5.82.6.6,0,0,0,.79-.47c.09-.25.25-.81.4-1.31l.28-.95a9.61,9.61,0,0,1,.41,1.26c.08.46.22,1.17.23,1.25.06.39.8.23.8.23a.45.45,0,0,0,.4-.52,1.59,1.59,0,0,0,0-.29,7.3,7.3,0,0,0-.63-2l0,0a5.23,5.23,0,0,0,2-2.81.74.74,0,0,0,0-.23Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M92.88,56.22h0l0,.67-1.3,0,0-.09A19.3,19.3,0,0,0,93,53.63s0-.08.09-.07,0,.1,0,.1c-.1.91-.15,1.86-.2,2.56Zm1.9,1.09a.74.74,0,0,0-.56-.38h-.06v-.13c.08-.9.08-2.07.08-3,0-.55,0-1,0-1.31v0A.52.52,0,0,0,94,52a.57.57,0,0,0-.59,0h0l0,0a.73.73,0,0,0-.93.23h0c-.2.33-.66,1.33-1.11,2.3s-.92,2-1.1,2.32l0,0h-.11a.61.61,0,0,0-.5.24h0a.6.6,0,0,0-.13.24s-.12.41-.16.65a.31.31,0,0,0,0,.1.59.59,0,0,0,.13.36.51.51,0,0,0,.38.2.72.72,0,0,0,.76-.42l0,0,2.84,0v.06c0,.24.29.37.55.37a.69.69,0,0,0,.71-.39,6.25,6.25,0,0,0,.16-.62.6.6,0,0,0-.08-.28Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M75.47,56.22h0l0,.67-1.3,0,0-.09a18.46,18.46,0,0,0,1.36-3.13s0-.08.09-.07,0,.1,0,.1c-.09.91-.15,1.86-.19,2.56Zm1.9,1.09a.8.8,0,0,0-.57-.38h-.06v-.13c.08-.9.08-2.07.08-3,0-.55,0-1,0-1.31v0a.51.51,0,0,0-.22-.45.59.59,0,0,0-.6,0h0l0,0a.71.71,0,0,0-.92.23h0c-.19.33-.66,1.33-1.1,2.3s-.93,2-1.11,2.32l0,0H72.7a.63.63,0,0,0-.5.24h0a.66.66,0,0,0-.12.24,6.34,6.34,0,0,0-.17.65V58a.58.58,0,0,0,.12.36.53.53,0,0,0,.38.2.71.71,0,0,0,.76-.42l0,0,2.84,0v.06c0,.24.29.37.56.37a.68.68,0,0,0,.7-.39,6.25,6.25,0,0,0,.16-.62.72.72,0,0,0-.07-.28Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M98.23,55.58h0a.37.37,0,0,1,.06.36c-.13.59-.4.73-1,.83a.42.42,0,0,1-.4-.15.43.43,0,0,1-.09-.26.52.52,0,0,1,0-.21s.21-.54.21-.56h0a.09.09,0,0,1,.08,0c.07,0,.92-.12,1.08,0ZM97.4,52a.74.74,0,0,0-.91.47l-.27,1-.39,1.42c-.17.58-.38,1.16-.46,1.37a1.11,1.11,0,0,0-.09.44,2.27,2.27,0,0,0,.35.86.94.94,0,0,0,.86.54,3.61,3.61,0,0,0,2.58-.83A1.73,1.73,0,0,0,99.71,56,1.69,1.69,0,0,0,99,54.44a3.09,3.09,0,0,0-1.06-.12,1.86,1.86,0,0,1-.43,0l-.07,0s.39-1.53.42-1.69A.53.53,0,0,0,97.4,52Z" />
                  <path fill="#fff" fillRule="evenodd" d="M24.18,52.6a1.19,1.19,0,0,0-1.1-.79,2.46,2.46,0,0,0-1.41.47,4.3,4.3,0,0,0-1.6,2.58,3.16,3.16,0,0,0,.15,2.57,1.73,1.73,0,0,0,1.26.68,2.73,2.73,0,0,0,2.18-1.06.88.88,0,0,0,.13-.44.92.92,0,0,0-.2-.53.59.59,0,0,0-.51-.22.48.48,0,0,0-.41.2l0,0a1,1,0,0,1-.82.58.47.47,0,0,1-.38-.21c-.15-.2-.27-.64,0-1.54s.7-1.69,1.14-1.7c.17,0,.32.13.43.4v0c.08.2.12.36.29.43s.51-.16.51-.16h0a1,1,0,0,0,.35-1.31Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M58,52.55a.54.54,0,0,0-.35-.65.73.73,0,0,0-.86.45c-.08.3-.57,2-.57,2l-1.52,0s.37-1.44.45-1.81a.54.54,0,0,0-.36-.65.73.73,0,0,0-.86.45s-.19.67-.19.67l-.37,1.31h0a.94.94,0,0,0-.66.94h0c0,.19.06.39.23.42H53s-.29,1-.44,1.53a.57.57,0,0,0,0,.18.73.73,0,0,0,.5.65.61.61,0,0,0,.78-.48c.16-.47.58-2,.58-2h1.5l-.48,1.6a.69.69,0,0,0,.48.83.6.6,0,0,0,.77-.48c.43-1.29,1.19-4.12,1.38-5Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M70.07,49.75a.75.75,0,0,0-.57.12l-.07,0c-.51.27-1.05.54-1.48.12a.46.46,0,0,0-.67,0,.62.62,0,0,0,0,.92,1.35,1.35,0,0,0,1,.43A2.49,2.49,0,0,0,70,50.68c.25-.25.36-.44.24-.71a.35.35,0,0,0-.21-.22Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M64.87,52.55a.54.54,0,0,0-.36-.65.71.71,0,0,0-.85.45c-.2.73-1.24,4.3-1.41,4.89a.55.55,0,0,0,0,.17.72.72,0,0,0,.5.66.6.6,0,0,0,.77-.48c.43-1.27,1.19-4.09,1.38-5Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M28.68,52.16a.49.49,0,0,0-.37-.16c-.12,0-2.13-.14-2.63-.12a.92.92,0,0,0-.77,1c0,.2.07.43.25.44h.08l-.76,2.84a1.77,1.77,0,0,0,.11,1.49,1,1,0,0,0,.92.4l1.19,0c.7,0,.76-.3.83-.68a2.89,2.89,0,0,0,0-.29.4.4,0,0,0-.07-.26.32.32,0,0,0-.25-.09h-1a.51.51,0,0,1-.38-.1.5.5,0,0,1,0-.41l.14-.56h1.26c.74,0,.81-.33.89-.7a.52.52,0,0,0-.09-.43.46.46,0,0,0-.37-.16l-1.28-.08.27-1h1.24c.76,0,.81-.31.9-.69a.52.52,0,0,0-.09-.44Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M37.88,52.16a.47.47,0,0,0-.36-.16l-.72,0c-.59,0-1.42-.1-1.93-.08s-.75.58-.75,1c0,.21.06.43.24.44h.08s-.75,2.79-.77,2.84a1.77,1.77,0,0,0,.12,1.49,1.05,1.05,0,0,0,.93.4l1.17,0c.69,0,.76-.29.84-.66v-.07a1.11,1.11,0,0,0,0-.23.48.48,0,0,0-.07-.27.33.33,0,0,0-.25-.09h-1a.48.48,0,0,1-.37-.1.54.54,0,0,1,0-.41l.14-.56H36.4c.76,0,.82-.34.89-.7a.56.56,0,0,0-.08-.43.46.46,0,0,0-.37-.16l-1.28-.08.11-.4c.06-.19.17-.6.17-.6h1.24c.74,0,.8-.31.88-.69a.53.53,0,0,0-.08-.44Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M60.81,56h0a.88.88,0,0,1-1,.64.33.33,0,0,1-.21-.44c0-.13.22-.7.22-.7h0c.34,0,.77-.07.94.14a.36.36,0,0,1,0,.37Zm.88-1.34a1.53,1.53,0,0,0-1.31-.36h-.27a.07.07,0,0,1,0-.08c.23-.76.38-1.31.46-1.68a.52.52,0,0,0-.35-.64.69.69,0,0,0-.86.44c-.13.47-.51,1.7-.82,2.68-.16.52-.38,1.32-.38,1.32a1.61,1.61,0,0,0,.19,1.31,1.1,1.1,0,0,0,.9.36,3.67,3.67,0,0,0,1.89-.54,2,2,0,0,0,1-1.47,1.51,1.51,0,0,0-.43-1.34Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M68.31,57.93a.63.63,0,0,0,.77-.37c.18-.86.53-2.12.81-3.13.2-.74.38-1.38.41-1.59.1-.69,0-.78-.3-.84a1.38,1.38,0,0,0-.43,0,.59.59,0,0,0-.34.25s-1.85,2.14-2,2.41-.27.36-.33.42-.11,0-.11,0,.51-1.84.59-2.1a1.69,1.69,0,0,0,.07-.45.75.75,0,0,0-.08-.35.38.38,0,0,0-.27-.17,2.23,2.23,0,0,0-.54,0c-.15,0-.27.18-.38.48a35.57,35.57,0,0,0-1.25,4.87s0,0,0,0a.63.63,0,0,0,.44.65.74.74,0,0,0,.83-.33l2.08-2.53s.07-.07.1-.07,0,0,0,.13c-.08.26-.39,1.56-.48,2a.58.58,0,0,0,.46.75Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M40.9,55.55h0a.31.31,0,0,1,.08.22.69.69,0,0,1,0,.13,1.1,1.1,0,0,1-1,1,.42.42,0,0,1-.41-.16.37.37,0,0,1-.08-.25.51.51,0,0,1,0-.2c0-.09.21-.72.21-.72h0s.07,0,.07,0l.23,0c.34,0,.73-.1.9.09Zm1.59-3.39a.45.45,0,0,0-.36-.16l-.74,0c-.66,0-1.57-.1-2.09-.08a.92.92,0,0,0-.76,1h0c0,.21.06.43.24.44h.09l-.59,2.09c-.11.38-.21.74-.3,1a1.14,1.14,0,0,0-.1.44,1.43,1.43,0,0,0,.36.84v0a.94.94,0,0,0,.85.54,3.28,3.28,0,0,0,2.39-.81,2,2,0,0,0,.73-1.43,1.58,1.58,0,0,0-.78-1.49A7.65,7.65,0,0,0,40,54.3l.26-1H41.7c.74,0,.8-.32.88-.69a.52.52,0,0,0-.09-.44Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M31.06,53.53h0a.51.51,0,0,0,0-.13,1.07,1.07,0,0,1-.07-.23.16.16,0,0,1,0-.09.18.18,0,0,1,.17-.07,1,1,0,0,1,.74.27.94.94,0,0,1,.23.64h0A1.42,1.42,0,0,1,30.8,55h-.08a10.56,10.56,0,0,0,.34-1.49Zm-.67,2.74h0a3.73,3.73,0,0,0,1.68-.51,2.83,2.83,0,0,0,1.25-1.49,1.86,1.86,0,0,0-.13-1.6,2.61,2.61,0,0,0-2.25-.8c-1.54,0-1.59.51-1.63.91h0c0,.2,0,.39,0,.46s0,0,.13,0,.22.17.23.25a1.34,1.34,0,0,1-.06.36c-.23.82-.79,2.76-1,3.35a.7.7,0,0,0,.48.83.6.6,0,0,0,.77-.48c.14-.42.41-1.32.41-1.32Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M49.74,54.81h0c-.16-.08-.33-.28-.25-.76a1,1,0,0,1,.42-.62A1.36,1.36,0,0,1,51,53.24h0a1.18,1.18,0,0,1,0,.38s-.29.91-.31.93a.91.91,0,0,1-.95.25Zm.43,3.27A.72.72,0,0,0,51,57.7l.84-2.85.46-1.53h.09c.16-.06.31-.49.31-.85,0-.05,0-.11,0-.15A.33.33,0,0,0,52.5,52a10.45,10.45,0,0,0-1.31-.09l-.28,0a2.65,2.65,0,0,0-2.79,2,2.11,2.11,0,0,0-.07.54,1.5,1.5,0,0,0,.48,1.11l0,0,0,0a4.47,4.47,0,0,1-1.61,1.47.76.76,0,0,0-.36.57.6.6,0,0,0,.07.27c.22.49.64.38.93.26a5.32,5.32,0,0,0,2-2.17l0,0a1.46,1.46,0,0,0,.6-.15l.16-.1-.29.79a5.67,5.67,0,0,0-.25.69c-.13.61.24.77.4.82Z"/>
                  <path fill="#fff" fillRule="evenodd" d="M44.92,53.79h0a.85.85,0,0,0,0-.26.51.51,0,0,0,0-.13v0a.56.56,0,0,1-.06-.21.16.16,0,0,1,0-.09.18.18,0,0,1,.17-.07.86.86,0,0,1,1,.91h0A1.42,1.42,0,0,1,44.71,55h-.08l.29-1.23Zm-1.8,4.28a.6.6,0,0,0,.77-.48c.13-.38.4-1.32.4-1.32h.05A3.87,3.87,0,0,0,46,55.75a2.83,2.83,0,0,0,1.25-1.49,1.89,1.89,0,0,0-.13-1.6,2.62,2.62,0,0,0-2.26-.8c-1.54,0-1.58.51-1.62.92h0a2,2,0,0,0,0,.22.37.37,0,0,0,.06.24s0,0,.13,0c.24,0,.22.26.22.26a1.07,1.07,0,0,1,0,.35c0,.06-.78,2.76-1,3.35a.55.55,0,0,0,0,.17.73.73,0,0,0,.51.66Z"/>
                </svg>
              </div>
            </div>
          </div>
          <div className='partners-items--group'>
            <div className='partners-items--group-title'>Медиапартнеры:</div>
            <div className='partners-items--wrap no-padding'>
              <div className='partners-items--single'>
                <svg width="150" height="53" viewBox="0 0 150 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip2)">
                    <path d="M53.1367 51.5499C53.1401 51.9356 53.2973 52.3045 53.574 52.576C53.8507 52.8476 54.2246 53 54.6142 53H139.01L131.234 41.9508L139.01 30.9017H54.653C54.4558 30.8965 54.2595 30.9306 54.0757 31.0018C53.8919 31.073 53.7244 31.18 53.5831 31.3163C53.4418 31.4527 53.3294 31.6157 53.2528 31.7958C53.1761 31.9758 53.1367 32.1692 53.1367 32.3646V51.614V51.5499Z" fill="#E13439"/>
                    <path d="M6.33753 18.6848C6.33753 17.8506 6.8041 17.132 8.16491 17.132H16.0317V20.9819H8.25563C6.71338 20.9819 6.38937 20.0579 6.38937 19.5831L6.33753 18.6848ZM22.3821 11.832C22.3821 9.58622 20.477 8.64941 18.3386 8.64941H0.99798V11.7935H14.1784C15.2022 11.7935 16.0317 12.1656 16.0317 13.3206V13.9109H3.47336C3.0256 13.8846 2.57715 13.9495 2.15574 14.1016C1.73433 14.2538 1.34892 14.4899 1.02336 14.7954C0.697802 15.1009 0.439012 15.4694 0.262998 15.8779C0.0869846 16.2864 -0.00250888 16.7263 5.35082e-05 17.1705V20.9562C0.0016581 21.4032 0.093266 21.8454 0.269519 22.2569C0.445772 22.6685 0.703131 23.0411 1.02654 23.3529C1.34995 23.6648 1.73292 23.9097 2.15305 24.0733C2.57318 24.2369 3.02204 24.3158 3.47336 24.3056H22.3692L22.3821 11.832Z" fill="#1C1A19"/>
                    <path d="M80.1713 16.3877V24.3826H86.8327V8.68793H80.2231L70.7493 18.9543C70.7493 18.9543 70.7493 18.133 70.7493 17.132V8.68793H64.1396V24.3826H70.7234L80.2231 14.1163C80.2231 14.1163 80.2231 15.6947 80.2231 16.516" fill="#1C1A19"/>
                    <path d="M125.233 8.68793H118.662V20.9177H110.951V8.68793H104.354V20.9177H96.6688V8.68793H90.0332V24.3184H125.233V8.68793Z" fill="#1C1A19"/>
                    <path d="M57.0891 8.6109H46.6563V0H40.0077V8.6109H29.523C27.3846 8.6109 25.4795 9.56053 25.4795 11.7935V20.969C25.4795 23.2019 27.3846 24.3826 29.523 24.3826H40.0077V32.9935H46.6563V24.3826H57.1539C59.2924 24.3826 61.1845 23.2019 61.1845 20.969V11.7935C61.1845 9.56053 59.2924 8.6109 57.1539 8.6109H57.0891ZM40.0077 20.9947H33.6962C33.4596 21.0268 33.2187 21.0071 32.9906 20.937C32.7625 20.867 32.5527 20.7482 32.376 20.5891C32.1993 20.4301 32.06 20.2346 31.9679 20.0164C31.8758 19.7982 31.8331 19.5627 31.8429 19.3264V13.4361C31.8331 13.1998 31.8758 12.9643 31.9679 12.7461C32.06 12.5279 32.1993 12.3324 32.376 12.1733C32.5527 12.0143 32.7625 11.8955 32.9906 11.8254C33.2187 11.7554 33.4596 11.7357 33.6962 11.7678H40.0207L40.0077 20.9947ZM54.7693 19.3264C54.7791 19.5627 54.7364 19.7982 54.6443 20.0164C54.5522 20.2346 54.4129 20.4301 54.2361 20.5891C54.0594 20.7482 53.8496 20.867 53.6215 20.937C53.3934 21.0071 53.1526 21.0268 52.916 20.9947H46.6563V11.7678H52.9808C53.2174 11.7357 53.4582 11.7554 53.6863 11.8254C53.9144 11.8955 54.1242 12.0143 54.3009 12.1733C54.4777 12.3324 54.617 12.5279 54.7091 12.7461C54.8012 12.9643 54.8439 13.1998 54.8341 13.4361L54.7693 19.3264Z" fill="#1C1A19"/>
                    <path d="M133.956 18.6848C133.956 17.8506 134.435 17.132 135.796 17.132H143.65V20.9819H135.874C134.332 20.9819 133.995 20.0579 133.995 19.5831L133.956 18.6848ZM150 11.832C150 9.58622 148.095 8.64941 145.97 8.64941H128.616V11.7935H141.797C142.82 11.7935 143.65 12.1656 143.65 13.3206V13.9109H131.092C130.644 13.8846 130.195 13.9495 129.774 14.1016C129.352 14.2538 128.967 14.4899 128.642 14.7954C128.316 15.1009 128.057 15.4694 127.881 15.8779C127.705 16.2864 127.616 16.7263 127.618 17.1705V20.9562C127.622 21.4027 127.714 21.8441 127.891 22.2549C128.068 22.6656 128.325 23.0375 128.649 23.349C128.972 23.6606 129.354 23.9055 129.773 24.0697C130.193 24.2339 130.641 24.3141 131.092 24.3056H149.987L150 11.832Z" fill="#1C1A19"/>
                    <path d="M75.7644 39.551C75.7644 41.7968 74.1962 42.6951 72.8224 43.4009L71.2802 44.1067C70.2045 44.6585 69.8675 45.2489 69.8675 45.544H75.6866V47.1995H67.9106C67.9069 46.3603 68.1148 45.5336 68.5154 44.7941C68.916 44.0546 69.4965 43.4258 70.2045 42.9646C70.8266 42.5539 71.6819 42.0791 72.3818 41.6813C72.8012 41.5055 73.1602 41.2132 73.4155 40.8397C73.6707 40.4662 73.8114 40.0276 73.8204 39.5767C73.8141 39.3344 73.758 39.096 73.6556 38.8759C73.5532 38.6558 73.4065 38.4586 73.2246 38.2965C73.0427 38.1344 72.8293 38.0107 72.5975 37.9329C72.3657 37.8552 72.1203 37.825 71.8763 37.8442C71.552 37.8276 71.2277 37.8787 70.9245 37.9941C70.6213 38.1094 70.3459 38.2866 70.1162 38.514C69.8866 38.7414 69.7077 39.0141 69.5912 39.3143C69.4746 39.6145 69.4231 39.9356 69.4399 40.2568L67.6514 39.782C67.7438 38.7609 68.2307 37.8146 69.0106 37.1404C69.7906 36.4661 70.8032 36.1161 71.8375 36.1631C72.3218 36.1211 72.8098 36.1763 73.2721 36.3253C73.7345 36.4743 74.1617 36.7141 74.5283 37.0304C74.8949 37.3467 75.1934 37.7329 75.4057 38.166C75.6181 38.5991 75.7401 39.0702 75.7644 39.551Z" fill="white"/>
                    <path d="M77.2686 41.8353C77.2686 38.3062 78.8626 36.2145 81.4028 36.2145C83.943 36.2145 85.5371 38.2934 85.5371 41.8353C85.5371 45.3772 83.9819 47.4818 81.4028 47.4818C78.8238 47.4818 77.2686 45.2874 77.2686 41.8353ZM79.1607 41.8353C79.1607 44.1966 79.7051 45.9033 81.4028 45.9033C83.1006 45.9033 83.632 44.1966 83.632 41.8353C83.632 39.474 83.0099 37.7929 81.4028 37.7929C79.7958 37.7929 79.1607 39.4227 79.1607 41.8353Z" fill="white"/>
                    <path d="M92.3145 36.0862H99.961V47.1995H97.9133V37.8956H94.1678L93.7661 44.9794C93.7924 45.2827 93.7528 45.5881 93.6499 45.875C93.5469 46.1619 93.3831 46.4236 93.1694 46.6425C92.9557 46.8614 92.6971 47.0324 92.4111 47.144C92.125 47.2556 91.8181 47.3051 91.511 47.2893C91.103 47.2969 90.6989 47.209 90.3316 47.0327L90.1113 45.3387C90.4152 45.4242 90.7287 45.4716 91.0445 45.4799C91.1393 45.489 91.2351 45.4781 91.3254 45.4478C91.4157 45.4175 91.4985 45.3687 91.5683 45.3044C91.6382 45.2401 91.6934 45.1619 91.7305 45.0749C91.7675 44.9879 91.7855 44.8941 91.7832 44.7997L92.3145 36.0862Z" fill="white"/>
                    <path d="M102.385 36.0862H111.185V37.9213H104.445V40.6804H110.329V42.477H104.445V45.2874H111.457V47.1995H102.385V36.0862Z" fill="white"/>
                    <path d="M112.454 37.8571V36.0862H121.993V37.8571H118.247V47.1995H116.122V37.8571H112.454Z" fill="white"/>
                    </g>
                  <defs>
                    <clipPath id="clip2">
                    <rect width="150" height="53" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className='partners-items--single the-village'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1019.59 356.52">
                  <path d="M440.12.68H385.74l-1,2.72c5.43,3.4,17.33,28.21,17.33,35V202.56l-3.4,63.55h51.66c-4.76-12.23-10.2-45.2-10.2-63.55Z"/>
                  <path d="M356.18.68H301.8l-1,2.72c5.44,3.4,17.33,28.21,17.33,35V202.56l-3.4,63.55h51.66c-4.76-12.23-10.19-45.2-10.19-63.55Z"/>
                  <path d="M238.24,237.9l-1-1,41.47-110.11H224.31L223,129.49c3.74,4.42,11.22,15.63,8.84,21.75L198.48,237.9c-6.12,15.64,1.36,29.91,17.33,29.91,15.64,0,27.87-10.53,39.77-21.41l24.81-22.09-5.78-7.82S245.38,234.17,238.24,237.9Z"/>
                  <path d="M230.43.68H176.05L174.69,3.4c6.46,10.53,21.07,43.5,19,49.62L137.33,211.37,82.59,71C78.85,61.86,70.35,18,68,.68H1.36L0,3.4,33,71l81.22,195.08h18.7L210.72,50.64Z"/>
                  <path d="M271.21,57.1c-15.63,0-27.87,12.23-27.87,27.19,0,13.25,6.8,22.09,22.09,22.09,15.64,0,27.19-13.6,27.19-27.87C292.62,64.91,283.79,57.1,271.21,57.1Z"/>
                  <path d="M1011.77,170.27c-9.85,0-23.11,9.18-28.21,15l-.34,2.71c7.48,7.14,17,20.4,19.38,28.21-10.2,17.68-40.79,34-75.11,34-54.4,0-83.78-25.92-87-74.9,24.88-2.62,75.91-7.86,92.13-8.37,0-44.18-17.67-70.69-59.13-70.69-42.82,0-72.39,35.35-72.39,84.63,0,59.81,37.38,100.94,105,100.94,55,0,113.51-36.37,113.51-87C1019.59,187.26,1017.21,175,1011.77,170.27ZM867,109.78c17,0,25.49,19.71,28.21,42.14l-55.05,12.81C840.36,132,849.52,109.78,867,109.78Z"/>
                  <path d="M638.94,61.52l-3.06-2.38c-3.39,3.06-9.85,6.11-15.29,6.11-9.72,0-12.78-7-13.2-16.57l28.15-2.12c-.34-13.59-7.47-22.43-19-22.43-13.93,0-23.11,9.52-23.11,26.17,0,15,8.5,25.49,23.45,25.49C626.71,75.79,633.51,70,638.94,61.52ZM615.49,28.89c5.1,0,6.8,4.76,7.48,11.89l-15.62,3.91C607.5,35.6,609.05,28.89,615.49,28.89Z"/>
                  <path d="M750.08,245.72H670.55c2.11-6.58,5.85-16,10.91-23.73a85,85,0,0,0,14.92,1.3c41.12,0,69.33-23.79,69.33-68.65a60.38,60.38,0,0,0-7.49-30.12l37.4,4.63V98.9C784.23,104,760.7,112,750.76,114.46c-11.37-12-28.76-19-50.64-19-43.84,0-68.31,27.53-68.31,65.94,0,30.18,15.72,49.76,38.81,57.75-13.69,13.23-30.57,33.06-38.47,51,2.92,10.07,13,13.3,31.11,13.57-16.55,11.15-29.42,22.14-29.42,37.41,0,21.07,23.8,35.35,66.28,35.35C738.86,348.36,798,307.58,798,277,798,256.26,780,245.72,750.08,245.72Zm-53.36-137c19.71,0,28.21,28.54,28.21,58.11,0,24.13-6.46,44.19-22.43,44.19-21.41,0-28.21-31.27-28.21-59.82C674.29,128.13,680.75,108.76,696.72,108.76Zm23.79,224.31c-26.85,0-57.44-5.44-57.44-26.17,0-7.81,5.65-16.82,11.52-23.11h64.27c20.73,0,28.21,4.75,28.21,13.59C767.07,309.28,746.34,325.59,720.51,333.07Z"/>
                  <path d="M490.76,6.12h9.86V52.68a152.29,152.29,0,0,1-2,22.09H518c-1.7-5.1-2-15.63-2-22.43V6.12h9.52c3.77,0,10.14,3.48,14.31,6.42A34,34,0,0,1,540,16V59.82l-1.36,14.95h18a59.71,59.71,0,0,1-2.38-15.29V37.92c3.47-2.65,6.1-4.27,9.17-4.27,8.16,0,8.16,6.11,8.16,14.27V74.77H588.3c-1.36-3.06-2.38-10.54-2.38-14.95V41.12c0-10.19-5.43-17.33-15.29-17.33-7.66,0-12.24,4.27-16.31,9V0H472.75V16.31h1.36C479.55,11.9,488,6.12,490.76,6.12Z"/>
                  <path d="M596.8,139.68c0-29.56-25.49-44.18-55.06-44.18s-65.25,22.43-65.25,52a43.64,43.64,0,0,0,2.38,14.61c11.21,0,31.6-7.81,37.38-13.59-.68-20.39,1.36-31.27,3.06-35,3.06-2,7.14-3.73,14.28-3.73,15.29,0,24.47,16.65,24.47,37v13.6c-5.78,6.45-13.6,11.21-24.13,16.31-35.35,17-59.82,27.19-59.82,56.08,0,19.71,10.2,36.36,38.06,36.36,19.72,0,36.71-14.27,45.89-25.83v22.77H605c-4.76-9.17-8.16-32.28-8.16-47.92Zm-38.74,89.73c-5.78,7.81-14.28,14.27-22.44,14.27-13.25,0-20-10.19-20-23.45,0-14.95,8.16-23.11,21.07-29.91,8.84-4.75,18-10.87,21.42-14.27Z"/>
                </svg>
              </div>
              <div className='partners-items--single rambler'>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 315 65" version="1.1">
                  <g id="Rambler" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                      <g id="fun" transform="translate(-143.000000, -58.000000)" fill="#315EFB">
                          <g id="rambler_ru" transform="translate(143.000000, 58.000000)">
                              <path d="M141.30563,42.0470252 C134.893025,42.0470252 132.202899,37.1026555 132.202899,32.2877395 C132.202899,27.4728235 134.978782,23.2691261 141.37937,23.2691261 C147.779412,23.2691261 150.070252,28.7302185 150.070252,32.6274874 C150.070252,36.5247563 147.718782,42.0470252 141.30563,42.0470252 Z M142.171387,15.0108487 C137.471176,15.0108487 134.113025,17.2099244 133.172437,17.8828655 C133.431345,16.7434538 134.445126,7.7237479 147.125042,7.7237479 L154.958361,7.7237479 L157.862059,0.128033613 L147.259412,0.128033613 C133.281681,0.128033613 122.661008,6.3084958 122.661008,28.0474454 C122.661008,39.9823193 127.971891,49.4892521 141.02979,49.4892521 C153.447521,49.4892521 159.53895,40.7836218 159.53895,32.3155966 C159.53895,20.0529916 150.107395,15.0108487 142.171387,15.0108487 Z M15.2258403,23.5056387 L10.3879832,23.5056387 L10.3879832,8.26505042 L15.3662185,8.26505042 C18.902437,8.26505042 24.6098739,10.343958 24.6098739,15.9175714 C24.6098739,21.5387059 18.902437,23.5056387 15.2258403,23.5056387 Z M16.0593697,0.128033613 L0.293865546,0.128033613 L0.293865546,48.6917731 L10.3879832,48.6917731 L10.3879832,31.5694622 L15.8512605,31.5694622 C26.1507563,31.5694622 34.7771849,26.2957227 34.7771849,15.8858908 C34.7771849,5.47605882 26.1507563,0.128033613 16.0593697,0.128033613 Z M183.219706,15.0108487 L196.094622,48.6917731 L185.638361,48.6917731 L178.158992,27.2111849 L178.029538,27.2111849 L170.574748,48.6917731 L160.155084,48.6917731 L173.03,15.0108487 L183.219706,15.0108487 Z M314.70542,0.128033613 L290.005966,64.7292941 L279.940798,64.7292941 L304.635336,0.128033613 L314.70542,0.128033613 Z M108.241933,15.0108487 L116.567395,15.0108487 L116.567395,48.6917731 L106.822311,48.6917731 L106.822311,28.9596303 L97.3765546,40.8185798 L94.735042,40.8185798 L94.514916,40.5525714 L85.215,29.1229496 L85.215,48.6917731 L75.465,48.6917731 L75.465,15.0108487 L83.7959244,15.0108487 L84.010042,15.2610168 L96.1147899,29.2261849 L108.241933,15.0108487 Z M58.357437,34.6501345 C58.357437,39.2569412 55.6804202,42.4310168 50.4946218,42.4310168 C45.4786975,42.4310168 45.0531933,39.6005126 45.0531933,38.5217311 C45.0531933,36.0304286 47.407395,34.3699244 53.0121429,33.8794202 C54.5557563,33.743958 56.1326891,33.6784118 57.6932353,33.6784118 L58.357437,33.6784118 L58.357437,34.6501345 Z M67.4831092,30.9850084 C67.4831092,30.3060588 67.4721849,29.6549664 67.4432353,29.0246303 C66.9669328,18.5350504 62.3431933,14.2133697 52.3643277,14.2133697 C45.607605,14.2133697 41.2143697,16.8592521 39.6685714,17.9374874 L42.3002521,24.8187479 C42.3002521,24.8187479 46.4078151,21.4638739 51.5985294,21.4638739 C58.942437,21.4638739 58.2165126,27.2876555 58.2165126,27.2876555 C55.705,27.3095042 35.719958,26.3126555 35.719958,38.7877395 C35.719958,45.7083277 41.669916,49.4892521 48.3479832,49.4892521 C54.2886555,49.4892521 57.4845798,46.6226975 58.5382353,45.5095042 C58.5436975,45.6613529 58.7463445,48.6912269 58.7463445,48.6912269 L67.8261345,48.6912269 C67.8261345,48.6912269 67.4831092,45.7695042 67.4831092,41.1932857 L67.4831092,30.9850084 Z M256.791513,42.0492101 C250.352143,42.0492101 246.796807,36.7973193 246.796807,31.7835798 C246.796807,26.7703866 250.430798,21.5174034 256.791513,21.5174034 C263.151681,21.5174034 266.636555,26.0848824 266.636555,31.7835798 C266.636555,37.4822773 263.230882,42.0492101 256.791513,42.0492101 Z M258.011765,14.2128235 C251.791429,14.2128235 248.041092,17.4704706 246.937185,18.6322773 L246.937185,15.0103025 L237.536765,15.0103025 L237.536765,64.7047143 L247.280756,64.7047143 L247.280756,45.3904286 C248.384664,46.5205546 252.265,49.4892521 258.011765,49.4892521 C267.025462,49.4892521 275.31542,43.0176555 275.31542,31.7835798 C275.31542,20.0333277 266.190294,14.2128235 258.011765,14.2128235 Z M206.363529,28.0856807 C206.637185,25.8226975 209.038361,21.2710588 214.95937,21.2710588 C221.552773,21.2710588 222.620084,26.2285378 222.777941,28.0856807 L206.363529,28.0856807 Z M214.95937,14.2128235 C204.061218,14.2128235 196.658866,21.8904706 196.658866,31.9195882 C196.658866,41.9481597 204.150798,49.4892521 215.302941,49.4892521 C226.455084,49.4892521 231.209916,41.8826134 231.209916,41.8826134 L224.107437,37.288916 C224.107437,37.288916 221.681681,42.0470252 215.370672,42.0470252 C208.871765,42.0470252 206.256471,36.7175714 206.256471,34.6829076 L232.010126,34.6829076 C232.010126,34.6829076 232.150504,33.211395 232.150504,32.7826134 L232.150504,31.6475714 C232.150504,21.7134958 225.856975,14.2128235 214.95937,14.2128235 Z" id="logo"/>
                          </g>
                      </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
