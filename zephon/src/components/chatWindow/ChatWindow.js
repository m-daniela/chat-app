import React, {useEffect, useContext, useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import {ChatContext} from "../context/Context"
import { ConversationContext } from '../context/ConversationContext';
import { getChats } from '../../data/ServerCalls'
import { AuthenticationContext } from '../context/Authentication'


const ChatWindow = () => {
  const {dispatch, socket} = useContext(ChatContext);
  const {current, setMessages} = useContext(ConversationContext);
  const [isDisabled, setIsDisabled] = useState(true);
  const {email} = useContext(AuthenticationContext);

  useEffect(() =>{
      socket.on("message", (msg) =>{
        getChats(current, setMessages);
        // dispatch({type: "SEND_MESSAGE", conversation: current.conversation, message: msg});
      });
  }, [dispatch, current]);

  useEffect(() =>{
    if(current !== ""){
      setIsDisabled(false);
    }
    else setIsDisabled(true);
  }, [current]);

  const getDate = () =>{
    const today = new Date();
    const hour = today.getHours();
    const minutes = today.getMinutes();

    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const addZero = (number) => {
      return number < 10 ? `0${number}` : number;
    }

    return `${addZero(hour)}:${addZero(minutes)} ${addZero(day)}/${addZero(month)}/${year}`
  }

  const addMessage = (message) =>{
    if(message) {
      const date = getDate();
      socket.emit('message', {message, from: email, date});
      getChats(current, setMessages);
      // dispatch({type: "SEND_MESSAGE", conversation: current, message});
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
