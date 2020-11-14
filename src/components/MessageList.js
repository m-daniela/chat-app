import React from 'react'
import Message from "./Message";

const MessageList = () => {
    return (
        <div className="message_list">
            {
                [1, 2, 3, 4].map(elem => <Message key={elem} number={elem}/>)
            }
        </div>
    )
}

export default MessageList
