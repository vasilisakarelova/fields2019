import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import Link from '../helpers/Link'
import Slider from 'react-slick'

import mutabor1 from '../assets/mutabor1.jpg'
import mutabor2 from '../assets/mutabor2.jpg'
import mutabor3 from '../assets/mutabor3.jpg'
import mutabor4 from '../assets/mutabor4.jpg'
import mutabor5 from '../assets/mutabor5.jpg'
import mutabor6 from '../assets/mutabor6.jpg'
import mutabor7 from '../assets/mutabor7.jpg'

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
      speed: 1000
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
              <p>В программе: десяток с лишним зарубежных гостей, свыше 30 живых выступлений, долгожданные российские премьеры и внезапные коллаборации. Кураторское начало, как и прежде, превалирует над трендами: важная роль на фестивале Fields отводится неочевидным героям независимой сцены и серым кардиналам авангарда.</p>
              <p>В этом году, помимо основной программы, фестиваль включает кураторские блоки и шоукейсы, равномерно распыленные по программной сетке. За их формирование отвечают музыкальные сообщества, звукозаписывающие лейблы и тематические музыкальные медиа: Diagonal Records, The Wire Soundsystem, Рихтерфест, Ored Recordings, New New World Radio.</p>
              <div className='about-text--slider-wrap'>
                <div className='about-text--slider'>
                  <Slider {...settings}>
                    <div className='about-text--slider-item'>
                      <img alt='placeholder' src={mutabor1}/>
                    </div>
                    <div className='about-text--slider-item'>
                      <img alt='placeholder' src={mutabor2}/>
                    </div>
                    <div className='about-text--slider-item'>
                      <img alt='placeholder' src={mutabor3}/>
                    </div>
                    <div className='about-text--slider-item'>
                      <img alt='placeholder' src={mutabor4}/>
                    </div>
                    <div className='about-text--slider-item'>
                      <img alt='placeholder' src={mutabor5}/>
                    </div>
                    <div className='about-text--slider-item'>
                      <img alt='placeholder' src={mutabor6}/>
                    </div>
                    <div className='about-text--slider-item'>
                      <img alt='placeholder' src={mutabor7}/>
                    </div>
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
          <div className='about-extra-text--wrap'>
            <p>Пятый выпуск фестиваля изобретательной музыки Fields пройдет в новом пространстве команд Arma и «Рабица» — Mutabor. Его программа охватит временной интервал в два дня и одну ночь, а само действо развернется на трех параллельных сценах.</p>
          </div>
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
