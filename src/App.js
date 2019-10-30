import React, { Component, Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet'
import page from 'page'
import * as css from 'classnames'

import Header from './components/Header.jsx'
import SimpleHeader from './components/SimpleHeader.jsx'
import HeaderMob from './components/HeaderMob.jsx'
import Footer from './components/Footer.jsx'

import og from './assets/og.png'

const Main = lazy(() => import('./components/Main.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const Tickets = lazy(() => import('./components/Tickets.jsx'))
const History = lazy(() => import('./components/History.jsx'))
const Artist = lazy(() => import('./components/Artist.jsx'))
const Timeline = lazy(() => import('./components/Timeline.jsx'))
const Education = lazy(() => import('./components/Education.jsx'))
const Ishome = lazy(() => import('./components/Ishome.jsx'))

class App extends Component {
  state = {
    container: null,
    openMobMenu: false
  }

  constructor (props) {
    super(props)

    this.initRouting = this.initRouting.bind(this)
    this.openMobMenu = this.openMobMenu.bind(this)
  }

  initRouting (data) {
    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Main data={data.main} about={data.about} />
      })

      this.openMobMenu(false)
    })

    page('/about', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <About data={data.about} />
      })

      this.openMobMenu(false)
    })

    page('/ishome', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Ishome data={data.about} />
      })

      this.openMobMenu(false)
    })

    page('/partners', (ctx, next) => {
      page.redirect('/#partners')

      this.openMobMenu(false)
    })

    page('/lineup', (ctx, next) => {
      page.redirect('/#lineup')

      this.openMobMenu(false)
    })

    page('/tickets', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Tickets />
      })

      this.openMobMenu(false)
    })

    page('/history', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <History data={data.history} />
      })

      this.openMobMenu(false)
    })

    page('/timeline', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Timeline data={data.artists} showcases={data.main.accordion} />
      })

      this.openMobMenu(false)
    })

    page('/education', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Education />
      })

      this.openMobMenu(false)
    })

    data.artists.map((artist, idx) => {
      page(`/${artist.url}`, (ctx, next) => {
        this.setState({
          route: ctx.path,
          container: <Artist data={artist} />
        })

        this.openMobMenu(false)
      })
    })

    page()
  }

  openMobMenu (isOpen) {
    this.setState({
      openMobMenu: isOpen
    })
  }

  componentDidMount() {
    this.initRouting(this.props.data)
  }

  render() {
    return (
      <div className={css('base-container', {'at-home': this.state.route === '/'})}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
          <meta property="og:image:width" content="1842" />
          <meta property="og:image:height" content="976" />
          <meta property="og:image" content={og} />
          <meta property="og:title" content="Fields" />
        </Helmet>
        { this.state.route !== '/ishome' && <Header openMobMenu={this.state.openMobMenu} /> }
        { this.state.route === '/ishome' && <SimpleHeader openMobMenu={this.state.openMobMenu} /> }
        { this.state.route !== '/ishome' && <HeaderMob openMobMenu={this.openMobMenu} isOpen={this.state.openMobMenu} /> }
        <Suspense fallback={ <div>loading...</div> }>
          { this.state.container }
        </Suspense>
        { this.state.route !== '/ishome' && <Footer page={this.state.route} /> }
      </div>
    );
  }
}

export default App
