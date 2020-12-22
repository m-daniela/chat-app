import React, {useContext, useEffect} from 'react'
import Message from './Message'
import {ChatContext} from "../context/Context"
// import { ConversationContext } from '../context/ConversationContext';

const MessageList = () => {
  const {messages} = useContext(ChatContext);
  // const {conversation} = useContext(ConversationContext);
  // console.log(messages)
  // console.log(messages[conversation])

  useEffect(() => {
    const container = document.querySelector(".message_list");
    container.scrollTop = container.scrollHeight;
  }, [messages]);
  
  return (
    <div className="message_list">
      {
        messages.map(elem => <Message key={Math.random() * 100} number={elem}/>)
      }
    </div>
  )
}

export default MessageList
