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
          default: 'Full name'
        },
        telephone: {
          type: 'string',
          title: 'Telephone',
          maxLength: 10,
          minLength: 10,
          pattern: '^[0-9()\\-\\.\\s]+$',
          default: ''
        },
        password: {
          type: 'string',
          title: 'Your password',
          maxLength: 10,
          default: ''
        },
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
          default: 'migo@migo.com'
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
        'ui:help': 'Hint: Make it strong!'
      }
    },
    requestStatus: 0,
    session: {}
  }

  onSubmit = event => {
    axios
      .post('/auth/register', event.formData)
      .then(resp => {
        this.setState({ requestStatus: resp.status, session: resp.data })
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }

  render() {
    return (
      <div>
        <NavigationHome />
        {this.state.requestStatus === 200 ? (
          <div className="alert alert-success" role="alert">
            Migo added successfully. Click it if you would like to go{' '}
            <Link to={`/LogIn`}>Login</Link>.
          </div>
        ) : this.state.requestStatus === 400 ? (
          <div className="alert alert-dangers" role="alert">
            {this.state.requestStatus}
            <p>yrdyyyyy</p>
            <Link to={`/`}>Home</Link>.
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
