import React, {useContext, useState} from 'react'
import {ChatContext} from "../context/Context"
import {io} from "socket.io-client";

let socket;

const MessageInput = ({addMessage}) => {
  const [message, setMessage] = useState("");
  // const {dispatch, sendMessage} = useContext(ChatContext);
  const {dispatch} = useContext(ChatContext);

  const onChanteInput = (text) => {
    setMessage(text);
  }

  const onSendMessage = (e) => {
    e.preventDefault();
    // if(message !== ""){
    //   dispatch({type: "SEND_MESSAGE", message});
    //   sendMessage(message);
    //   setMessage("");
    // }

    
      // socket = io("http://localhost:5000");
      // socket.emit('message', message);
      // socket.on("message", (msg) =>{
      //   addMessage(msg);
      //   // dispatch({type: "SEND_MESSAGE", message: msg});
      //   setMessage("");
      // });

      addMessage(message);
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
