import React, { Component } from 'react'
import NavigationHome from './NavigationHome'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'

class UserRegistration extends Component {
  state = {
    formSchema: {
      title: 'Sign Up',
      type: 'object',
      required: ['name', 'telephone', 'email', 'password'],
      properties: {
        id: {
          type: 'number',
          title: 'id',
          default: 0
        },
        name: {
          type: 'string',
          title: 'Name',
          maxLength: 150,
          minLength: 1,
          default: ''
        },
        telephone: {
          type: 'string',
          title: 'Telephone',
          maxLength: 12,
          minLength: 12,
          pattern: '^[0-9()\\-\\.\\s]+$',
          default: ''
        },

        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
          default: ''
        },
        password: {
          type: 'string',
          title: 'Password',
          minLength: 10,
          default: ''
        },
        active: {
          type: 'boolean',
          title: 'active',
          default: true
        },
        rolId: {
          type: 'number',
          title: 'rolId',
          default: 1
        }
      }
    },
    uiSchema: {
      id: { 'ui:widget': 'hidden' },
      active: { 'ui:widget': 'hidden' },
      rolId: { 'ui:widget': 'hidden' },
      password: {
        'ui:widget': 'password',
        'ui:help': 'Hint: Make it strong!',
        'ui:placeholder': 'Enter password'
      },
      name: { 'ui:placeholder': 'Enter name' },
      telephone: { 'ui:placeholder': 'Enter telephone' },
      email: { 'ui:placeholder': 'Enter email' }
    },
    requestStatus: 0,
    session: {}
  }

  resetPage = () => {
    this.setState({ requestStatus: 0 })
  }

  onSubmit = event => {
    axios
      .post('/auth/register', event.formData)
      .then(resp => {
        this.setState({ requestStatus: resp.status, session: resp.data })
      })
      .catch(error => {
        this.setState({
          requestStatus: error.response.status,
          message: error.response.data.email
        })
      })
  }

  render() {
    return (
      <div>
        <NavigationHome />
        {this.state.requestStatus === 200 ? (
          <div className="alert alert-success" role="alert">
            Migo created your user successfully. Click{' '}
            <Link to={`/LogIn`}>here</Link> if you would like to go log in.
          </div>
        ) : this.state.requestStatus === 400 ? (
          <div class="alert alert-danger" role="alert">
            {this.state.message.toUpperCase()}. If you would like to try again,
            click
            <button type="button" onClick={this.resetPage} class="btn btn-link">
              here.
            </button>
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

export default UserRegistration
