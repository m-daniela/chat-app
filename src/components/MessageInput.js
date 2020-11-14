import React from 'react'

const MessageInput = () => {
    const onChanteInput = (text) =>{
        console.log(text);
    }

    const onSendMessage = (e) =>{
        e.preventDefault();
    }
    return (
        <form className="message_input" onSubmit={e => onSendMessage(e)}>
            <input type="text" onChange={e => onChanteInput(e.target.value)}/>
            <button type="submit">Send</button>
        </form>
    )
}
export default MessageInput
