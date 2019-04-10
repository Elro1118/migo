import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Form from 'react-jsonschema-form'
import NavigationList from './NavigationList'

class VolunteerRegistration extends Component {
  state = {
    formSchema: {
      title: 'Add a new volunteer for teaching',
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
      photo: { 'ui:widget': 'file' },
      name: { 'ui:placeholder': 'Enter name' },
      telephone: { 'ui:placeholder': 'Enter telephone' },
      email: { 'ui:placeholder': 'Enter email' }
    },
    requestStatus: 0
  }

  resetPage = () => {
    this.setState({ requestStatus: 0 })
  }
  onSubmit = event => {
    let splitted = event.formData.photo.split(';')
    let typeFile = splitted[0].includes('image')

    if (typeFile) {
      axios.post('/api/Volunteer', event.formData).then(resp => {
        this.setState({ requestStatus: resp.status })
      })
    } else {
      this.setState({ requestStatus: 1 })
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
        ) : this.state.requestStatus === 1 ? (
          <div class="alert alert-danger" role="alert">
            You should choose an image file. Click it if you would like to go{' '}
            <button type="button" onClick={this.resetPage} class="btn btn-link">
              Add a new volunteer for teaching
            </button>
            .
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
