import React, {useContext, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {register} from "../services/firebase"
import { useDispatch } from 'react-redux';
import { register as signup } from '../reducers/redux';
import { E3Context } from '../context/E3Context';
import { e3register } from '../services/encryption';

// Sign up
// sign up logic
// obtains the user token
// if successful, the user is redirrected to the main page
// otherwise, the error message is shown
// the link for the Login page is here
const Signup = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState({
        wrongEmail: "",
        wrongPass: "",
        passNotMatching: "",
    });
    const [password, setPassword] = useState("");
    const [samePassword, setSamePassword] = useState("");
    const history = useHistory();
    const dispatch = useDispatch();
    const {setToken} = useContext(E3Context);

    const onSubmitAction = async (e) =>  {
        e.preventDefault()
        if (password === samePassword){

            register(email, password)
                .then(data =>{
                    let user = data.user;
                    const {uid} = user;
                    e3register(email, password, setToken);
                    dispatch(signup({uid, email, loggedIn: true}));
                })
                .then(_ => history.push("/"))
                .catch(error =>{
                    switch(error.code){
                        case "auth/email-already-in-use": setError({wrongEmail: error["message"]}); break;
                        case "auth/weak-password": setError({wrongPass: error["message"]}); break;
                        default: break;
                    }
                });
        }
        else{
            setError({passNotMatching: "The passwords are not matching"});
        }

    }

    const onChangeEmail = text => {
        setEmail(text);
    }

    const onChangePassword = text => {
        setPassword(text);
    }

    const checkPasswords = text => {
        setSamePassword(text);
    }
    
    return (
        <form className="custom_form" onSubmit={e => onSubmitAction(e)}>
            <label>
                Email
                <input type="email" required onChange={e => onChangeEmail(e.target.value)}/>
            </label>
            <span>{error.wrongEmail === "" ? "" : error.wrongEmail}</span>
            <label>
                Password
                <input type="password" required onChange={e => onChangePassword(e.target.value)}/>
            </label>
            <span>{error.wrongPass === "" ? "" : error.wrongPass}</span>
            <label>
                Retype password
                <input type="password" required onChange={e => checkPasswords(e.target.value)}/>
            </label>
            <span>{error.passNotMatching === "" ? "" : error.passNotMatching}</span>
            <button type="submit" className="primary_button">Register</button>
            <Link to="/login">Have an account? log in</Link>
        </form>
    )
}

export default Signup
