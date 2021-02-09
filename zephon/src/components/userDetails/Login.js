import React, {useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom'
import {signin} from "../services/firebase"
import {AuthenticationContext} from '../context/Authentication';
import { ChatContext } from '../context/Context';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {login} = useContext(AuthenticationContext);
    const {getConversations} = useContext(ChatContext);
    const history = useHistory();

    const onSubmitAction = async (e) => {
        try{
            e.preventDefault()
            // let data = await signin(email, password);
            signin(email, password)
                .then(data => {
                    const user = data.user;
                    // const {uid, displayName} = user;
                    const {uid} = user;
                    
                    login(uid, email, password);
                    history.replace("/");
                })
                .then(_ => getConversations())
                .catch(err => console.log(err));
            
            
            
        }
        catch (error){
            console.log(error);
            setError(error.message);
        }
    }

    const onChangeEmail = text => {
        setEmail(text);
    }

    const onChangePassword = text => {
        setPassword(text);
    }

    return (
            <form className="custom_form" onSubmit={e => onSubmitAction(e)}>
                <label>
                    Email
                    <input type="email" required onChange={e => onChangeEmail(e.target.value)}/>
                </label>
                <label>
                    Password
                    <input type="password" required onChange={e => onChangePassword(e.target.value)}/>
                </label>
                <span>{error === "" ? "": error}</span>

                <button type="submit" className="primary_button">Log In</button>
                <Link to="/register">New here? register now</Link>
            </form>
    )
}

export default Login
