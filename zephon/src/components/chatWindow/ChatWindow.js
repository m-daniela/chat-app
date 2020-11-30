import React from 'react'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import Header from '../common/Header'

const ChatWindow = () => {
  return (
        <div className="chat_window">
            <Header title={"Chat goes here"} />
            <MessageList />
            <MessageInput />
        </div>
  )
}

export default ChatWindow
