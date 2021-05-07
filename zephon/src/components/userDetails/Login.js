import React, {useContext, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {signin} from "../../utils/services/firebase";
import { useDispatch } from 'react-redux';
import { getConversationsThunk, login } from '../../utils/reducers/redux';
import { E3Context } from '../../utils/context/E3Context';
import { e3login } from '../../utils/services/encryption';


// Login
// the user login logic
// obtains the user token and the conversations
// on successful login, the user is redirrected to the main page
// otherwise, the error message is shown
// the link for the Signup page is here
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const {setToken} = useContext(E3Context);
    const history = useHistory();

    const onSubmitAction = async (e) => {
        e.preventDefault();
        signin(email, password)
            .then(data => {
                const user = data.user;
                const {uid} = user;
                dispatch(login({uid, email, loggedIn: true}));
                e3login(email, password, setToken);
                dispatch(getConversationsThunk({email}));
            })
            .then(_ => history.push("/"))
            .catch(error => setError(error.message));
    };

    const onChangeEmail = text => {
        setEmail(text);
    };

    const onChangePassword = text => {
        setPassword(text);
    };

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
    );
};

export default Login;
