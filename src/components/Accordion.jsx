import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Collapsible from 'react-collapsible'

import scrollBy from '../helpers/scrollBy.js'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
      desc: null,
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

  handleTriggerClick (position, desc) {
    let closeAll = false

    if (this.props.closeable) {
      closeAll = (!this.state.closeAll && position === this.state.openPosition);
    }

    if (desc !== undefined) {
      setTimeout(() => {
        this.refs.arrow.classList.remove('animateReverse')
        this.refs.arrow.classList.add('animate')
        this.refs.desc.style.opacity = 1
      }, 400)
    } else if ((desc === undefined) && this.refs.arrow.classList.contains('animate')) {
      setTimeout(() => {
        this.refs.arrow.classList.add('animateReverse')
        this.refs.desc.style.opacity = 0
      }, 400)
    }

    this.setState({
      openPosition: position,
      closeAll: closeAll,
      desc: (desc !== undefined) ? desc : null
    })

    scrollBy(document.body, this.refs.accordion.offsetTop, 400)
  }

  render () {
    const nodes = this.props.children.map((node, index) => {
      const triggerWhenOpen = (node.props['data-trigger-when-open']) ? node.props['data-trigger-when-open'] : node.props['data-trigger']
      const triggerDisabled = (node.props['data-trigger-disabled']) || false

      return (<Collapsible
                key={"Collapsible"+index}
                handleTriggerClick={position => this.handleTriggerClick(position, node.props['data-desc'])}
                open={(!this.state.closeAll && this.state.openPosition === index)}
                trigger={node.props['data-trigger']}
                triggerWhenOpen={triggerWhenOpen}
                triggerDisabled={triggerDisabled}
                transitionTime={this.props.transitionTime}
                easing={this.props.easing}
                openedClassName={'is-opened'}
                classParentString={this.props.classParentString}
                accordionPosition={index}>{node}</Collapsible>);
    });

    return (
      <div className={this.props.className} ref='accordion'>
        <div className='main-collapsible--desc-wrap'>
          <div className='main-collapsible--desc-arrow'>
            <svg ref='arrow' width="100%" height="100%" viewBox="0 0 472 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M472 0.499999L14 0.499999L14 42.5L1 29.5" stroke="white"/>
            </svg>
          </div>
          <div ref='desc' className='main-collapsible--desc-text'>{this.state.desc}</div>
        </div>
        <div className={`${this.props.className}-inner`}>{nodes}</div>
      </div>
    );
  }
}
