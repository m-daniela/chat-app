
import './styles/App.scss'
import React from 'react'
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Helmet from "react-helmet";
import ChatWindow from './components/chatWindow/ChatWindow'
import SidePanel from './components/sidePanel/SidePanel'
import Login from './components/userDetails/Login'
import Signup from './components/userDetails/Signup'
import Settings from './components/settingsPanel/Settings';
import SocketProvider from './components/context/SocketContext';

export const ChatZone = () => {
  // const {loggedIn, eThree} = useContext(AuthenticationContext);
  const loggedIn = useSelector(state => state.loggedIn);
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
    // <Authentication>
    //   <ContextProvider>
    //     <ConversationProvider>
    <SocketProvider>
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
      </SocketProvider>
    //     </ConversationProvider>

    //   </ContextProvider>
    // </Authentication>
  )
}

export default App
