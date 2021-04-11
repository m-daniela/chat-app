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
      if (message.sender === current){
        // dispatch(addMessage(message));
        dispatch(getMessagesThunk({email, current}));
      }
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
          // this is, of course, not ok because the id is not present
          // and the message will not be deleted
          // will modify this later 
          socket.emit('message', {message: enc, from: email, room: current, date, receivers: participants});
          dispatch(addMessage({text: enc, sender: email, date: dateFirebase}));

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
