import React from 'react'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'

const ChatWindow = () => {
  return (
        <div className="chat_window">
            <ChatHeader />
            <MessageList />
            <MessageInput />
        </div>
  )
}

export default ChatWindow
