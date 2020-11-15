
import './App.scss'
import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ChatWindow from './components/chatWindow/ChatWindow'
import SidePanel from './components/sidePanel/SidePanel'
import Login from './components/Login'
import Register from './components/Register'
import Authentication from './components/context/Authentication'


export const ChatZone = () => {
  // const {login} = useContext(AuthenticationContext);
  // const history = useHistory();
  return (
    <>
      <SidePanel />
      <ChatWindow />
    </>
  )
}


function App () {
  return (
    <Authentication>
    <div className="App">
      <Router>
        <Route exact path="/" render={props => (
          <ChatZone />
        )}>
        </Route>
        <Route exact path="/login" render={props => (
          <>
            <Login />
          </>
        )}>
        </Route>
        <Route exact path="/register" render={props => (
          <>
            <Register />
          </>
        )}>
        </Route>

      </Router>

    </div>
    </Authentication>
  )
}

export default App
