import React, {useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {register} from "../services/firebase"
import { useDispatch } from 'react-redux';
import { registerThunk } from '../reducers/redux';


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


    const onSubmitAction = async (e) =>  {
        try{
            e.preventDefault()
            if (password === samePassword){

                let data = await register(email, password);

                let user = data.user;
                // const {uid, displayName} = user;
                const {uid} = user;
                dispatch(registerThunk({uid, email, password}));
                // signup(uid, email, password);
                history.replace("/");
                
            }
            else{
                setError({passNotMatching: "The passwords are not matching"});
            }
        }
        catch (error){
            switch(error.code){
                case "auth/email-already-in-use": setError({wrongEmail: error["message"]}); break;
                case "auth/weak-password": setError({wrongPass: error["message"]}); break;
                default: break;
            }
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
