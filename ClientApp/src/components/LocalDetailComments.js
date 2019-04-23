import React, { Component } from 'react'
import axios from 'axios'

class LocalDetailComments extends Component {
  state = {
    comments: []
  }

  componentDidMount() {
    this.getComments()
  }

  getComments = () => {
    axios.get(`/api/Comment/LocalId/${this.props.idLocal}`).then(resp => {
      console.log(resp.data)
      this.setState({ comments: resp.data })
    })
  }

  render() {
    return (
      <div className="comment-list">
        <h2>Comments</h2>
        <ul>
          {this.state.comments.map((m, i) => {
            return <li key={i}> {m.description} </li>
          })}
        </ul>
      </div>
    )
  }
}

export default LocalDetailComments
