import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import NavigationList from './NavigationList'

class CommentRegistration extends Component {
  state = {
    formSchema: {
      title: 'Add a new comment',
      type: 'object',
      required: ['description'],
      properties: {
        id: {
          type: 'number',
          title: 'id',
          default: 0
        },
        description: {
          type: 'string',
          title: 'Comment',
          default: 'A penny for your thought'
        },
        active: {
          type: 'boolean',
          title: 'active',
          default: true
        },
        localId: {
          type: 'number',
          title: 'localId',
          default: 1 //parseInt(this.props.match.params.idSearch)
        }
      }
    },
    uiSchema: {
      id: { 'ui:widget': 'hidden' },
      active: { 'ui:widget': 'hidden' },
      localId: { 'ui:widget': 'hidden' },
      description: { 'ui:widget': 'textarea' }
    },
    requestStatus: 0
  }

  onSubmit = event => {
    axios
      .post('https://localhost:5001/api/Comment', event.formData)
      .then(resp => {
        console.log(resp)

        if (resp.status === 201) {
          this.setState({ requestStatus: resp.status })
        }
      })
  }

  render() {
    return (
      <div>
        <NavigationList />
        {this.state.requestStatus === 201 ? (
          <div className="alert alert-success" role="alert">
            It added successfully. Click it if you would like to go{' '}
            <Link to={`/List/${this.props.match.params.idSearch}`}>List</Link>.
          </div>
        ) : (
          <Form
            className="form-section"
            schema={this.state.formSchema}
            uiSchema={this.state.uiSchema}
            onSubmit={this.onSubmit}
          />
        )}
      </div>
    )
  }
}

export default CommentRegistration
