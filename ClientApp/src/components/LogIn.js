import React, { Component } from 'react'
import NavigationHome from './NavigationHome'
import axios from 'axios'
import Form from 'react-jsonschema-form'

class LogIn extends Component {
  state = {
    formSchema: {
      title: 'Sign In',
      type: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
          default: ''
        },
        password: {
          type: 'string',
          title: 'Your password',
          default: ''
        }
      }
    },
    uiSchema: {
      password: {
        'ui:widget': 'password'
      },
      email: { 'ui:placeholder': 'Enter email' }
    },
    requestStatus: 0,
    message: ''
  }

  resetPage = () => {
    this.setState({ requestStatus: 0 })
  }

  onSubmit = event => {
    axios
      .post('/auth/login', event.formData)
      .then(resp => {
        this.setState({ requestStatus: resp.status })
        localStorage.setItem('myUserId', parseInt(resp.data.id, 10))
        localStorage.setItem('userName', resp.data.userName)
        localStorage.setItem('myUserToken', resp.data.token)
        localStorage.setItem(
          'myUserTokenExpirationTime',
          resp.data.tokenExpirationTime
        )
        this.props.history.push(`/Admin/${localStorage.getItem('myUserId')}`)
      })
      .catch(error => {
        this.setState({
          requestStatus: error.response.status,
          message: error.response.data.password
        })
      })
  }

  render() {
    return (
      <div>
        <NavigationHome />
        {this.state.requestStatus === 400 ? (
          <div className="alert alert-danger" role="alert">
            {this.state.message.toUpperCase()}. If you would like to try again,
            click
            <button
              type="button"
              onClick={this.resetPage}
              className="btn btn-link"
            >
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

export default LogIn
