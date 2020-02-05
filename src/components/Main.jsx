import React, { Component, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import LazyLoad from 'react-lazyload'
import Slider from 'react-slick'
import { YMaps, Map, Placemark } from 'react-yandex-maps'

import Link from '../helpers/Link'
import scrollBy from '../helpers/scrollBy.js'
import getBrowser from '../helpers/getBrowser.js'

import afisha_mob from '../assets/site_mobile.png'
import afisha_desk from '../assets/shapka_1920.png'

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
        <div className='partners-title--wrap' id='partners'></div>
        <div className='about-section--name-wrap'>
          <div className='about-section--name is-partners'>ПАРТНЁРЫ ФЕСТИВАЛЯ</div>
        </div>
        <div className='partners-subtitle--wrap'>Официальные партнеры:</div>
        <div className='partners-items--wrap'>
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
            <div className='partners-items--wrap no-padding'>
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
            </div>
          </div>
        </div>
      </div>
    )
  }
}
