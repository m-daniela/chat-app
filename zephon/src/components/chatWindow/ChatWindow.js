import React, {useEffect, useContext, useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import {ChatContext} from "../context/Context"
import { ConversationContext } from '../context/ConversationContext';


const ChatWindow = () => {
  const {dispatch, socket} = useContext(ChatContext);
  const {conversation} = useContext(ConversationContext);
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() =>{
      socket.on("message", (msg) =>{
        dispatch({type: "SEND_MESSAGE", conversation, message: msg});
      });
  }, [dispatch]);

  useEffect(() =>{
    if(conversation !== ""){
      setIsDisabled(false);
    }
    else setIsDisabled(true);
}, [conversation]);

  const addMessage = (message) =>{
    if(message) {
      socket.emit('message', message);
      dispatch({type: "SEND_MESSAGE", conversation, message});
    }
  }

  return (
        <div className="chat_window">
            <Header title={conversation} />
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
