import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Link from '../helpers/Link'
import Slider from 'react-slick'
import Carousel, { Modal, ModalGateway } from 'react-images'

import history2014_1 from '../assets/2014/s3564.jpg'
import history2014_2 from '../assets/2014/s3593.jpg'
import history2014_3 from '../assets/2014/s3642.jpg'
import history2014_4 from '../assets/2014/s3648.jpg'
import history2014_5 from '../assets/2014/s3684.jpg'
import history2014_6 from '../assets/2014/s3756.jpg'
import history2014_7 from '../assets/2014/s3985.jpg'
import history2014_8 from '../assets/2014/s3877.jpg'
import history2014_9 from '../assets/2014/s3940.jpg'
import history2014_10 from '../assets/2014/s3757.jpg'

import history2015_1 from '../assets/2015/1504947_757340464376406_1381679919568075176_n.jpg'
import history2015_2 from '../assets/2015/1509082_757340171043102_4720349285881380883_n.jpg'
import history2015_3 from '../assets/2015/1970525_757340237709762_5419463760159070346_n.jpg'
import history2015_4 from '../assets/2015/10407274_757340261043093_7853775861903639736_n.jpg'
import history2015_5 from '../assets/2015/11058727_757340284376424_7180374392281188603_n.jpg'
import history2015_6 from '../assets/2015/11702831_757340017709784_3748575309715643114_n.jpg'
import history2015_7 from '../assets/2015/11953231_757340351043084_337065777504997676_n.jpg'
import history2015_8 from '../assets/2015/11954641_757340147709771_9147964476891856882_n.jpg'
import history2015_9 from '../assets/2015/11954657_757340191043100_1048266910621087750_n.jpg'
import history2015_10 from '../assets/2015/11987017_757339997709786_2675335726089717320_n.jpg'

import history2016_1 from '../assets/2016/14257622_10154588819936385_8791105463555927041_o.jpg'
import history2016_2 from '../assets/2016/14249858_1120401331329339_1433518545623849095_o.jpg'
import history2016_3 from '../assets/2016/14310503_1120401661329306_904858933304630698_o.jpg'
import history2016_4 from '../assets/2016/pr_0aaaa923a7b1aba125498272ef475224.jpg'
import history2016_5 from '../assets/2016/pr_39ca8a2125eed88f8644839358c1de45.jpg'
import history2016_6 from '../assets/2016/GG2A1521.jpg'
import history2016_7 from '../assets/2016/GG2A2213.jpg'
import history2016_8 from '../assets/2016/GG2A2531.jpg'
import history2016_9 from '../assets/2016/14324635_1120401867995952_662339614431447010_o.jpg'
import history2016_10 from '../assets/2016/14242283_1120402141329258_4992477523785390084_o.jpg'

import history2018_1 from '../assets/2018/Filds-6543.jpg'
import history2018_2 from '../assets/2018/Filds-6786.jpg'
import history2018_3 from '../assets/2018/Filds-6916.jpg'
import history2018_4 from '../assets/2018/Filds-7225.jpg'
import history2018_5 from '../assets/2018/Filds-7315.jpg'
import history2018_6 from '../assets/2018/Filds-7561.jpg'
import history2018_7 from '../assets/2018/Filds-7567.jpg'
import history2018_8 from '../assets/2018/Filds-7592.jpg'
import history2018_9 from '../assets/2018/Filds-7658.jpg'
import history2018_10 from '../assets/2018/Filds-6567.jpg'

const images = [
  { src: history2014_1 },
  { src: history2014_2 },
  { src: history2014_3 },
  { src: history2014_4 },
  { src: history2014_5 },
  { src: history2014_6 },
  { src: history2014_7 },
  { src: history2014_8 },
  { src: history2014_9 },
  { src: history2015_1 },
  { src: history2015_2 },
  { src: history2015_3 },
  { src: history2015_4 },
  { src: history2015_5 },
  { src: history2015_6 },
  { src: history2015_7 },
  { src: history2015_8 },
  { src: history2015_9 },
  { src: history2016_1 },
  { src: history2016_2 },
  { src: history2016_3 },
  { src: history2016_4 },
  { src: history2016_5 },
  { src: history2016_6 },
  { src: history2016_7 },
  { src: history2016_8 },
  { src: history2016_9 },
  { src: history2018_1 },
  { src: history2018_2 },
  { src: history2018_3 },
  { src: history2018_4 },
  { src: history2018_5 },
  { src: history2018_6 },
  { src: history2018_7 },
  { src: history2018_8 },
  { src: history2018_9 },
]

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
      variableHeight: true,
    }

    return (
      <div className='history-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | History</title>
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <div className='history-inner'>
          <div className='history-slider--wrap'>
            <div className='history-slider'>
              <Slider {...settings}>
                <div className='about-text--slider-item'>
                  <img alt='placeholder' src={history2014_10}/>
                </div>
                <div className='about-text--slider-item'>
                  <img alt='placeholder' src={history2015_10}/>
                </div>
                <div className='about-text--slider-item'>
                  <img alt='placeholder' src={history2016_10}/>
                </div>
                <div className='about-text--slider-item'>
                  <img alt='placeholder' src={history2018_10}/>
                </div>
              </Slider>
            </div>
          </div>
          <div className='history-text--wrap'>
            <div className='history-text--title'>История</div>
            <div className='history-text--self'>
              <div className='history-text--block'>
                <div className='history-text--year'>2014</div>
                <p>12-13 июля | Парк искусств «Музеон»</p>
                <p>Фестиваль Fields пришел в Москву в 2014 году. Местом проведения стал парк искусств «Музеон», совсем недавно прошедший этап реновации. Получивший поддержку московского Департамента Культуры, фестиваль поставил перед собой амбициозную цель — реформировать сложившуюся практику городских мероприятий, сделав упор на новое и неизведанное. Сохраняя свободный вход для всех желающих, фестиваль предложил горожанам окунуться в мир изобретательной музыки и авангарда.</p>
                <p>Описывая идею первого выпуска, фестиваль ссылался на слоган культового британского журнала об авангардной музыке The Wire: «Adventures In Sound And Music» («Приключения в звуке и музыке»). Хедлайнерами фестиваля стали берлинский неоклассический пианист Hauschka, исландская виолончелистка Хильдур Гуднадоттир (Hildur Guðnadóttir), редкое трио американского композитора-минималиста Шарлеманя Палестина, финского нойз-импровизатора Мики Вайнио и бельгийского перкуссиониста Эрика Тилеманса, а также британский мультиинструменталист Talvihorros.</p>
                <p>Локальную сцену представили не менее важные герои: Антон Маскелиаде, новосибирский эмбиент-фолк-проект Foresteppe, екатеринбургская группа «4 Позиции Бруно», московский фри джаз бэнд «Бром» и многие другие.</p>
                <div className='history-text--pictures-wrap'>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(0)} >
                    <img alt='2014' src={history2014_1} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(1)} >
                    <img alt='2014' src={history2014_2} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(2)} >
                    <img alt='2014' src={history2014_3} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(3)} >
                    <img alt='2014' src={history2014_4} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(4)} >
                    <img alt='2014' src={history2014_5} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(5)} >
                    <img alt='2014' src={history2014_6} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(6)} >
                    <img alt='2014' src={history2014_7} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(7)} >
                    <img alt='2014' src={history2014_8} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(8)} >
                    <img alt='2014' src={history2014_9} />
                  </div>
                </div>
              </div>
              <div className='history-text--block'>
                <div className='history-text--year'>2015</div>
                <p>5 сентября | Парк искусств «Музеон»</p>
                <p>Второй выпуск фестиваля ознаменовал новый этап: с 2015 года Fields стал частью культурно-развлекательной программы, приуроченной ко Дню города Москвы. Ровно на один день парк искусств «Музеон» превратился в поле для звуковых экспериментов, а программа фестиваля разрослась до трех независимых сцен.</p>
                <p>На главной сцене состоялись выступления британского фолк-композитора Джеймса Блэкшо, норвежского фьюжн-гитариста Стайана Урхайма, российской электронной дивы Ishome и многих других. Знаковой премьерой стало выступление британского дуэта patten, который представил эпическое аудиовизуальное шоу с лазерами.</p>
                <p>Важным событием стала экспериментальная программа фестиваля, состоявшаяся на отдельной сцене. Британский электронный авангардист Марк Фелл представил совместную программу с итальянским виолончелистом Сандро Муссидой, а берлинский музыкант и звукоинженер Рашад Беккер представил свой модулярный лайв-перформанс.</p>
                <p>На третьей сцене состоялся отдельный шоукейс лейбла Fancy Music, который представил срез современного российского джаза.</p>
                <div className='history-text--pictures-wrap'>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(9)}>
                    <img alt='2015' src={history2015_1} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(10)}>
                    <img alt='2015' src={history2015_2} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(11)}>
                    <img alt='2015' src={history2015_3} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(12)}>
                    <img alt='2015' src={history2015_4} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(13)}>
                    <img alt='2015' src={history2015_5} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(14)}>
                    <img alt='2015' src={history2015_6} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(15)}>
                    <img alt='2015' src={history2015_7} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(16)}>
                    <img alt='2015' src={history2015_8} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(17)}>
                    <img alt='2015' src={history2015_9} />
                  </div>
                </div>
              </div>
              <div className='history-text--block'>
                <div className='history-text--year'>2016</div>
                <p>9 сентября | Парк искусств «Музеон», Сад Баумана</p>
                <p>Третий выпуск фестиваля не стал ограничиваться одним парком — программа фестиваля распределилась равномерно между уже традиционным «Музеоном» и более камерным Садом Баумана.</p>
                <p>В рамках основной программы фестиваля в «Музеоне» состоялось несколько знаковых премьер. Аргентинский электронный музыкант Murcof и французская пианистка Ванесса Вагнер исполнили интерпретации работ композиторов 20 века: от Эрика Сати и Арво Пярта до Брайана Ино и Aphex Twin. Впервые в России выступил легендарный фолк-музыкант Майк Купер, представивший свою лайв-программу с электроникой. Лондонский продюсер Heatsick представил свое видение лоуфайного хауса, исполнив живой перформанс лишь на одном синтезаторе Casio и мараканах.</p>
                <p>Тем временем в Саду Баумана состоялась камерная программа Piano FIelds, ориентированная на передовую фортепианную музыку. Здесь выступили американский джазовый пианист Джейми Сафт, французский эмбиент-музыкант Сильвэ Шово, неоклассический пианист Миша Мищенко, композиторы-минималисты Владимир Мартынов и Петру Айду.</p>
                <div className='history-text--pictures-wrap'>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(18)}>
                    <img alt='2016' src={history2016_1} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(19)}>
                    <img alt='2016' src={history2016_2} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(20)}>
                    <img alt='2016' src={history2016_3} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(21)}>
                    <img alt='2016' src={history2016_4} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(22)}>
                    <img alt='2016' src={history2016_5} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(23)}>
                    <img alt='2016' src={history2016_6} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(24)}>
                    <img alt='2016' src={history2016_7} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(25)}>
                    <img alt='2016' src={history2016_8} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(26)}>
                    <img alt='2016' src={history2016_9} />
                  </div>
                </div>
              </div>
              <div className='history-text--block'>
                <div className='history-text--year'>2018</div>
                <p>9 сентября | Парк Горького</p>
                <p>После паузы в год фестиваль Fields вернулся. В очередной раз он предложил горожанам альтернативный формат Дня города, а локацией фестиваля на этот раз стал главное городское пространство для культуры и отдыха — Парк Горького.</p>
                <p>Четвертый выпуск фестиваля Fields с подстрочником Open Borders стирал всевозможные границы — географические, стилистические, культурные и субкультурные. Фолк через призму рейва, стадионный рок на игрушечных инструментах, электронная музыка в интерпретации академистов, техно на ударной установке из 60 барабанов и нью-эйдж 21-го века. Среди главных привозных актов оказалось выступления американской легенды эмбиента Laraaji, а также египетского музыканта и клавишника Ислам Чипси, который вместе со своей группой представил собственное видение стиля электро-чааби.</p>
                <p>Российскую сцену представили не менее важные проекты. На фестивале состоялась внезапная коллаборация одного из главных российских техно-диджеев Никиты Забелина и композитора, правнука основателя терменвокса Петра Термена. Ученый-химик Алексей Бобровский исполнил акустический техно-перформанс на гигантской ударной установке, а проект АДМИ представил лайв на детских игрушках. Ансамбль академических музыкантов Kymatic исполнил пьесы современных электронных музыкантов, а трио Fogh Depot разрушило границы между джазом, неоклассикой и электроникой.</p>
                <div className='history-text--pictures-wrap'>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(27)}>
                    <img alt='2018' src={history2018_1} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(28)}>
                    <img alt='2018' src={history2018_2} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(29)}>
                    <img alt='2018' src={history2018_3} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(30)}>
                    <img alt='2018' src={history2018_4} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(31)}>
                    <img alt='2018' src={history2018_5} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(32)}>
                    <img alt='2018' src={history2018_6} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(33)}>
                    <img alt='2018' src={history2018_7} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(34)}>
                    <img alt='2018' src={history2018_8} />
                  </div>
                  <div className='history-text--pictures-single' onClick={ev => this.toggleModal(35)}>
                    <img alt='2018' src={history2018_9} />
                  </div>
                </div>
              </div>
            </div>
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
