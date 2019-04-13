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
        <h1>List of Places Teach English</h1>
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
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Address</th>
                  <th>Detail</th>
                  <th>Volunteer</th>
                  <th>Comment</th>
                </tr>
              </thead>
              <tbody>
                {this.state.locals.map((m, i) => {
                  return (
                    <tr key={i}>
                      <td>{m.name.toUpperCase()}</td>
                      <td>
                        {m.address.toUpperCase() +
                          ' ' +
                          m.city.toUpperCase() +
                          ' ' +
                          m.state.toUpperCase() +
                          '-' +
                          m.zipcode}
                      </td>
                      <td>
                        <Link to={`/List/Detail/${m.id}`} className="link">
                          {/* <i className="fas fa-info-circle" /> */}
                          More detail
                        </Link>
                      </td>
                      <td>
                        <Link to={`Volunteer/${m.id}`} className="link">
                          Add
                        </Link>
                      </td>
                      <td>
                        <Link to={`Comment/${m.id}`} className="link">
                          Add
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
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
