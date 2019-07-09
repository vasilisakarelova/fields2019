import React, { Component } from 'react'
import * as css from 'classnames'
import PropTypes from 'prop-types'
import Collapsible from 'react-collapsible'

import scrollBy from '../helpers/scrollBy.js'

export default class extends Component {
  constructor (props) {
    super(props)

    this.state = {
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

  handleTriggerClick (position) {
    let closeAll = false

    if (this.props.closeable) {
      closeAll = (!this.state.closeAll && position === this.state.openPosition);
    }

    this.setState({
      openPosition: position,
      closeAll: closeAll,
    })

    scrollBy(document.body, this.refs.accordion.offsetTop, 400)
  }

  render () {
    const nodes = this.props.children.map((node, index) => {
      const triggerWhenOpen = (node.props['data-trigger-when-open']) ? node.props['data-trigger-when-open'] : node.props['data-trigger']
      const triggerDisabled = (node.props['data-trigger-disabled']) || false

      return (<Collapsible
                key={"Collapsible"+index}
                handleTriggerClick={this.handleTriggerClick}
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

    return (<div className={this.props.className} ref='accordion'>{nodes}</div>);
  }
}
