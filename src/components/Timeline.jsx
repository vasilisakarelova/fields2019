import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import * as moment from 'moment'
import 'moment/locale/ru'
import og from '../assets/og.png'

moment.locale('ru')

export default class extends Component {
  constructor (props) {
    super(props)

    this.getFormat = this.getFormat.bind(this)
    this.highlightCases = this.highlightCases.bind(this)
  }

  componentWillMount () {
    window.scrollTo(0, 0)
  }

  highlightCases (self, artists) {
    if (self.classList.contains('highlight')) {
      self.classList.remove('highlight')
      artists.map(artist => {
        const domEl = document.querySelector(`[data-url="${artist.url}"]`)
        if (domEl !== null) domEl.classList.remove('highlight')
      })

      return
    }

    const all = document.querySelectorAll('.timeline-table--artist')
    all.forEach(single => {
      single.classList.remove('highlight')
    })

    const allShowcases = document.querySelectorAll('.timeline-header--showcases-single')
    allShowcases.forEach(single => {
      single.classList.remove('highlight')
    })

    self.classList.add('highlight')
    artists.map(artist => {
      const domEl = document.querySelector(`[data-url="${artist.url}"]`)
      if (domEl !== null) domEl.classList.add('highlight')
    })
  }

  getFormat(d){
    const dateFormats = {
      "iso_int" : "YYYY-MM-DD",
      "short_date" : "DD.MM.YYYY",
    }
    for (var prop in dateFormats) {
      if(moment(d, dateFormats[prop],true).isValid()){
         return dateFormats[prop];
      }
    }
    return null
  }

  componentDidMount () {
    const days = document.querySelectorAll('.timeline-table--day-wrap')
    days.forEach((day,dayIdx) => {
      const artists = [].slice.call(day.querySelectorAll('.timeline-table--artist'))
      artists.forEach(artist => {
        const artistColumn = artist.style.gridColumnStart
        const artistRow = artist.style.gridRowStart
        const sideNeighbors = artists.filter(testArtist => {
          return testArtist.style.gridRowStart === artistRow
        })
        const columnNeighbors = artists.filter(testArtist => {
          return testArtist.style.gridColumnStart === artistColumn
        })

        if (artistRow === '1') {
          artist.style.borderTop = 'none'
        }

        if (artistColumn === '2') {
          artist.style.borderLeft = 'none'
        }

        columnNeighbors.forEach(columnNeighbor => {
          if ((parseInt(artistRow) + 1) === parseInt(columnNeighbor.style.gridRowStart)) {
            artist.style.borderBottom = 'none'
          }
        })

        sideNeighbors.forEach(sideNeighbor => {
          if ((parseInt(artistColumn) + 1) === parseInt(sideNeighbor.style.gridColumnStart)) {
            artist.style.borderRight = 'none'
          }
        })
      })

      if (dayIdx === 1) {
        const div = document.createElement('div')
        div.className = 'timeline-table--artist'
        div.style.gridColumn = 5
        div.style.gridRow = '1/3'
        div.style.borderTop = 'none'
        day.appendChild(div)
      }
    })

    const artistsMob = document.querySelectorAll('.timeline-table--dates-artist')
    artistsMob.forEach(artistMob => {
      const id = artistMob.dataset.id
      if (document.getElementById(id) !== null) {
        const row = document.getElementById(id).style.gridRowStart
        artistMob.style.gridRowStart = row
      }
    })
  }

  render () {
    const data = this.props.data
    const showcases = this.props.showcases
    const origin = window.location.origin

    const dates = [...new Set(data.map(item => moment(item.dateOfConcert, this.getFormat(item.dateOfConcert)).format('DD.MM.YYYY')))].sort()
    const stages = [...new Set(data.map(item => item.placeOfConcert))]

    let artistsOnDate = []
    let artistsOnStage = []
    dates.forEach(date => {
      const result = data.filter(artist => {
        const dateFormat = this.getFormat(artist.dateOfConcert)
        const testFormat = this.getFormat(date)

        return moment(artist.dateOfConcert, dateFormat).format(testFormat) === date
      })
      const hours = [...new Set(result.map(item => item.timeOfConcert))]
      artistsOnDate.push(Object.assign({}, {'date': date, 'hours': hours.sort(), 'artists': result}))
    })

    stages.forEach(stage => {
      const result = data.filter(artist => {
        return artist.placeOfConcert === stage
      })
      const hours = [...new Set(result.map(item => Object.assign({}, {[moment(item.dateOfConcert, this.getFormat(item.dateOfConcert)).format('DD')]: item.timeOfConcert}) ))]
      hours.sort((a,b) => Object.keys(a) - Object.keys(b))
      if (stage === '') return
      artistsOnStage.push(Object.assign({}, {'stage': stage, 'hours': hours.sort(), 'artists': result}))
    })

    return (
      <div className='timeline-wrap'>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Fields | Timeline</title>
          <meta name="author" content="Fields & Mutabor" />
          <meta name="copyright" content="Fields & Mutabor" />
          <meta property="og:image:width" content="1842" />
          <meta property="og:image:height" content="976" />
          <meta property="og:image" content={og} />
          <meta property="og:title" content="Timeline" />
        </Helmet>
        <div className='timeline-inner'>
          <div className='timeline-header'>
            <div className='timeline-header--title'>timeline</div>
            <div className='timeline-header--showcases'>
              <div className='timeline-header--showcases-title'>showcases</div>
              <div className='timeline-header--showcases-wrap'>
                { showcases.map((showcase, idx) => {
                    return (
                      <span key={idx} className='timeline-header--showcases-single' onClick={ev => this.highlightCases(ev.target, showcase.artists)}> {showcase.name} /</span>
                    )
                  })
                }
              </div>
            </div>
          </div>
          <div className='timeline-table--wrap is-mobile'>
            { artistsOnStage.map((artistOnStage, idx) => {
                const {stage, hours, artists} = artistOnStage
                const uniqueDays = [...new Set(hours.map(hour => Object.keys(hour)[0]))]
                let daysHours = {}
                uniqueDays.forEach(uniqueDay => {
                  let day = []
                  hours.forEach(hour => {
                    if (hour[uniqueDay] !== undefined) day.push(hour[uniqueDay])
                  })
                  Object.assign(daysHours, {[uniqueDay]: day.sort()})
                })

                return (
                  <div className='timeline-table--stage-block' key={idx}>
                    <div className='timeline-table--stage-name'>{stage}</div>
                    <div className='timeline-table--dates'>10 — 11 августа</div>
                    { Object.keys(daysHours).map((day,daysHoursIdx) =>
                        daysHours[day].map((dayHour, dayHourIdx) => {
                          if (dayHour == '') return null
                          let row = dayHourIdx + 1 + 2
                          if (daysHoursIdx === 1) {
                            const prevday = Object.keys(daysHours)[0]
                            const prevhours = daysHours[prevday].length
                            row = dayHourIdx + 1 + 2 + prevhours
                          }

                          return (
                            <div key={dayHourIdx} id={`${stage}-${day}-${dayHour}`} style={{ gridRow: `${row}`}} className='timeline-table--dates-hour'>{dayHour}</div>
                          )
                        })
                      )
                    }
                    { artists.map((artist, artistMobIdx) => {
                        const id = `${stage}-${moment(artist.dateOfConcert, this.getFormat(artist.dateOfConcert)).format('DD')}-${artist.timeOfConcert}`
                        return (
                          <div key={artistMobIdx} data-id={id} className='timeline-table--dates-artist'>{artist.name}</div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
          <div className='timeline-table--wrap is-desktop'>
            <div className='timeline-table--header'>
              <div className='timeline-table--header-cell'>Время</div>
              <div className='timeline-table--header-cell'>Summer Stage by Jagervibes</div>
              <div className='timeline-table--header-cell'>Hall</div>
              <div className='timeline-table--header-cell'>Medium</div>
              <div className='timeline-table--header-cell'>Garden</div>
            </div>
            { artistsOnDate.map((artistOnDate, idx) => {
                const {date, hours, artists} = artistOnDate

                if (date === 'Invalid date') return null

                const monthDay = moment(date, this.getFormat(date)).format('D MMMM')
                const weekday = moment(date, this.getFormat(date)).format('dddd')

                return (
                  <div className='timeline-table--day-wrap' key={idx}>
                    <div className='timeline-table--dayweek'>
                      <span>{monthDay}</span><span>{weekday}</span>
                    </div>
                    { hours.map((hour,hoursIdx) => {
                        return (
                          <div className='timeline-table--day-hour' key={hoursIdx} data-grid-row={hoursIdx + 1}>{hour}</div>
                        )
                      })
                    }
                    { artists.map((artist, artistIdx) => {
                        const stage = artist.placeOfConcert
                        const time = artist.timeOfConcert
                        let row = hours.indexOf(time) + 1

                        let column = 2

                        switch (true) {
                          case (stage.localeCompare('SUMMER STAGE BY JAGERVIBES', undefined, { sensitivity: 'base' }) === 0):
                            column = 2
                            break;
                          case (stage.localeCompare('hall', undefined, { sensitivity: 'base' }) === 0):
                            column = 3
                            break;
                          case (stage.localeCompare('medium', undefined, { sensitivity: 'base' }) === 0):
                            column = 4
                            break;
                          case (stage.localeCompare('Garden', undefined, { sensitivity: 'base' }) === 0):
                            column = 5
                            break;
                          default:
                            column = 1
                            break
                        }

                        if (column === 1) return null
                        let bottom = (row === hours.length) ? 'none' : '1px solid #fff'

                        if (artist.timeEndOfConcert !== '') {
                          if (row + 1 <= hours.length) {
                            if (artist.url === 'the-wire-soundsystem') {
                              row = `${row}/${row + 4}`
                              bottom = '1px solid #b0b6bb'
                            } else {
                              row = `${row}/${row + 2}`
                            }
                          } else {
                            bottom = '1px solid #b0b6bb'
                          }
                        }

                        if (artist.url === 'the-wire-soundsystem') {}

                        let style = {
                          gridColumn: `${column}`,
                          gridRow: `${row}`,
                          borderBottom: `${bottom}`
                        }
                        let hrefStyle = {}

                        if (artist.timeEndOfConcert !== '') {
                          if (typeof row !== 'number') {
                            style = Object.assign(style, {
                              paddingTop: '28px',
                              alignItems: 'flex-start'
                            })

                            hrefStyle = Object.assign(hrefStyle, {
                              display: 'block',
                              minHeight: '32px',
                              height: 'auto'
                            })
                          }
                        }

                        return (
                          <div className='timeline-table--artist' key={artistIdx} data-url={artist.url} style={style}><a target='_blank' style={hrefStyle} rel="noopener noreferrer" href={`${origin}/${artist.url}`}>{artist.name}</a></div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}
