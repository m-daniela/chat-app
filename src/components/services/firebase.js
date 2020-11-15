import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDSM9zkBA8JnGoItYcrsCCNyLk_nnqYFz0",
    authDomain: "zephon-45471.firebaseapp.com",
    databaseURL: "https://zephon-45471.firebaseio.com",
};

firebase.initializeApp(config);

export const authentication = firebase.auth;
export const database = firebase.database();

export const register = (email, password) => {
    return authentication().createUserWithEmailAndPassword(email, password);
}

export const signin = (email, password) => {
    return authentication().signInWithEmailAndPassword(email, password);
}