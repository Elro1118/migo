import React, { Component } from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import VolunteerRegistration from './components/VolunteerRegistration'
import CommentRegistration from './components/CommentRegistration'
import LocalDetail from './components/LocalDetail'
import UserRegistration from './components/UserRegistration'
import LogIn from './components/LogIn'
import LocalList from './components/LocalList'
import AddLocal from './components/AddLocal'
// import UserSession from './components/UserSession'
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
          <Route exact path="/Local/:idUser" component={AddLocal} />
          {/* <Route exact path="/LoginIn/:idUser" component={UserSession} /> */}
        </Switch>
      </Router>
    )
  }
}

export default App
