import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import NavigationHome from './NavigationHome'

class LocalList extends Component {
  state = {
    searchingWord: this.props.match.params.searchingWord,
    requestStatus: 0,
    locals: []
  }

  componentDidMount() {
    this.getLocals()
  }

  getLocals = () => {
    axios
      .get(`/api/Search/locals?query=${this.state.searchingWord}`)
      .then(resp => {
        this.setState({
          requestStatus: resp.status,
          locals: resp.data.results
        })
        localStorage.setItem('myWord', this.state.searchingWord)
      })
  }
  handleChanged = event => {
    this.setState({ searchingWord: event.target.value })
  }

  render() {
    return (
      <div className="main-LocalList">
        <NavigationHome />
        {/* <h1>List of Places Teach English</h1> */}
        <div className="search-city-section-2">
          <input
            className="text-section"
            type="text"
            placeholder="Enter city or zip code"
            value={this.state.searchingWord}
            onChange={this.handleChanged}
          />
          <button className="button-section" onClick={this.getLocals}>
            Search
          </button>
        </div>
        {this.state.locals.length > 0 && this.state.requestStatus === 200 ? (
          <ul>
            {this.state.locals.map((m, i) => {
              return (
                <li key={i}>
                  <label>
                    <Link to={`/List/Detail/${m.id}`} className="link2">
                      <strong>{m.name.toUpperCase()}</strong>
                    </Link>
                  </label>{' '}
                  <label>
                    {m.address.toUpperCase() +
                      ' ' +
                      m.city.toUpperCase() +
                      ' ' +
                      m.state.toUpperCase() +
                      '-' +
                      m.zipcode}
                  </label>{' '}
                  <label>
                    <Link to={`Volunteer/${m.id}`} className="link2">
                      Apply for volunteer
                    </Link>{' '}
                    |{' '}
                    <Link to={`Comment/${m.id}`} className="link2">
                      Write a comment
                    </Link>
                  </label>
                  &nbsp;
                </li>
              )
            })}
          </ul>
        ) : this.state.requestStatus === 0 ? (
          <div className="alert alert-info" role="alert">
            Migo is loading results...
          </div>
        ) : (
          <div className="alert alert-info" role="alert">
            Migo couldn't find results for you. Click <Link to={`/`}>here</Link>{' '}
            if you would like to go home.
          </div>
        )}
      </div>
    )
  }
}

export default LocalList
