import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-jsonschema-form'
import NavigationAdmin from './NavigationAdmin'

class AddLocal extends Component {
  state = {
    formSchema: {
      title: 'Add a new place teaches English',
      type: 'object',
      required: ['name', 'address', 'city', 'state', 'zipcode', 'schedule'],
      properties: {
        id: {
          type: 'number',
          title: 'id',
          default: 0
        },
        name: {
          type: 'string',
          title: 'Name',
          minLength: 1,
          maxLength: 150,
          default: ''
        },
        address: {
          type: 'string',
          title: 'Address',
          minLength: 1,
          maxLength: 100,
          default: ''
        },
        city: {
          type: 'string',
          title: 'City',
          minLength: 1,
          maxLength: 50,
          default: ''
        },
        state: {
          type: 'string',
          title: 'State',
          minLength: 1,
          maxLength: 50,
          default: ''
        },
        zipcode: {
          type: 'number',
          title: 'Zip code',
          minLength: 5,
          maxLength: 5,
          default: ''
        },
        schedule: {
          type: 'string',
          title: 'Schedule',
          minLength: 1,
          maxLength: 300,
          default: ''
        },
        active: {
          type: 'boolean',
          title: 'active',
          default: true
        },
        clientId: {
          type: 'number',
          title: 'clientId',
          default: parseInt(this.props.match.params.idUser, 10)
        }
      }
    },
    uiSchema: {
      id: { 'ui:widget': 'hidden' },
      active: { 'ui:widget': 'hidden' },
      clientId: { 'ui:widget': 'hidden' },
      schedule: {
        'ui:widget': 'textarea',
        'ui:options': {
          rows: 2
        },
        'ui:placeholder': 'Enter schedule'
      },
      name: { 'ui:placeholder': 'Enter name' },
      address: { 'ui:placeholder': 'Enter address' },
      city: { 'ui:placeholder': 'Enter city' },
      state: { 'ui:placeholder': 'Enter state' },
      zipcode: { 'ui:placeholder': 'Enter zip code' }
    },
    requestStatus: 0
  }

  onSubmit = event => {
    // add the token this request in the header
    axios
      .post('/api/Local', event.formData, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('myUserToken')
        }
      })
      .then(resp => {
        this.setState({ requestStatus: resp.status })
      })
  }
  render() {
    return (
      <div>
        <NavigationAdmin />
        {this.state.requestStatus === 201 ? (
          <div className="alert alert-success" role="alert">
            Migo added successfully. Click it if you would like to go{' '}
            <Link to={`/Admin/${localStorage.getItem('myUserId')}`}>Admin</Link>
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

export default AddLocal
