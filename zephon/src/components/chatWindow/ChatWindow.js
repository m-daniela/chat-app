import React, {useEffect, useContext, useState} from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'
import { encryptMessage} from '../services/encryption';
import { useSelector, useDispatch } from 'react-redux'
import { SocketContext } from '../context/SocketContext'
import { addMessage, getMessagesThunk } from '../reducers/redux'
import { E3Context } from '../context/E3Context';
import firebase from "firebase";
import { addMessageServer } from '../../data/ServerCalls';


/*
Chat window with the Message Input and Message List
- addMessage
- socket emit and on "message"
*/

const ChatWindow = () => {
  const {socket} = useContext(SocketContext);
  const {token} = useContext(E3Context);
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.email);
  const current = useSelector(state => state.selected);
  const participants = useSelector(state => state.chat.participants);

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() =>{
    socket.on("message", (message) =>{
      console.log("You get here on message")
      console.log(message.room, current)
      // TODO: fix this? 
      if (message.room === current || message.sender === current){
        // dispatch(addMessage(message));
        console.log(current)
        dispatch(getMessagesThunk({email, conversation: current}));
      }
      console.log("?????", current)

    });
    // eslint-disable-next-line
  }, [current, dispatch, socket]);

  useEffect(() =>{
    socket.on("user left", ({username}) =>{
      console.log("User left", username)
    });
  }, [socket]);

  useEffect(() =>{
    if(participants !== null && current !== undefined && current !== ""){
      setIsDisabled(false);
    }
    else setIsDisabled(true);
    // eslint-disable-next-line
  }, [current, participants]);

  const addNewMessage = (message) =>{
    if(message) {
      const date = new Date();
      const dateFirebase = firebase.firestore.Timestamp.fromDate(date);

      encryptMessage(participants, token, message)
        .then(enc => {
          
          const msg = {message: enc, from: email, room: current, date, receivers: participants}

          addMessageServer(msg)
            .then(id => {
              console.log(id)
              dispatch(addMessage({id, text: enc, sender: email, date: dateFirebase}));
              socket.emit('message', {message: {id, text: enc, sender: email, date: dateFirebase, room: current}, type: participants.length});
            });

          // dispatch(getMessagesThunk({email, conversation: current}));

          console.log("After add message dispatch")
        })
        .catch(err => console.log(err));
    }
  }

  return (
      <div className="chat_window">
          <Header title={current} />
          {isDisabled ? 
            <div className="empty">
              <h2>Welcome</h2>
              <p>Please choose a chat to see magical stuff</p>
            </div> : 
            <>
              <MessageList />
              <MessageInput addMessage={addNewMessage} />
            </>}
      </div>
  )
}

export default ChatWindow
