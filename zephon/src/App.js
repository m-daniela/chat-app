
import './styles/App.scss'
import React, {useContext} from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import Helmet from "react-helmet";
import ChatWindow from './components/chatWindow/ChatWindow'
import SidePanel from './components/sidePanel/SidePanel'
import Login from './components/userDetails/Login'
import Signup from './components/userDetails/Signup'
import Authentication, { AuthenticationContext } from './components/context/Authentication'
import Settings from './components/settingsPanel/Settings';
import ContextProvider from './components/context/Context';
import ConversationProvider from './components/context/ConversationContext';

export const ChatZone = () => {
  const {loggedIn, eThree} = useContext(AuthenticationContext);
  const history = useHistory();

  if(!loggedIn){
    history.push("/login");
  }

  return (
    <>
      <SidePanel />
      <ChatWindow />
      <Settings />
    </>
  )
}

function App () {

  return (
    <Authentication>
      <ContextProvider>
        <ConversationProvider>

          <Helmet>
            <title>zephon</title>
          </Helmet>
          <div className="App">
            <Router>
              <Route exact path="/" render={props => (
                <ChatZone />
              )}>
              </Route>
              <Route exact path="/login" render={props => (
                  <Login />
              )}>
              </Route>
              <Route exact path="/register" render={props => (
                  <Signup />
              )}>
              </Route>

            </Router>

          </div>
        </ConversationProvider>

      </ContextProvider>
    </Authentication>
  )
}

export default App
