import { authUrl, jwtUrl } from "../../constants/Constants";
import axios from "axios";
import { EThree } from '@virgilsecurity/e3kit-browser';

const getVirgilToken = async (config) => {
    const response = await axios.get(jwtUrl, config)
    if (response.status !== 200) {
        throw new Error(`Error code: ${response.status} \nMessage: ${response.statusText}`);
    }
    return response.data.virgilToken;
}

export const e3login = (user, password, setToken) => {
    axios.post(authUrl, {user})
        .then(res => res.data)
        .then(data => {
            if (data !== undefined){
                console.log("Authentication token", data)
                const config = {headers:{
                    Authorization: `Bearer ${data.authToken}`,
                }}
                
                EThree.initialize(() => getVirgilToken(config))
                    .then(eThree => {
                        // eThree.rotatePrivateKey().then(_ => console.log("success")).then(_ => eThree.backupPrivateKey(password)).catch(err => console.log(err));
                        eThree.hasLocalPrivateKey()
                            .then(hasLocalPrivateKey => {
                                if (!hasLocalPrivateKey) eThree.restorePrivateKey(password);
                            });
                        setToken(eThree);
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}


export const e3register = (user, password, setToken) => {
    axios.post(authUrl, {user})
        .then(res => res.data)
        .then(data => {
            if (data !== undefined){
                console.log("Authentication token", data)
                const config = {headers:{
                    Authorization: `Bearer ${data.authToken}`,
                }}
                
                EThree.initialize(() => getVirgilToken(config))
                    .then(eThree => {
                        eThree.register()
                            .then(_ => eThree.backupPrivateKey(password))
                            .then(_ => console.log("success"))
                            .catch(err => console.log(err));
                        
                        setToken(eThree);
                    })
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
}

export const getPublicKey = (email, eThree, setPublicKey) => {
    eThree.findUsers(email)
        .then(pk => {setPublicKey(pk); console.log("help", email, pk)})
        .catch(err => console.log(err));
}

