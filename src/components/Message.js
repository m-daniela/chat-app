import React from 'react'

const Message = (props) => {
    return (
        <div className="message">
            lorem ipsum {props.number}
        </div>
    )
}

export default Message
