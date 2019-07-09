import React, { Component, Suspense } from 'react'
import Accordion from './Accordion.jsx'

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
  constructor (props) {
    super(props)

    this.checkSiblings = this.checkSiblings.bind(this)
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
        <div className='main-date--wrap'>
          <div className='main-date'>10 - 11 aвгуста 2019</div>
          <div className='main-date--mutabor'>
            <svg width="100%" height="100%" viewBox="0 0 40 71" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M37.466 0V37.08C36.98 49.962 25.918 54.744 20.022 54.4H19.902C13.632 54.308 4.032 50.476 2.534 37.8V0H0V70.134H2.534V50.358C4.652 51.99 10.866 56.43 19.734 56.43C29.04 56.43 35.496 52.03 37.494 50.362L37.466 56.4H40V0H37.466Z" fill="white"/>
            </svg>
          </div>
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
            <div className='main-collapsible--item' data-trigger='Fields'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='Diagonal' data-desc='Пятый фестиваль Fields собран из кураторских блоков и шоукейсов. Их формированием занимались музыкальные сообщества, звукозаписывающие лейблы и тематические музыкальные медиа:'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='THE WIRE SOUNDSYSTEM'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='NEW NEW WORLD RADIO'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='ORED RECORDINGS'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
              </div>
            </div>
            <div className='main-collapsible--item' data-trigger='РИХТЕРФЕСТ'>
              <div className='main-collapsible--item-text'>
                <span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist22 /</span><span className='main-collapsible--artist'> Artistartist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'>Artist /</span><span className='main-collapsible--artist'> Artist /</span><span className='main-collapsible--artist'> Artistart /</span>
              </div>
            </div>
          </Accordion>
        </Suspense>
      </div>
    )
  }
}
