

var admin = require("firebase-admin");

var serviceAccount = require("../../../key.json");
const { cts } = require("./constants");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zephon-45471.firebaseio.com"
});

const db = admin.firestore();

const conversations = [];


// add new user
// check if it exists, and if not, add it with an empty 
// array for the conversations
const addUser = async (email) =>{
  try{
    const user = await db.collection(cts.users).doc(email).get();
    if (!user.exists){
      await db.collection(cts.users).doc(email).set({convos: []})
    }
  }
  catch (err){
    console.log(err);
  }
}

// add a new chat to the database
// the chat will be added to the conversations database
// and then both of the participants will get a reference
// id is auto generated
// sender (email) - the one who initialized the chat
// receiver (email) - the one added to the chat
const createChat = async (sender, receiver) =>{
  try{
    const conversation = await db.collection(cts.conversations)
      .add({
        user1: sender,
        user2: receiver
      });
    await conversation.collection(cts.messages)
    .add({
          sender: "sys",
          text: "start chatting", 
          date: new Date(),
      });

    const user1 = await db.collection(cts.users).doc(sender);
    await user1.update({
      convos: admin.firestore.FieldValue.arrayUnion(conversation)
    });

    const user2 = await db.collection(cts.users).doc(receiver);
    await user2.update({
      convos: admin.firestore.FieldValue.arrayUnion(conversation)
    });
  }
  catch(err){
    console.log(err);
  }
}

// // add a new chat to the database
// // id is auto generated
// // sender (email) - the one who initialized the chat
// // receiver (email) - the one added to the chat
// const createChat = async (sender, receiver) =>{
//   const conversation = await db.collection(cts.users)
//     .doc(sender)
//     .collection(cts.conversations)
//     .doc(receiver)
//     .collection(cts.messages)
//     .add({
//       sender: "sys",
//       text: "start chatting", 
//       date: new Date(),
//   });
//   console.log("New chat created");
// }


const sendMessage = async (chat, sender, text, date) => {
  try{
    await db
      .collection(cts.conversations)
      .doc(chat)
      .collection(cts.messages)
      .add({
        sender,
        text, 
        date,
      });
    console.log("Message sent");
  }
  catch(err){
    console.log(err);
  }
  
  
}

// const sendMessage = async (user, sender, receiver, text, date) => {
//   // make this bidirectional
//   await db.collection(cts.users)
//     .doc(user)
//     .collection(cts.conversations)
//     .doc(receiver)
//     .collection(cts.messages)
//     .add({
//       sender,
//       text, 
//       date,
//     });
//   console.log("Message sent");
  
// }

const getMessages = async (conversaionId) => {

}

// since the conversations are a list of references to a
// document in conversations, first I'll try to get the
// conversation ids and details and cache them, then, 
// on click, get the messages corresponding
// will see later, but the style will stay the same

const getConversations = async (user) =>{
  const conversations = {}
  try{
    const rawConvos = await db
    .collection(cts.users)
    .doc(user)
    .get();
    const convos = rawConvos.data().convos;
    convos.forEach(convo => {
      conversations[convo.id] = {
        user1: null, 
        user2: null, 
        messages: [],
      }
      // const convoData = await 
      db.collection(cts.conversations).doc(convo.id).get()
      .then(snapshot => {
        console.log(snapshot.data())
      })
      .then(_ => db
        .collection(cts.conversations)
        .doc(convo.id)
        .collection(cts.messages)
        .get()
        .then(snapshot => {
          snapshot.forEach(msg => 
            conversations[convo.id].messages.push(msg.data()));
          })
        .catch(err => console.log(err)))
      .catch(err => console.log(err))
      
      // const yes = async () =>{
      //   const messages = await 
      //   messages.forEach(msg => conversations[convo.id].messages.push(msg.data()))
        
      // }
      // yes();
      
      
    });
  }
  catch(err){
    console.log(err);
  }
  return conversations;
}

const getMessages2 = async (user) =>{
  const userConversations = {}
  // get conversations of user
  const conversations = await db
    .collection(cts.users)
    .doc(user)
    // .collection(cts.conversations)
    .get();
  const convo1 = await conversations.data().convos[1].collection("messages")
  console.log(convo1);

  // conversations.get().then(yes => yes.forEach(snapshot => {
  //   console.log(snapshot.id);
  // }))

  // const conversations2 = await conversations.collection(cts.conversations).get();
  // // console.log(conversations2);
  // conversations2.forEach(snapshot => {
  //   console.log(snapshot.id);
  // })
  
    // .then(snapshot =>{
    //   snapshot.forEach(docs => {
    //     console.log(docs.id);
    //     console.log(docs);
    //     docs.collection(cts.messages)
    //       .get()
    //       .then(messages =>{
    //         messages.forEach(message =>{
    //           console.log(message);
    //         })
    //       })
    //       .catch(error => console.log(error));

    //   });
    // })
    

  // const saved = convos.map
  // console.log(convos);
}

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

module.exports = {
  join, 
  current, 
  users, 
  createChat, 
  sendMessage, 
  getMessages, 
  addUser, 
  getConversations,
};