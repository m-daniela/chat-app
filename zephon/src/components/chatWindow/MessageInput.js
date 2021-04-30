import React, {useState} from 'react'
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';


// Message input
// handles the message text and attachments
// this information is sent to the ChatWindow
const MessageInput = ({addMessage}) => {
  const [message, setMessage] = useState("");

  const onChangeInput = (text) => {
    setMessage(text);
  }

  const onSendMessage = (e) => {
    e.preventDefault();
    addMessage(message);
    setMessage("");
  }

  return (
    <form className="message_input" onSubmit={e => onSendMessage(e)}>
      <label>
        <AttachFileOutlinedIcon/>
        <input type="file"/>
      </label>
      <input type="text"
        onChange={e => onChangeInput(e.target.value)}
        placeholder={"Your message..."}
        value={message}/>
      <button type="submit"><SendOutlinedIcon/></button>
    </form>
  )
}
export default MessageInput
