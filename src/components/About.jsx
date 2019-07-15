import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { YMaps, Map, Placemark } from "react-yandex-maps"
import Link from '../helpers/Link'

import placeholder from '../assets/placeholder.png'

export default class extends Component {
  componentDidMount () {}

  render () {
    return (
      <div className='about-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | About</title>
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <div className='about-inner'>
          <div className='about-title--wrap'>
            <div className='about-title--name'>Fields <br/>2019</div>
            <div className='about-title--date'>10 — 11 августа</div>
          </div>
          <div className='about-text--wrap'>
            <div className='about-text--mutabor'>
              <svg width="100%" height="100%" viewBox="0 0 28 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.2262 0V27.4925C25.886 37.0437 18.1426 40.5893 14.0154 40.3342H13.9314C9.5424 40.266 2.8224 37.4248 1.7738 28.0264V0H0V52H1.7738V37.3373C3.2564 38.5474 7.6062 41.8393 13.8138 41.8393C20.328 41.8393 24.8472 38.577 26.2458 37.3403L26.2262 41.8171H28V0H26.2262Z" fill="black"/>
              </svg>
            </div>
            <div className='about-text--self'>
              <p>Москва, <br/>Шарикоподшипниковская ул, <br/>д. 13, с32</p>
              <p>Пятый выпуск фестиваля изобретательной музыки Fields пройдет в новом пространстве команд Arma и «Рабица» — Mutabor. Его программа охватит временной интервал в два дня и одну ночь, а само действо развернется на трех параллельных сценах.</p>
              <p>В программе: десяток с лишним зарубежных гостей, свыше 30 живых выступлений, долгожданные российские премьеры и внезапные коллаборации. Кураторское начало, как и прежде, превалирует над трендами: важная роль на фестивале Fields отводится неочевидным героям независимой сцены и серым кардиналам авангарда.</p>
              <div className='about-text--slider-wrap'>
                <div className='about-text--slider'></div>
                <div className='about-text--slider-desc'>
                  <div className='about-text--slider-desc-top'>Описание/ Копирайт</div>
                  <div className='about-text--slider-desc-bottom'>Photo Description / Copyright</div>
                </div>
              </div>
              <p>В этом году, помимо основной программы, фестиваль включает кураторские блоки и шоукейсы, равномерно распыленные по программной сетке. За их формирование отвечают музыкальные сообщества, звукозаписывающие лейблы и тематические музыкальные медиа: Diagonal Records, The Wire Soundsystem, Рихтерфест, Ored Recordings, New New World Radio.</p>
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
          <div className='about-map--wrap'>
            <YMaps>
              <Map
                width='100%'
                height='100%'
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
                <svg width="92" height="35" viewBox="0 0 92 35" fill="none" xmlns="http://www.w3.org/2000/svg">
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
