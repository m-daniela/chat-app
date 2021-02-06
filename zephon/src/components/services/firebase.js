import firebase from "firebase";

// configuration & authentication
const config = {
    // apiKey: "AIzaSyDSM9zkBA8JnGoItYcrsCCNyLk_nnqYFz0",
    // authDomain: "zephon-45471.firebaseapp.com",
    // databaseURL: "https://zephon-45471.firebaseio.com",
    apiKey: "AIzaSyDSM9zkBA8JnGoItYcrsCCNyLk_nnqYFz0",
    authDomain: "zephon-45471.firebaseapp.com",
    databaseURL: "https://zephon-45471.firebaseio.com",
    projectId: "zephon-45471",
    storageBucket: "zephon-45471.appspot.com",
    messagingSenderId: "585420359850",
    appId: "1:585420359850:web:9e55eceecf9fe06cfe68d3"

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