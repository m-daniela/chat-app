import React, {useContext} from 'react'
import Message from './Message'
import {ChatContext} from "../context/Context"

const MessageList = () => {
  const {messages} = useContext(ChatContext);
  return (
        <div className="message_list">
            {
                messages.map(elem => <Message key={elem} number={elem}/>)
            }
        </div>
  )
}

export default MessageList
