import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../common/Header'

import { logout } from '../reducers/redux'

const Settings = () => {
    const email = useSelector(state => state.email);
    const dispatch = useDispatch();


    const handleLogout = () =>{
        dispatch(logout());
    }
    return (
        <div className="settings_panel">
            <Header title={"Privacy Settings"}/>
            <span className="side_item" >{email}</span>
            <span className="side_item" onClick={handleLogout}>Log out</span>
        </div>
    )
}

export default Settings
