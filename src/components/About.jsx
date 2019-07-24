import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import { Helmet } from 'react-helmet'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import Link from '../helpers/Link'
import Slider from 'react-slick'

export default class extends Component {
  constructor (props) {
    super(props)

    const height = (window.innerWidth < 984) ? '100%' : '505px'

    this.state = {
      mapHeight: height
    }
  }

  componentWillMount () {
    window.scrollTo(0, 0)
  }

  componentDidMount () {
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

  render () {
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
      <div className='about-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | About</title>
            <meta name="author" content="Fields & Mutabor" />
            <meta name="copyright" content="Fields & Mutabor" />
        </Helmet>
        <div className='about-inner'>
          <div className='about-title--wrap'>
            <div className='about-title--name'>Fields <br/>2019</div>
          </div>
          <div className='about-text--wrap'>
            <div className='about-text--self'>
              <p>{this.props.data.paragraph2}</p>
              <p>{this.props.data.paragraph3}</p>
              <div className='about-text--slider-wrap'>
                <div className='about-text--slider'>
                  <Slider {...settings}>
                    { this.props.data.slider.map((image,idx) => {
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
          <div className='about-extra-text--wrap' dangerouslySetInnerHTML={{ __html: this.props.data.paragraph1 }}></div>
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
