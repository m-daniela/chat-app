import React, {useState, useEffect, useContext} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import {io} from "socket.io-client";
import {ChatContext} from "../context/Context"

let socket;


const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const {dispatch} = useContext(ChatContext);

  useEffect(() =>{
    socket = io("http://localhost:5000");
      socket.on("message", (msg) =>{
        // setMessages(messages => [...messages, msg]);
        dispatch({type: "SEND_MESSAGE", message: msg});
      });
  }, []);

  const addMessage = (message) =>{
    if(message) {
      socket.emit('message', message);
      // setMessages(messages => [...messages, message]);
      dispatch({type: "SEND_MESSAGE", message});
      console.log(messages);
    }
  }

  return (
        <div className="chat_window">
            <Header title={"Chat goes here"} />
            <MessageList />
            <MessageInput addMessage={addMessage}/>
        </div>
  )
}

export default ChatWindow
