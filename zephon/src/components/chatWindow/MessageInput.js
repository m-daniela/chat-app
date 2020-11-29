import React, {useContext, useState} from 'react'
import {ChatContext} from "../context/Context"

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const {dispatch, sendMessage} = useContext(ChatContext);

  const onChanteInput = (text) => {
    setMessage(text);
  }

  const onSendMessage = (e) => {
    e.preventDefault();
    dispatch({type: "SEND_MESSAGE", message});
    sendMessage(message);
    setMessage("");
  }
  return (
        <form className="message_input" onSubmit={e => onSendMessage(e)}>
            <input type="text" 
              onChange={e => onChanteInput(e.target.value)}
              value={message}/>
            <button type="submit">Send</button>
        </form>
  )
}
export default MessageInput
