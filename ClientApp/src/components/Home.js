import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NavigationMain from './NavigationMain'

class Home extends Component {
  state = {
    searchingWord: '',
    selectedLanguage: ''
  }

  getCurrentLanguageFromHtml = () => {
    return window.google.translate.TranslateElement.getInstance().c
  }

  getCurrentLanguage = () => {
    this.setState({
      selectedLanguage: this.getCurrentLanguageFromHtml()
    })
  }
  handleChanged = event => {
    this.setState({ searchingWord: event.target.value })
  }

  render() {
    return (
      <div>
        <NavigationMain />
        <section className="home-container">
          <div className="main-section">
            <div className="home-section">
              <div className="resume">
                <p>
                  Hi friends, my name is <strong>Migo!</strong> and I will help
                  you search for places where you can take free English classes
                  and improve your speaking skill.
                </p>
              </div>

              <div className="search-city-section">
                <input
                  className="text-section"
                  type="text"
                  placeholder="State, city or zip code"
                  value={this.state.searchingWord}
                  onChange={this.handleChanged}
                />
                <Link
                  to={`List/${
                    this.state.searchingWord === ''
                      ? 'florida'
                      : this.state.searchingWord
                  }`}
                >
                  <button className="button-section">Search</button>
                </Link>
              </div>
              <div className="language-section">
                <div id="google_translate_element" />
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Home
