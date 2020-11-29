import React from 'react'
import ChatList from './ChatList'
import SideHeader from '../common/SideHeader'

const SidePanel = () => {
    return (
        <div className="side_panel">
            <SideHeader title={"Chats"}/>
            <ChatList />
        </div>
    )
}

export default SidePanel
