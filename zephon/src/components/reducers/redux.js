import { configureStore, createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import { getChats, getMessages } from "../../data/ServerCalls";

// initial states

const initialUserState = {
    uid: null,
    email: null,
    loggedIn: false,
};

const initialConversationsState = [];

const initialSelectedConversationState = "";

const initialStateChat = {messages: [], participants: []};

// middleware

// get conversations for a given user
export const getConversationsThunk = createAsyncThunk(
    'conversations/getConversations',
    async ({email}, thunkAPI) => {
        const response = await getChats(email);
        return response;
    }
);

// get messages for a given chat and user
export const getMessagesThunk = createAsyncThunk(
    "chat/getMessages",
    async ({email, conversation}, thunkAPI) => {
        const response = await getMessages(email, conversation);
        return response;
    }
);


// clear the state
export const clearChatThunk = createAsyncThunk(
    "chat/clear" , 
    async (thunkAPI) => {
        return initialStateChat;
    }
)

export const clearConversationsThunk = createAsyncThunk(
    "conversations/clear" , 
    async (thunkAPI) => {
        return initialConversationsState;
    }
)

export const logoutThunk = createAsyncThunk(
    "user/logout", 
    async (thunkAPI) => {
        return initialUserState;
    }
)

// reducers

const userSlice = createSlice({
    name: "user", 
    initialState: initialUserState,
    reducers: {
        logout: {
            reducer: (state, action) => action.payload,
            prepare: () => {return {payload: initialUserState}}
        },
        login: (state, action) => action.payload,
        register: (state, action) => action.payload,
    },
});

// conversation reducer
// changing the current conversation 
// add new conversation
// get conversations of a user
const conversationsSlice = createSlice({
    name: "conversations",
    initialState: initialConversationsState,
    reducers: {
        addConversation: (state, action) => {state.push(action.payload)},
        deleteConversation: (state, action) =>state.filter(element => element !== action.payload),
        //     const newConversations = 
        //     state = newConversations;
        // },
        clearConversations: {
            reducer: (state, action) => action.payload,
            prepare: () => {return {payload: initialConversationsState}}
        }
    },
    extraReducers: {
        [getConversationsThunk.fulfilled]: (state, action) => action.payload
    }
});


const selectedSlice = createSlice({
    name: "selected",
    initialState: initialSelectedConversationState,
    reducers: {
        changeConversation: (state, action) => action.payload,
        clearSelected: {
            reducer: (state, action) => action.payload,
            prepare: () => {return {payload: initialSelectedConversationState}}
        }
    },
});



// chat reducer:
// add the message to the chat
// get messages for the given chat name
// clear the list
const chatSlice = createSlice({
    name: "chat", 
    initialState: initialStateChat,
    reducers: {
        addMessage: (state, action) => {state.messages.push(action.payload)},
        deleteMessage: (state, action) => {
            const newMessages = state.messages.filter(element => element.id !== action.payload);
            state.messages = newMessages;
        },
        clearChat: {
            reducer: (state, action) => action.payload,
            prepare: () => {return {payload: initialStateChat}}
        }
    },
    extraReducers: {
        [getMessagesThunk.fulfilled]: (state, action) => action.payload,
    }
});

export const {
    login,
    register,
    logout
} = userSlice.actions;

export const {
    addConversation,
    deleteConversation,
    clearConversations
} = conversationsSlice.actions;

export const {
    addMessage,
    deleteMessage,
    clearChat
} = chatSlice.actions;

export const {
    changeConversation,
    clearSelected
} = selectedSlice.actions

const reducer = combineReducers({
    user: userSlice.reducer,
    conversations: conversationsSlice.reducer,
    selected: selectedSlice.reducer,
    chat: chatSlice.reducer,
})

export default configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});