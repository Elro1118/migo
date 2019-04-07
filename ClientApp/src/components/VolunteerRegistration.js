import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'

import NavigationList from './NavigationList'

class VolunteerRegistration extends Component {
  state = {
    formSchema: {
      title: 'Add a new volunteer',
      type: 'object',
      required: ['name', 'telephone', 'email', 'photo'],
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
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
          default: 'migo@migo.com'
        },
        photo: {
          type: 'string',
          title: 'Photo'
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
      photo: { 'ui:widget': 'file' }
    },
    requestStatus: 0
  }

  onSubmit = event => {
    let splitted = event.formData.photo.split(';')
    let typeFile = splitted[0].includes('image')
    let data = splitted[2].split(',')[1]

    console.log(data)

    if (typeFile) {
      axios
        .post('https://localhost:5001/api/Volunteer', event.formData)
        .then(resp => {
          console.log(resp)

          if (resp.status === 201) {
            this.setState({ requestStatus: resp.status })
          }
        })
    }
  }

  render() {
    return (
      <div>
        <NavigationList />
        {this.state.requestStatus === 201 ? (
          <div className="alert alert-success" role="alert">
            Migo added successfully. Click it if you would like to go{' '}
            <Link to={`/List/${localStorage.getItem('myWord')}`}>List</Link>.
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

export default VolunteerRegistration
