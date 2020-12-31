

var admin = require("firebase-admin");

var serviceAccount = require("../../key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zephon-45471.firebaseio.com"
});

const db = admin.firestore();

const conversations = [];

// db.collection("conversations").get().then((snapshot) => {
//     snapshot.docs.map(doc => {
//         console.log(doc.id);
//         const data = doc.data();
//         conversations.push(data);
//         data.messages.map(element => {
//             console.log(element.id)
        
//         });
//         // console.log(data.messages);

//         // doc.collection("messages").get().then((snapshot) => {
//         //     snapshot.docs.map(msg => console.log(msg.data()));
//         // });
        
//     });
//     // console.log(conversations);

// });



// here will go some user lvl logic
// user: id, name (for now)
// message: id, text
// conversation: id, user[], message[]

const users = {};

const join = (chatid, username, room) =>{
    const user = {chatid, username, room};
    users[chatid] = {chatid, username, room};
    return user;

}

// const current = (chatid) => users.find(elem => elem.chatid == chatid);
const current = (chatid) => users[chatid];

module.exports = {join, current, users};