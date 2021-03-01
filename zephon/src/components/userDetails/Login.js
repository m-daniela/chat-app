import React, {useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {signin} from "../services/firebase"
import { useDispatch } from 'react-redux';
import { getConversationsThunk, loginThunk } from '../reducers/redux';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
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
                    dispatch(loginThunk({uid, email, password}))
                    // login(uid, email, password);
                    history.replace("/");
                })
                .then(_ => console.log("data added"))
                .then(_ => dispatch(getConversationsThunk(email)))
                .then(_ => console.log("conversations taken"))
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
