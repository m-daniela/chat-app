import { baseUrl, authUrl } from "../../constants/Constants";
import axios from "axios";
import { EThree } from '@virgilsecurity/e3kit-browser';


export const authenticate = (user, setToken) => {
    axios.post(authUrl, {user})
        .then(res => res.data)
        .then(data => {
            if (data !== undefined){
                console.log("Authentication token", data)
                const config = {headers:{
                    Authorization: `Bearer ${data.authToken}`,
                }}
                axios.get(`${baseUrl}virgil-jwt`, config)
                .then(res => res.data)
                .then(data => {console.log("Virgil token", data); setToken(data.virgilToken)})
                .catch(err => console.log(err));
            }
            
        })
        .catch(err => console.log(err));

}