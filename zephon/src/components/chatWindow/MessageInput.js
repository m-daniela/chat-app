import React, {useState} from 'react'

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
      {/* <label>
        <input type="file"/>
      </label> */}
      <input type="text"
        onChange={e => onChangeInput(e.target.value)}
        placeholder={"Your message..."}
        value={message}/>
      <button type="submit">Send</button>
    </form>
  )
}
export default MessageInput
