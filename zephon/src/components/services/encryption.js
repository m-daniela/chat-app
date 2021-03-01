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

// pks - public keys of recipients
// can be a single public key or an array
export const encryptMessage = (pks, eThree, message) => {
    return eThree.authEncrypt(message, pks);
}

export const decryptMessage = () => {

}


// FOR REDUX

export const e3register2 = (user, password) => {
    return axios.post(authUrl, {user})
        .then(res => res.data)
        .then(data => {
            if (data !== undefined){
                console.log("Authentication token", data)
                const config = {headers:{
                    Authorization: `Bearer ${data.authToken}`,
                }}
                
                return EThree.initialize(() => getVirgilToken(config))
                    .then(eThree => {
                        eThree.register()
                            .then(_ => eThree.backupPrivateKey(password))
                            .then(_ => console.log("success"))
                            .catch(err => console.log(err));
                        
                        // setToken(eThree);
                    })
                    .catch(err => {
                        console.log("Encryption: e3register", err);
                        return null;
                    });
            }
        })
        .catch(err => {
            console.log("Encryption: e3register, axios", err);
            return null;
        });
}


export const e3login2 = async (user, password) => {
    return axios.post(authUrl, {user})
        .then(res => res.data)
        .then(async data => {
            if (data !== undefined){
                console.log("Authentication token", data)
                const config = {headers:{
                    Authorization: `Bearer ${data.authToken}`,
                }}
                console.log("here we are")
                
                return EThree.initialize(() => getVirgilToken(config))
                    .then(eThree => {
                        // eThree.rotatePrivateKey().then(_ => console.log("success")).then(_ => eThree.backupPrivateKey(password)).catch(err => console.log(err));
                        eThree.hasLocalPrivateKey()
                            .then(hasLocalPrivateKey => {
                                if (!hasLocalPrivateKey) eThree.restorePrivateKey(password);
                            });
                        console.log("why even", eThree)
                        return eThree;
                        // setToken(eThree);
                    })
                    .catch(err => {
                        console.log("Encryption: e3login", err);
                        return null;
                    });
            }
        })
        .catch(err => {
            console.log("Encryption: e3login, axios", err);
            return null;
        });
}






