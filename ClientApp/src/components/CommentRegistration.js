import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import NavigationList from './NavigationList'

class CommentRegistration extends Component {
  state = {
    formSchema: {
      title: 'Add a new comment for the place',
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
          default: ''
        },
        active: {
          type: 'boolean',
          title: 'active',
          default: true
        },
        localId: {
          type: 'number',
          title: 'localId',
          default: parseInt(this.props.match.params.idLocal, 10)
        }
      }
    },
    uiSchema: {
      id: { 'ui:widget': 'hidden' },
      active: { 'ui:widget': 'hidden' },
      localId: { 'ui:widget': 'hidden' },
      description: {
        'ui:widget': 'textarea',
        'ui:placeholder': 'A penny for your thought',
        'ui:options': {
          rows: 2
        }
      }
    },
    requestStatus: 0
  }

  onSubmit = event => {
    axios.post('/api/Comment', event.formData).then(resp => {
      this.setState({ requestStatus: resp.status })
    })
  }

  render() {
    return (
      <div>
        <NavigationList />
        {this.state.requestStatus === 201 ? (
          <div className="alert alert-success" role="alert">
            Migo added the comment successfully. Click{' '}
            <Link to={`/List/${localStorage.getItem('myWord')}`}>here</Link> if
            you would like to go to manage places.
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
