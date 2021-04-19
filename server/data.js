
// database interaction

var admin = require("firebase-admin");
var serviceAccount = require("./key.json");

// change
const { cts } = require("./constants");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://zephon-45471.firebaseio.com"
});

const db = admin.firestore();
const users = {};

// convert the date to a firestore timestamp
const convertToTimestamp = (date) =>{
  const timestamp = admin.firestore.Timestamp.fromDate(new Date(date));
  return timestamp;
}


// add new user
// check if it exists, and if not, 
// add a new document in the users collection 
// create a conversations collection with 
// and empty document called "ignore"
// - email - email of the user
const addUser = async (email) =>{
  try{
    const user = await db.collection(cts.users).doc(email).get();
    if (!user.exists){
      const userAdded = await db.collection(cts.users).doc(email);
      await userAdded.set({});
      await userAdded.collection(cts.conversations).doc("ignore").set({});
      console.log("Add user: user added", email);
    }
    else{
      console.log(`Add user: ${email} already here`)
    }
  }
  catch (err){
    console.log("Add user: ", err);
  }
}

// add a new chat to the database
// each participant will get a new document with 
// the other's participant email as uid
// - sender - the one who initialized the chat
// - receiver - the one added to the chat
// - date - date used for the default message
const createChat = async (sender, receiver, date) =>{
  const message = {
    sender: "sys",
    text: "Start chatting", 
    date: convertToTimestamp(date),
  }

  try{
    const participants = [sender, receiver];
    createChatDatabase(sender, receiver, participants, message);
    createChatDatabase(receiver, sender, participants, message);
  }
  catch(err){
    console.log("Create chat: err");
  }
  
}

// create a group chat
// each participant will get a new document with the
// name of the chat as uid
// - sender - email of the user who starts the conversation
// - name - name of the chat
// - receivers - array of emails with the users added to the group
// - date - date used for the default message
const createGroup = async (sender, name, receivers, date) => {
  const message = {
    sender: "sys",
    text: "Start chatting, group.", 
    date: convertToTimestamp(date),
  }

  try{
    const participants = [sender, ...receivers];
    console.log("Group", participants, receivers)
    createChatDatabase(sender, name, participants, message);

    for (const receiver of receivers){
      createChatDatabase(receiver, name, participants, message);
    }
  }
  catch(err){
    console.log("Create group chat: ", err);
  }
}

// add the group to the database
// it will add to the list of participants
// automatically, even if it is a private chat
// - sender - email of the user who starts the conversation
// - receiver - email of the recv or the name of the chat
// - participants - array of emails with the participants
// - message - the default message object
const createChatDatabase = async (sender, receiver, participants, message) =>{
  try{
    const conversation = await db.collection(cts.users)
      .doc(sender)
      .collection(cts.conversations)
      .doc(receiver);
    console.log("----", conversation)
    await conversation.set({participants});
    await conversation
      .collection(cts.messages)
      .add(message);
    
    console.log("Create chat database: new chat created", sender, receiver, participants);
  }
  catch(err){
    console.log("Create chat database: ", err);
  }
}

// send a message
// - sender - sender of the message
// - name - name of the chat; can be either the email of the
// receiver or the name of the group chat
// - receivers - all the participants in the chat
// - date - date of the sent message
const sendMessage = async (message) => {
  
  const newMessage = {
    sender: message.from,
    text: message.message,
    date: convertToTimestamp(message.date)
  }

  if (message.receivers.length === 2){
    const [recv1, recv2] = [...message.receivers];
    console.log("Send messages: ", recv1, recv2, message.receivers)

    const messageId = await sendMessageDatabase(recv1, recv2, newMessage);
    sendMessageWithIdDatabase(recv2, recv1, newMessage, messageId);
    return messageId;
  }
  else{
    const messageId = await sendMessageDatabase(message.room, message.receivers[0], newMessage);
    for (const receiver of message.receivers.splice(1)){
      sendMessageWithIdDatabase(message.room, receiver, newMessage, messageId);
    }
    return messageId;
  }
  

}

// add a message to the database
// name - name of the chat
// receiver - name of the receiving user
// message - the message object
const sendMessageDatabase = async (room, receiver, message) =>{
  try{
    const ref = await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc(room)
      .collection(cts.messages)
      .add(message);

    console.log("Send message DB: Message saved");
    return ref.id;
  }
  catch(err) {
    console.log("Send message DB: ", err);
    return "";
  }
}


// does the same thing, but it already has an id
const sendMessageWithIdDatabase = async (room, receiver, message, messageId) =>{
  try{
    await db.collection(cts.users)
      .doc(receiver)
      .collection(cts.conversations)
      .doc(room)
      .collection(cts.messages)
      .doc(messageId)
      .set(message);

    console.log("Send message DB: Message saved");
  }
  catch(err) {
    console.log("Send message DB: ", err);
  }
}

// get all conversations of a user
// - user - email of the user
const getConversations = async (user) =>{
  const conversations = [];
  const rawConversations = await db.collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .get();

  rawConversations.forEach(snapshot =>{
    if (snapshot.id !== "ignore") conversations.push(snapshot.id);
  });

  return conversations;
}

// get messages from a conversation for a user
// - user - email of the user
// - conversation - name of the conversation
const getMessages = async (user, conversation) =>{
  const messages = [];
  const conversationDB = await db
  .collection(cts.users)
  .doc(user)
  .collection(cts.conversations)
  .doc(conversation);

  const rawMessages = await conversationDB
    .collection(cts.messages)
    .orderBy("date")
    // .limit(10)
    .get();

  rawMessages.forEach(snapshot =>{
    const message = snapshot.data();
    message["id"] = snapshot.id;
    messages.push(message);
  });

  const participants = await db
    .collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .doc(conversation)
    .get();

  console.log("Get messages: messages collected");

  return {messages, participants: participants.data().participants};
}

// delete a message for the given chat and user
// TODO: add a return thing so it can be checked
const deleteMessage = async (user, chat, messageId) =>{
  console.log("are we here?", user, chat, messageId)
  const res = await db
    .collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .doc(chat)
    .collection(cts.messages)
    .doc(messageId)
    .delete();
  console.log("Message deleted");
}

// delete a conversation
// you need to delete all the message documents
// otherwise, they will stay there
// user - email of the user that deletes the chat
// chat - chat name
const deleteConversation = async (user, chat) =>{

  const conversation = await db
    .collection(cts.users)
    .doc(user)
    .collection(cts.conversations)
    .doc(chat);
    
  const messages = await conversation.collection(cts.messages).get();

  messages.forEach(snapshot => {
    snapshot.ref.delete();
  });

  await conversation.delete();

  console.log("Delete conversation: conversation deleted");
}

// add the user to the room
const join = (chatid, username, room) =>{
    const user = {chatid, username, room};
    users[chatid] = {chatid, username, room};
    return user;

}

const current = (chatid) => users[chatid];

module.exports = {
  join, 
  users, 
  addUser, 
  current, 
  createChat, 
  createGroup,
  sendMessage,
  getMessages, 
  deleteMessage,
  getConversations,
  deleteConversation,
};