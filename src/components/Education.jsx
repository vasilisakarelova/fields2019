import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from '../helpers/Link'

import img01 from '../assets/education/01.jpg'
import img02 from '../assets/education/02.jpg'
import img03 from '../assets/education/03.jpg'
import img04 from '../assets/education/04.jpg'

import og from '../assets/og.png'

export default class extends Component {
  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='artist-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | Education</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
          <meta property="og:image:width" content="1842" />
          <meta property="og:image:height" content="976" />
          <meta property="og:image" content={og} />
          <meta property="og:title" content="Education" />
        </Helmet>
        <div className='artist-inner at-education'>
          <div className='history-title--wrap'>Образовательная программа Fields x Moscow Music School</div>
          <div className='history-text--paragraphs'>
            <p>Fields продолжает расширяться и вместе с Moscow Music School запускает серию образовательных мероприятий. С 6 по 9 августа в Moscow Music School пройдут лекции с музыкантами, диджеями и журналистами. Специалисты индустрии расскажут о сорока годах развития главного издания об авангардной музыке — The Wire, истории первого бесконтактного инструмента терменвокса, взаимодействии человека и машины, а также музыкальном времени в цифровую эпоху.</p>
          </div>
          <div className='artist-header'>
            <div className='artist-header--name'>Mechanical Techno, встреча с Грэмом Даннином (UK)</div>
            <div className='artist-header--divider'></div>
            <div className='artist-header--info artist-header--date'>
              <span className='artist-header--info-title'>Дата<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>06 Августа 2019</span>
            </div>
            <div className='artist-header--info artist-header--time'>
              <span className='artist-header--info-title'>Время<br/>приведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>19:30</span>
            </div>
            <div className='artist-header--info artist-header--place'>
              <span className='artist-header--info-title'>Место<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>Нижняя Сыромятническая, д. 10, строение 9, вход В, 4 этаж</span>
            </div>
          </div>
          <div className='artist-body'>
            <div className='artist-body--img'>
              <div className='artist-body--img-wrap'>
                <img alt='Образовательная программа Fields: Петр Термен о терменвоксе и 100 годах музыки из воздух' src={img01} />
              </div>
            </div>
            <div className='artist-body--desc'>
              <p>Грэм Даннин — лондонский звуковой художник, чьи работы представляют что-то среднее между инсталляциями и звуковыми перформансами. Во время выступлений Грэм в ручном режиме управляет различными механизмами и погружает зрителя в состояние гипноза: привычные процессы электронной музыки на глазах обретают телесное воплощение.</p>
              <p>Одна из последних работ Грэма — агрегат под названием Mechanical Techno, представляющий собой увесистую тернтейбл-конструкцию, которая позволяет воспроизводить одновременно до семи виниловых пластинок. При этом пластинки также выполняют роль вспомогательного триггера: во время каждого оборота они задевают микрофоны или приводят в действие ударные палочки.</p>
              <p>На лекции Грэм поговорит о механическом техно и своих принципах работы.</p>
              <p><a className='education-register--link' href='https://moscowmusicschool.ru/events/145724/' target='_blank' rel="noopener noreferrer"><b className='underline'></b>Регистрация на сайте MMS</a></p>
            </div>
          </div>
          <div className='artist-header'>
            <div className='artist-header--name'>Петр Термен о терменвоксе и 100 годах музыки из воздуха</div>
            <div className='artist-header--divider'></div>
            <div className='artist-header--info artist-header--date'>
              <span className='artist-header--info-title'>Дата<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>07 Августа 2019</span>
            </div>
            <div className='artist-header--info artist-header--time'>
              <span className='artist-header--info-title'>Время<br/>приведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>19:30</span>
            </div>
            <div className='artist-header--info artist-header--place'>
              <span className='artist-header--info-title'>Место<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>Нижняя Сыромятническая, д. 10, строение 9, вход В, 4 этаж</span>
            </div>
          </div>
          <div className='artist-body'>
            <div className='artist-body--img'>
              <div className='artist-body--img-wrap'>
                <img alt='Петр Термен о терменвоксе и 100 годах музыки из воздуха' src={img02} />
              </div>
            </div>
            <div className='artist-body--desc'>
              <p>В этом году первому бесконтактному музыкальном инструменту — терменвоксу — исполняется 100 лет. Именно с него принято отсчитывать историю электронной музыки во всем мире.</p>
              <p>Лекцию об инструменте проведет Петр Термен — композитор, правнук основателя терменвокса. Петр — автор цикла лекций об истории инструмента и создатель целого ряда творческих и просветительских проектов. Среди последних активностей артиста — выступление на конференции «Яндекса» с музыкой, созданной нейросетью, партия терменвокса для ролика на десятилетие «ВКонтакте», а также создание музыки для фильма о русском авангарде для Центра Помпиду в Париже.</p>
              <p><a className='education-register--link' href='https://moscowmusicschool.ru/events/145731/' target='_blank' rel="noopener noreferrer"><b className='underline'></b>Регистрация на сайте MMS</a></p>
            </div>
          </div>
          <div className='artist-header'>
            <div className='artist-header--name'>Четыре десятилетия журнала The Wire</div>
            <div className='artist-header--divider'></div>
            <div className='artist-header--info artist-header--date'>
              <span className='artist-header--info-title'>Дата<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>08 Августа 2019</span>
            </div>
            <div className='artist-header--info artist-header--time'>
              <span className='artist-header--info-title'>Время<br/>приведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>19:30</span>
            </div>
            <div className='artist-header--info artist-header--place'>
              <span className='artist-header--info-title'>Место<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>Нижняя Сыромятническая, д. 10, строение 9, вход В, 4 этаж</span>
            </div>
          </div>
          <div className='artist-body'>
            <div className='artist-body--img'>
              <div className='artist-body--img-wrap'>
                <img alt='Четыре десятилетия журнала The Wire' src={img03} />
              </div>
            </div>
            <div className='artist-body--desc'>
              <p>Журнал The Wire: Adventures In Modern Music существует с 1982 года, но по сей день остается главным музыкальным вестником для тех, кто жаждет новых звуковых впечатлений. </p>
              <p>Главный редактор издания Крис Бон (aka Biba Kopf), старейший сотрудник журнала Шэйн Вулман (также выступающий контрибьютором NNWR, NTS и Resonance FM) и журналистка Эмили Бик прилетят в Москву втроем. Они расскажут о сорока годах существования журнала и поставят треки, которые сопровождали журнали на протяжении времени его существования.</p>
              <p><a className='education-register--link' href='https://moscowmusicschool.ru/events/145733/' target='_blank' rel="noopener noreferrer"><b className='underline'></b>Регистрация на сайте MMS</a></p>
            </div>
          </div>
          <div className='artist-header'>
            <div className='artist-header--name'>Лекция пионера сэмплирования Карла Стоуна (USA)</div>
            <div className='artist-header--divider'></div>
            <div className='artist-header--info artist-header--date'>
              <span className='artist-header--info-title'>Дата<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>09 Августа 2019</span>
            </div>
            <div className='artist-header--info artist-header--time'>
              <span className='artist-header--info-title'>Время<br/>приведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>19:30</span>
            </div>
            <div className='artist-header--info artist-header--place'>
              <span className='artist-header--info-title'>Место<br/>проведения</span>
              <span className='artist-header--info-divider'>
                <svg width="2" height="24" viewBox="0 0 2 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 24V0" stroke="white"/>
                </svg>
              </span>
              <span className='artist-header--info-self'>Нижняя Сыромятническая, д. 10, строение 9, вход В, 4 этаж</span>
            </div>
          </div>
          <div className='artist-body'>
            <div className='artist-body--img'>
              <div className='artist-body--img-wrap'>
                <img alt='Четыре десятилетия журнала The Wire' src={img04} />
              </div>
            </div>
            <div className='artist-body--desc'>
              <p>Появившись в середине прошлого века, сэмплинг успел проделать путь от академического авангарда до хип-хопа и рейва. Американский композитор Карл Стоун сыграл одну из важнейших ролей в этом процессе, сократив до минимума дистанцию между консерваторскими экспериментами и современной электронной музыкой. Влияние Карла впоследствии признали такие артисты, как Boards of Canada и Oval, а издание Village Voice назвало его «одним из лучших американских композиторов на сегодняшний день».</p>
              <p>Во время лекции Карл расскажет об изменении подхода к музыкальному времени в цифровую эпоху. Свою лекцию он сопроводит демонстрацией живого программирования.</p>
              <p><a className='education-register--link' href='https://moscowmusicschool.ru/events/145741/' target='_blank' rel="noopener noreferrer"><b className='underline'></b>Регистрация на сайте MMS</a></p>
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
      </div>
    )
  }
}
