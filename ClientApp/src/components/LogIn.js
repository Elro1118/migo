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
          default: 'migo@migo.com'
        },
        password: {
          type: 'string',
          title: 'Your password',
          maxLength: 10,
          default: ''
        }
      }
    },
    uiSchema: {
      password: {
        'ui:widget': 'password'
      }
    },
    requestStatus: 0,
    session: {}
  }

  onSubmit = event => {
    axios.post('/auth/login', event.formData).then(resp => {
      if (resp.status === 200) {
        this.setState({ requestStatus: resp.status, session: resp.data })
        localStorage.setItem('myUserId', parseInt(resp.data.id, 10))
        localStorage.setItem('userName', resp.data.userName)
        localStorage.setItem('myUserToken', resp.data.token)
        localStorage.setItem(
          'myUserTokenExpirationTime',
          resp.data.tokenExpirationTime
        )
        this.props.history.push(`/Admin/${localStorage.getItem('myUserId')}`)
      }
    })
  }

  render() {
    return (
      <div>
        <NavigationHome />
        <Form
          className="form-section"
          schema={this.state.formSchema}
          uiSchema={this.state.uiSchema}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }
}

export default LogIn
