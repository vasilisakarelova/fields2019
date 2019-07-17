import React, { Component, Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet'
import page from 'page'
import * as css from 'classnames'

import Header from './components/Header.jsx'
import HeaderMob from './components/HeaderMob.jsx'
import Footer from './components/Footer.jsx'
const Main = lazy(() => import('./components/Main.jsx'))
const About = lazy(() => import('./components/About.jsx'))
const Partners = lazy(() => import('./components/Partners.jsx'))
const Lineup = lazy(() => import('./components/Lineup.jsx'))
const Tickets = lazy(() => import('./components/Tickets.jsx'))
const History = lazy(() => import('./components/History.jsx'))

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

  initRouting () {
    //page.base('/new')

    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Main />
      })

      this.openMobMenu(false)
    })

    page('/about', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <About />
      })

      this.openMobMenu(false)
    })

    page('/partners', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Partners />
      })

      this.openMobMenu(false)
    })

    page('/lineup', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Lineup />
      })

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
        container: <History />
      })

      this.openMobMenu(false)
    })

    page()
  }

  openMobMenu (isOpen) {
    this.setState({
      openMobMenu: isOpen
    })
  }

  componentDidMount() {
    this.initRouting()
  }

  render() {
    return (
      <div className={css('base-container', {'at-home': this.state.route === '/'})}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields</title>
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <Header openMobMenu={this.state.openMobMenu} />
        <HeaderMob openMobMenu={this.openMobMenu} isOpen={this.state.openMobMenu} />
        <Suspense fallback={ <div>loading...</div> }>
          { this.state.container }
        </Suspense>
        <Footer />
      </div>
    );
  }
}

export default App
