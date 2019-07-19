import React, { Component, Suspense } from 'react'
import Accordion from './Accordion.jsx'

import afisha_mob from '../assets/afisha-mob.png'
import foil from '../assets/foil.png'
import fields from '../assets/fields.png'
import sphere from '../assets/sphere.png'
import balk_left from '../assets/balk-left.png'
import balk_right from '../assets/balk-right.png'
import liquid from '../assets/liquid.png'
import leaf from '../assets/leaf.png'
import splash_tree_right from '../assets/splash_tree_right.png'
import splash_tree_left from '../assets/splash_tree_left.png'
import splash_leaf from '../assets/splash_leaf.png'
import foil_tree_left from '../assets/foil_tree_left.png'
import foil_tree_right from '../assets/foil_tree_right.png'

export default class extends Component {
  state = {
    afishaReady: 0
  }

  constructor (props) {
    super(props)

    this.checkSiblings = this.checkSiblings.bind(this)
    this.setAfishaReady = this.setAfishaReady.bind(this)
  }

  componentWillMount () {
    window.scrollTo(0, 0)
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
    return (
      <div className='main-wrap'>
        <div className='main-image-mob'>
          <div className='main-image-mob--background'></div>
          <img className='main-image-mob--item' alt='afisha' src={afisha_mob} />
        </div>
        <div className='main-image'>
          <img className='main-image--item main-image--foil' alt='foil' src={foil} />
          <img className='main-image--item main-image--fields' alt='fields' src={fields} />
          <img className='main-image--item main-image--sphere' alt='sphere' src={sphere} />
          <img className='main-image--item main-image--balk_left' alt='balk_left' src={balk_left} />
          <img className='main-image--item main-image--balk_right' alt='balk_right' src={balk_right} />
          <img className='main-image--item main-image--liquid' alt='liquid' src={liquid} />
          <img className='main-image--item main-image--leaf' alt='leaf' src={leaf} />
          <img className='main-image--item main-image--splash_tree_right' alt='splash_tree_right' src={splash_tree_right} />
          <img className='main-image--item main-image--splash_tree_left' alt='splash_tree_left' src={splash_tree_left} />
          <img className='main-image--item main-image--splash_leaf' alt='splash_leaf' src={splash_leaf} />
          <img className='main-image--item main-image--foil_tree_left' alt='foil_tree_left' src={foil_tree_left} />
          <img className='main-image--item main-image--foil_tree_right' alt='foil_tree_right' src={foil_tree_right} />
        </div>
        <Suspense fallback={ <div>loading...</div> }>
          <Accordion className='main-collapsible--wrap' closeable={true} classParentString='main-collapsible--item'>
            <div className='main-collapsible--item' data-trigger='Fields' data-extra='Fields — основной кураторский блок фестиваля.'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Senyawa (Индонезия) /</span> <span className='main-collapsible--artist'>SHXCXCHCXSH (Швеция) /</span> <span className='main-collapsible--artist'> Carla Dal Forno (Австралия) /</span> <span className='main-collapsible--artist'> Kemialliset Ystävät (Финляндия) /</span> <span className='main-collapsible--artist'> SSTROM (Швеция) /</span> <span className='main-collapsible--artist'> Vladimir Martynov & Moa Pillar /</span> <span className='main-collapsible--artist'> Ishome /</span> <span className='main-collapsible--artist'> Kedr Livanskiy /</span> <span className='main-collapsible--artist'> Kymatic /</span> <span className='main-collapsible--artist'>ПТУ /</span> <span className='main-collapsible--artist'> Kate NV /</span> <span className='main-collapsible--artist'> Peter Theremin & Benjamin Skepper /</span> <span className='main-collapsible--artist'>Интурист /</span> <span className='main-collapsible--artist'> Bad Zu /</span> <span className='main-collapsible--artist'> Andrey Lee & Viktor Glazunov /</span> <span className='main-collapsible--artist'> X.Y.R. /</span> <span className='main-collapsible--artist'> oqbqbo /</span> <span className='main-collapsible--artist'> Yung Acid /</span> <span className='main-collapsible--artist'> EYWA3 /</span> <span className='main-collapsible--artist'> Narcissi /</span> <span className='main-collapsible--artist'> Salama /</span> <span className='main-collapsible--artist'>Vtgnike /</span> <span className='main-collapsible--artist'> Marzahn /</span> <span className='main-collapsible--artist'> Holy Palms /</span> <span className='main-collapsible--artist'>Алексей Бобровский /</span> <span className='main-collapsible--artist'> Denis Smagin /</span> <span className='main-collapsible--artist'> Broken Composers /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='Ored Recordings' data-extra='Ored Recordings — этнографический проект-лейбл из Кабардино-Балкарии.'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Хава Хамзатова /</span> <span className='main-collapsible--artist'> Заур Нагоев /</span> <span className='main-collapsible--artist'> Jrpjej /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='Рихтерфест' data-extra='Рихтерфест — международный фестиваль экспериментальной и импровизационной музыки, запущенный в Москве в 2014 году.'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Carl Stone (США) /</span> <span className='main-collapsible--artist'> Yussef Abouzeid (Египет) /</span> <span className='main-collapsible--artist'> Алексей Борисов & Максим Елизаров & Дмитрий Лапшин /</span> <span className='main-collapsible--artist'> Sanscreed Kanon /</span> <span className='main-collapsible--artist'> Rites Of Passage /</span> <span className='main-collapsible--artist'> Speedball Trio /</span> <span className='main-collapsible--artist'> Drumutabor (Андрей Ким, Петр Отоцкий, Сергей Болотин, Оксана Григорьева) /</span> <span className='main-collapsible--artist'> Drojji /</span> <span className='main-collapsible--artist'> Петяев-Петяев Квартет /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='Diagonal' data-extra='Diagonal — независимый лондонский лейбл, основанный Оскаром Пауэллом (Powell), представляющий нетривиальную новаторскую электронику клубного формата.'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>HP (Rassell Haswell & Powell) /</span> <span className='main-collapsible--artist'> NHK /</span> <span className='main-collapsible--artist'> Sote /</span>
              </div>
            </div>
          </Accordion>
        </Suspense>
      </div>
    )
  }
}
