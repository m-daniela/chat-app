
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