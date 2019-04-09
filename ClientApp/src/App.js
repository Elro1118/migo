import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import axios from 'axios'
import Home from './components/Home'
import VolunteerRegistration from './components/VolunteerRegistration'
import CommentRegistration from './components/CommentRegistration'
import LocalDetail from './components/LocalDetail'
import UserRegistration from './components/UserRegistration'
import LogIn from './components/LogIn'
import LocalList from './components/LocalList'
import AddLocal from './components/AddLocal'
import UserAdmin from './components/UserAdmin'
// import auth from './Auth'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            exact
            path="/List/Volunteer/:idLocal"
            component={VolunteerRegistration}
          />
          <Route
            exact
            path="/List/Comment/:idLocal"
            component={CommentRegistration}
          />
          <Route exact path="/List/Detail/:idLocal" component={LocalDetail} />
          <Route exact path="/User" component={UserRegistration} />
          <Route exact path="/LogIn" component={LogIn} />
          <Route exact path="/List/:searchingWord" component={LocalList} />
          <Route exact path="/Admin/Local/:idUser" component={AddLocal} />
          <Route exact path="/Admin/:idUser" component={UserAdmin} />
          {/* <Route
            path="/logout"
            render={() => {
              auth.logout()

              return <p />
            }}
          />

          <Route
            path="/callback"
            render={() => {
              auth.handleAuthentication(() => {
                // // NOTE: Uncomment the following lines if you are using axios

                // //

                // // Set the axios authentication headers

                axios.defaults.headers.common = {
                  Authorization: auth.authorizationHeader()
                }
              })

              return <p />
            }}
          /> */}
        </Switch>
      </Router>
    )
  }
}

export default App
