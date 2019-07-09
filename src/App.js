import React, { Component, Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet'
import page from 'page'

import Header from './components/Header.jsx'
const Main = lazy(() => import('./components/Main.jsx'))

class App extends Component {
  state = {
    container: null
  }

  constructor (props) {
    super(props)

    this.initRouting = this.initRouting.bind(this)
  }

  initRouting () {
    //page.base('/new')

    page('/', (ctx, next) => {
      this.setState({
        route: ctx.path,
        container: <Main />
      })
    })

    page()
  }

  componentDidMount() {
    this.initRouting()
  }

  render() {
    return (
      <div className="base-container">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | 2019</title>
          <meta name="author" content="Outer Practice" />
          <meta name="description" content="Revolving around website and print matters." />
          <meta name="copyright" content="Outer Practice" />
        </Helmet>
        <Header />
        <Suspense fallback={ <div>loading...</div> }>
          { this.state.container }
        </Suspense>
      </div>
    );
  }
}

export default App
