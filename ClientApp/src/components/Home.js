import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import homePicture from '../images/homePicture.jpg'

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
      <section className="home-container">
        <div className="main-section">
          <img
            src={homePicture}
            alt="Tim Mossholder on Unsplash"
            height="400"
            width="600"
          />
          <div className="home-section">
            <div className="resume">
              <h1>MIGO!</h1>
              <p>
                Hi friends! I will help you search for places where you can take
                free English classes and improve your speaking skill.
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
    )
  }
}

export default Home
