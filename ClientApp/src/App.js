import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Home'
import VolunteerRegistration from './components/VolunteerRegistration'
import CommentRegistration from './components/CommentRegistration'
import LocalDetail from './components/LocalDetail'
import UserRegistration from './components/UserRegistration'
import LogIn from './components/LogIn'
import LocalList from './components/LocalList2'
import AddLocal from './components/AddLocal'
import UserAdmin from './components/UserAdmin'
import UserAdminVolunteers from './components/UserAdminVolunteers'
import UserAdminComments from './components/UserAdminComments'

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
          <Route
            exact
            path="/Admin/Volunteers/:idLocal"
            component={UserAdminVolunteers}
          />
          <Route
            exact
            path="/Admin/Comments/:idLocal"
            component={UserAdminComments}
          />
        </Switch>
      </Router>
    )
  }
}

export default App
