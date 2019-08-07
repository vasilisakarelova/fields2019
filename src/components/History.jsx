import React, { Component } from 'react'
import LazyLoad from 'react-lazyload'
import { Helmet } from 'react-helmet'
import Link from '../helpers/Link'
import Slider from 'react-slick'
import Carousel, { Modal, ModalGateway } from 'react-images'

import splash01 from '../assets/history01.png'
import splash02 from '../assets/history02.png'

import og from '../assets/og.png'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      currentIndex: 0
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal = (id) => {
    this.setState(state => ({
      modalIsOpen: !state.modalIsOpen,
      currentIndex: id
    }))
  }

  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    const { year2014, year2015, year2016, year2018 } = this.props.data

    const settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 5000,
      speed: 1000,
      variableHeight: true,
    }

    const year1415 = year2014.slider.concat(year2015.slider)
    const year1416 = year1415.concat(year2016.slider)
    const year1418 = year1416.concat(year2018.slider)
    const result = year1418.map(({ url }) => url)

    const images = result.map(url => ({'src': url}))

    return (
      <div className='history-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | History</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
          <meta property="og:image:width" content="1842" />
          <meta property="og:image:height" content="976" />
          <meta property="og:image" content={og} />
          <meta property="og:title" content="History" />
        </Helmet>
        <div className='history-inner'>
          <div className='history-title--wrap'>История</div>
          <div className='history-slider--wrap'>
            <div className='history-slider'>
              <Slider {...settings}>
                { this.props.data.topSlider.map((image, topIdx) => {
                    return (
                      <div className='about-text--slider-item' key={topIdx}>
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
          <div className='history-text--wrap'>
            <div className='history-text--self'>
              <div className='history-text--block'>
                <div className='history-splash--01'>
                  <img src={splash01} alt='liquid splash'/>
                </div>
                <div className='history-text--year'>2014 <span className='date'>{year2014.date}</span><span className='place'>{year2014.place}</span></div>
                <div className='history-text--paragraphs' dangerouslySetInnerHTML={{ __html: year2014.description }}></div>
                <div className='history-text--pictures-wrap'>
                  { year2014.slider.map((image, idx2014) => {
                      return (
                        <div className='history-text--pictures-single' key={idx2014} onClick={ev => this.toggleModal(idx2014)} >
                          <LazyLoad offset={100}>
                            <img alt={image.desc} src={image.url} />
                          </LazyLoad>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='history-text--block'>
                <div className='history-splash--02'>
                  <img src={splash02} alt='liquid splash'/>
                </div>
                <div className='history-text--year'>2015 <span className='date'>{year2015.date}</span><span className='place'>{year2015.place}</span></div>
                <div className='history-text--paragraphs' dangerouslySetInnerHTML={{ __html: year2015.description }}></div>
                <div className='history-text--pictures-wrap'>
                  { year2015.slider.map((image, idx2015) => {
                      return (
                        <div className='history-text--pictures-single' key={idx2015} onClick={ev => this.toggleModal(year2014.slider.length + idx2015)} >
                          <LazyLoad offset={100}>
                            <img alt={image.desc} src={image.url} />
                          </LazyLoad>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='history-text--block'>
                <div className='history-text--year'>2016 <span className='date'>{year2016.date}</span><span className='place'>{year2016.place}</span></div>
                <div className='history-text--paragraphs' dangerouslySetInnerHTML={{ __html: year2016.description }}></div>
                <div className='history-text--pictures-wrap'>
                  { year2016.slider.map((image, idx2016) => {
                      return (
                        <div className='history-text--pictures-single' key={idx2016} onClick={ev => this.toggleModal(year2014.slider.length + year2015.slider.length + idx2016)} >
                          <LazyLoad offset={100}>
                            <img alt={image.desc} src={image.url} />
                          </LazyLoad>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className='history-text--block'>
                <div className='history-text--year'>2018 <span className='date'>{year2018.date}</span><span className='place'>{year2018.place}</span></div>
                <div className='history-text--paragraphs' dangerouslySetInnerHTML={{ __html: year2018.description }}></div>
                <div className='history-text--pictures-wrap'>
                  { year2018.slider.map((image, idx2018) => {
                      return (
                        <div className='history-text--pictures-single' key={idx2018} onClick={ev => this.toggleModal(year2014.slider.length + year2015.slider.length + year2016.slider.length + idx2018)} >
                          <LazyLoad offset={100}>
                            <img alt={image.desc} src={image.url} />
                          </LazyLoad>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
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
        <ModalGateway>
          { this.state.modalIsOpen ? (
            <Modal onClose={this.toggleModal}>
              <Carousel trackProps={{infinite: 'true'}} currentIndex={this.state.currentIndex} views={images} />
            </Modal>
          ) : null}
        </ModalGateway>
      </div>
    )
  }
}
