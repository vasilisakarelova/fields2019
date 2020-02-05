import React, { Component, Suspense } from 'react'
import { Helmet } from 'react-helmet'
import Accordion from './Accordion.jsx'

export default class extends Component {
  componentWillMount () {
    window.scrollTo(0, 0)
  }

  render () {
    return (
      <div className='about-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | Lineup</title>
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <div className='about-inner'>
          <Suspense fallback={ <div>loading...</div> }>
            <Accordion className='main-collapsible--wrap' closeable={true} classParentString='main-collapsible--item' preLineupText={this.props.data.preLineupText}>
              { this.props.data.accordion.map((showcase,idx) => {
                  const {name, description, artists} = showcase
                  
                  return (
                    <div className='main-collapsible--item' data-trigger={name} key={idx}>
                      <div className='main-collapsible--item-desc'><p>{description}</p></div>
                      <div className='main-collapsible--item-text'>
                        { artists.map((artist,artistId) => {
                            return <span className='main-collapsible--artist' key={artistId}><a className='main-collapsible--artist-link' target='_blank' rel="noopener noreferrer" href={`${origin}/${artist.url}`}>{artist.name}</a> /</span>
                          })
                        }
                      </div>
                    </div>
                  )
                })
              }
            </Accordion>
          </Suspense>
        </div>
      </div>
    )
  }
}
