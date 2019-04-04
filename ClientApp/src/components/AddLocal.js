import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-jsonschema-form'
import NavigationList from './NavigationList'

class AddLocal extends Component {
  state = {
    formSchema: {
      title: 'Add a new local',
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
          default: 'Full name'
        },
        address: {
          type: 'string',
          title: 'Address',
          default: ''
        },
        city: {
          type: 'string',
          title: 'City',
          default: 'Saint Petersburg'
        },
        state: {
          type: 'string',
          title: 'State',
          default: 'Florida'
        },
        zipcode: {
          type: 'number',
          title: 'Zip code',
          default: ''
        },
        schedule: {
          type: 'string',
          title: 'Schedule',
          default: 'schedule'
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
      schedule: { 'ui:widget': 'textarea' }
    },
    requestStatus: 0
  }

  onSubmit = event => {
    axios
      .post('https://localhost:5001/api/Local', event.formData)
      .then(resp => {
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

export default AddLocal
