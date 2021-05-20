
import { authUrl, jwtUrl } from "../constants/Constants";
import axios from "axios";
import { EThree } from '@virgilsecurity/e3kit-browser';

// obtain the Virgil Token that will be used for user login/ signup
// in: config - obj containing configuration headers
const getVirgilToken = async (config) => {
    const response = await axios.get(jwtUrl, config);
    if (response.status !== 200) {
        throw new Error(`Error code: ${response.status} \nMessage: ${response.statusText}`);
    }
    return response.data.virgilToken;
};

// obtain the user token from the key server if it was registered before
// in: 
// user - string, the email of the user
// password - string, the password of the user
// setToken - function, sets the user token in the context
// out: the user token is set and message encryption/ decryption is possible
export const e3login = (user, password, setToken) => {
    axios.post(authUrl, {user})
        .then(res => res.data)
        .then(data => {
            if (data !== undefined){
                console.log("Authentication token", data);
                const config = {headers:{
                    Authorization: `Bearer ${data.authToken}`,
                }};
                
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
};


// register the new user on the key server and set the token
// in: 
// user - string, the email of the user
// password - string, the password of the user
// setToken - function, sets the user token in the context
// out: the user token is set and message encryption/ decryption is possible
export const e3register = (user, password, setToken) => {
    axios.post(authUrl, {user})
        .then(res => res.data)
        .then(data => {
            if (data !== undefined){
                console.log("Authentication token", data);
                const config = {headers:{
                    Authorization: `Bearer ${data.authToken}`,
                }};
                
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
};

// obtain the public key of the user/s
// not used
export const getPublicKey = (email, eThree, setPublicKey) => {
    eThree.findUsers(email)
        .then(pk => {setPublicKey(pk); console.log("help", email, pk);})
        .catch(err => console.log(err));
};


// encrypt the message using the public keys of the recipients
// TODO: optimize this part, maybe, by sending the public keys directly, not fetching them every time
// in:
// participants - list of strings with the emails of the participants
// eThree - obj, the current user token 
// message - string, the text of the message
// out: the encrypted message or an empty string if something goes wrong
export const encryptMessage = async (participants, eThree, message) =>{

    try{
        const pks = await eThree.findUsers(participants);
        const enc = await eThree.authEncrypt(message, pks);
        return enc;
    }
    catch (e) {
        console.log(e);
        return "";
    }
};


// obtain the decrypted messages
// in: 
// participants - list of strings with the emails of the participants
// eThree - obj, the current user token
// messages - list of strings with the encrypted messages
// out: list of strings with the decrypted messages or an empty list if something goes wrong
export const getDecryptedMessages = async (participants, eThree, messages) =>{

    try{
        const pks = await eThree.findUsers(participants);
        
        const newMessages = [];
        for (const message of messages){
            if (message.sender === "sys"){
                newMessages.push(message);
            } else{
                try{
                    const text = await eThree.authDecrypt(message.text, pks[message.sender]);
                    const newMessage = {
                        id: message.id,
                        sender: message.sender, 
                        date: message.date,
                        attachment: message.attachment,
                        text,
                    };
                    newMessages.push(newMessage);
                } catch(err){
                    console.log(err);
                }
            }
        }
        return newMessages;
    }
    catch (e) {
        console.log("Encryption", e.message);
        return [];
    }
};


// encrypt file
export const encryptFile = async (token, file) =>{

    try{
        const {encryptedSharedFile, fileKey} = await token.encryptSharedFile(file);
        return {encryptedSharedFile, fileKey};
    }
    catch (e) {
        console.log(e);
        return {};
    }
};

// decrypt the file
export const decryptFile = async (token, file, fileKey, sender) =>{
    try{
        const pkSender = await token.findUsers(sender);
        const decrypted = await token.decryptSharedFile(file, fileKey, pkSender);
        return decrypted;
    }
    catch(e) {
        console.log(e);
        return {};
    }
};