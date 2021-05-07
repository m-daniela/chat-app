import React from 'react';
import ChatList from './ChatList';
import Header from '../common/Header';

const SidePanel = () => {
    return (
        <div className="side_panel">
            <Header title={"Chats"}/>
            <ChatList />
        </div>
    );
};

export default SidePanel;
