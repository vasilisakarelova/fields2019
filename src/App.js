import React, { Component, Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet'
import page from 'page'
import * as css from 'classnames'

import Header from './components/Header.jsx'
import HeaderMob from './components/HeaderMob.jsx'
import Footer from './components/Footer.jsx'
const Main = lazy(() => import('./components/Main.jsx'))
const About = lazy(() => import('./components/About.jsx'))
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

  initRouting (data) {
    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Main data={data.main} />
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
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <Header openMobMenu={this.state.openMobMenu} />
        <HeaderMob openMobMenu={this.openMobMenu} isOpen={this.state.openMobMenu} />
        <Suspense fallback={ <div>loading...</div> }>
          { this.state.container }
        </Suspense>
        <Footer page={this.state.route} />
      </div>
    );
  }
}

export default App
