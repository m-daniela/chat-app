
import './styles/App.scss'
import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';

import Helmet from "react-helmet";
import ChatWindow from './components/chatWindow/ChatWindow'
import SidePanel from './components/sidePanel/SidePanel'
import Login from './components/userDetails/Login'
import Signup from './components/userDetails/Signup'
import Settings from './components/settingsPanel/Settings';
import SocketProvider from './components/context/SocketContext';
import E3Provider from './components/context/E3Context';

export const ChatZone = () => {
  // const {loggedIn, eThree} = useContext(AuthenticationContext);
  const loggedIn = useSelector(state => state.user.loggedIn);
  // const history = useHistory();
  console.log("Chat zone", loggedIn);
  // if(!loggedIn){
  //   history.push("/login");
  // }
  return (
    <>
      {loggedIn ? <>
          <SidePanel />
          <ChatWindow />
          <Settings />
        </> : 
        <Redirect to="/login"/>
      }
    </>
  )
  
}

function App () {

  return (
    // <Authentication>
    //   <ContextProvider>
    //     <ConversationProvider>
    <SocketProvider>
      <E3Provider>
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
        </E3Provider>
      </SocketProvider>
    //     </ConversationProvider>

    //   </ContextProvider>
    // </Authentication>
  )
}

export default App
