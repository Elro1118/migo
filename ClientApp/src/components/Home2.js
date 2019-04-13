import React, { Component } from 'react'
import '../home.css'
import { Link } from 'react-router-dom'

class Home2 extends Component {
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
      <div className="scene_home">
        <section className="home-container">
          <div className="main-section">
            <div className="home-section">
              <div className="resume">
                <h1>MIGO!</h1>
                <p>
                  Hi friends! I will help you search for places where you can
                  take free English classes and improve your speaking skill.
                </p>
              </div>
              <div className="language-section">
                {/* <p className="language-word">Language</p> */}
                <div id="google_translate_element" />
              </div>
              <div className="search-city-section">
                <input
                  className="text-section"
                  type="text"
                  placeholder="Enter city or zip code"
                  value={this.state.searchingWord}
                  onChange={this.handleChanged}
                />
                <Link to={`List/${this.state.searchingWord}`}>
                  <button className="button-section">Search</button>
                </Link>
              </div>
              <div className="logIn-signUp-section">
                <Link to={`LogIn`}>
                  <button className="log-in-button">Log In</button>
                </Link>
                <Link to={`User`}>
                  <button className="sign-up-button">Sign Up</button>
                </Link>
              </div>
              {/* DO NOT DELETE IT */}
              {/* <p>{this.state.selectedLanguage}</p>
        <button onClick={this.getCurrentLanguage}>get current language+</button> */}
              {/* DO NOT DELETE IT */}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Home2
