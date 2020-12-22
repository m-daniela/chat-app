import React, {useContext, useEffect} from 'react'
import Message from './Message'
import {ChatContext} from "../context/Context"

const MessageList = () => {
  const {messages} = useContext(ChatContext);

  useEffect(() => {
    console.log("get here")
    document.querySelector(".message_list").scrollIntoView(false);
  }, [messages])
  return (
        <div className="message_list">
            {
                messages.map(elem => <Message key={Math.random() * 100} number={elem}/>)
            }
        </div>
  )
}

export default MessageList
