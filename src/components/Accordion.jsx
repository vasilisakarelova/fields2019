import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Collapsible from 'react-collapsible'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      arrowShowed: false,
      transitionTime: PropTypes.number,
      easing: PropTypes.string,
      startPosition: PropTypes.number,
      classParentString: PropTypes.string,
      onTrigerClick: PropTypes.func,
      closeable: PropTypes.bool,
      children: PropTypes.arrayOf(PropTypes.shape({
        props: PropTypes.shape({
          'data-trigger': PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
          ]).isRequired,
          'data-triggerWhenOpen': PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
          ]),
          'data-triggerDisabled': PropTypes.bool,
        })
      }))
    }

    this.handleTriggerClick = this.handleTriggerClick.bind(this)
  }

  componentDidMount () {
    document.addEventListener('scrolled', (ev) => {
      if (this.refs.arrow === undefined) return

      if (this.refs.arrow.getBoundingClientRect().top <= (window.innerHeight / 2) && !this.state.arrowShowed) {
        this.refs.arrow.classList.add('animate')
        this.setState({
          arrowShowed: true
        })
      }
    })
  }

  handleTriggerClick (position) {
    let closeAll = false

    if (this.props.closeable) {
      closeAll = (!this.state.closeAll && position === this.state.openPosition);
    }

    this.setState({
      openPosition: position,
      closeAll: closeAll
    })
  }

  render () {
    const nodes = this.props.children.map((node, index) => {
      const triggerWhenOpen = (node.props['data-trigger-when-open']) ? node.props['data-trigger-when-open'] : node.props['data-trigger']
      const triggerDisabled = (node.props['data-trigger-disabled']) || false
      
      return (<div>{node}</div>);
    });

    return (
      <div className={this.props.className} ref='accordion' id='lineup'>
        <div className='main-collapsible--desc-wrap' ref='descWrap'>
          <div className='main-collapsible--desc-arrow'>
            <svg className='main-collapsible--desc-arrow-svg' ref='arrow' width="100%" viewBox="0 0 469 105" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M469 0.999999L11.0001 0.999999L11 103.5L0.500003 93" stroke="white"/>
            </svg>
            <svg className='main-collapsible--desc-arrow-svg-mob' ref='arrowMob' width="100%" height="100%" viewBox="0 0 61 165" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 149.832L13 163V0.5H61" stroke="white"/>
            </svg>
          </div>
          <div ref='desc' className='main-collapsible--desc-text'>{this.props.preLineupText}</div>
        </div>
        <div className={`${this.props.className}-inner`}>{nodes}</div>
      </div>
    );
  }
}
