import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Header from '../common/Header'
import { E3Context } from '../context/E3Context'

import { logout } from '../reducers/redux'

const Settings = () => {
    const email = useSelector(state => state.user.email);
    const dispatch = useDispatch();
    const {logout} = useContext(E3Context);


    const handleLogout = () =>{
        dispatch(logout());
        logout();
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
