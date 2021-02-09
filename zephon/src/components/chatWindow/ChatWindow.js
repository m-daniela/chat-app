import React, {useEffect, useContext, useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import {ChatContext} from "../context/Context"
import { ConversationContext } from '../context/ConversationContext';
import { getMessages } from '../../data/ServerCalls'
import { AuthenticationContext } from '../context/Authentication'


const ChatWindow = () => {
  const {dispatch, socket} = useContext(ChatContext);
  const {current, setMessages} = useContext(ConversationContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const {email} = useContext(AuthenticationContext);

  useEffect(() =>{
      socket.on("message", (msg) =>{
        getMessages(email, current, setMessages);
      });
  }, [email, dispatch, current, socket, setMessages]);

  useEffect(() =>{
    if(current !== ""){
      setIsDisabled(false);
    }
    else setIsDisabled(true);
  }, [current]);

  const addMessage = (message) =>{
    if(message) {
      const date = Date();
      socket.emit('message', {message, from: email, date});
      getMessages(email, current, setMessages);
    }
  }

  return (
        <div className="chat_window">
            <Header title={current} />
            {isDisabled ? 
              <div className="empty">
                <p>Welcome</p>
                <p>Please choose a chat to see magical stuff</p>
              </div> : 
              <>
                <MessageList />
                <MessageInput addMessage={addMessage} />
              </>}
            
        </div>
  )
}

export default ChatWindow
