import React, { Component } from 'react'
import NavigationList from './NavigationList'
class CommentRegistration extends Component {
  render() {
    return (
      <div>
        <NavigationList title="Comment Registration" />
        <div className="comment-registration-section">
          <h2>Comment for Pasadena Church</h2>
          <form action="">
            <div className="form-row">
              <label htmlFor="comment">Comment:</label>
              <input
                type="textarea"
                placeholder="A penny for your thoughts..."
              />
            </div>
          </form>
          <button>Save it!</button>
        </div>
      </div>
    )
  }
}

export default CommentRegistration
