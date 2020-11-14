import React from 'react'
import ChatList from './ChatList'
import SideHeader from './SideHeader'

const SidePanel = () => {
    return (
        <div className="side_panel">
            <SideHeader/>
            <ChatList />
        </div>
    )
}

export default SidePanel
