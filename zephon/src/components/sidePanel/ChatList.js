import React from 'react'
import ChatListItem from './ChatListItem'

const ChatList = () => {
    const names = [1, 2, 3, 4]
    return (
        <div className="chat_list">
            {names.map(elem => <ChatListItem key={elem} number={elem}/>)}
        </div>
    )
}

export default ChatList
