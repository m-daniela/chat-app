import React, {useContext, useEffect} from 'react'
import { AuthenticationContext } from '../context/Authentication';
// import {ChatContext} from "../context/Context"
import { ConversationContext } from '../context/ConversationContext';


const Message = ({message}) => {
  const {email} = useContext(AuthenticationContext);
  let author = "other";

  if (email === message.sender) author = "current"

  return (
        <div className={`message ${author}`}>
          <div className="sender">
            {message.sender}
          </div>
          <div className="text">
            {message.text}
          </div>
          <div className="date">
            {message.date}
          </div>
        </div>
  )
}

const MessageList = () => {
  // const {conversations} = useContext(ChatContext);
  const {messages} = useContext(ConversationContext);
  // const messages = conversations[current] ? conversations[current].messages : [];

  useEffect(() => {
    const container = document.querySelector(".message_list");
    container.scrollTop = container.scrollHeight;
  }, [messages]);
  
  return (
    <div className="message_list">
      {
        messages.map(elem => <Message key={Math.random() * 100} message={elem}/>)
      }
    </div>
  )
}

export default MessageList
