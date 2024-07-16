const { createSlice } = require("@reduxjs/toolkit");

let initialState={
    user:{showContact:false,current_chat:null,messages:[],showImage:null,onlineUsers:[],searchContact:'',videoCall:undefined,voiceCall:undefined,incomingVoiceCall:undefined,
        incomingVideoCall:undefined
    }
}
const authSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        addNewUser:(state,action)=>{
            state.user={...state.user,...action.payload,newuser:true}
            
        },
        createSuccesssfull:(state,action)=>{
            state.user={...state.user,...action.payload,newuser:false}
            localStorage.setItem("user",JSON.stringify(state.user))
        },
        logout:(state,action)=>{
            state.user={showContact:false,current_chat:null,messages:[],showImage:null,onlineUsers:[],searchContact:'',videoCall:undefined,voiceCall:undefined,incomingVoiceCall:undefined,
            incomingVideoCall:undefined}
            localStorage.removeItem("user")
        },
        showContact:(state,action)=>{
            state.user={...state.user,showContact:action.payload}
        },
        setcurrent_chat:(state,action)=>{
            state.user={...state.user,current_chat:action.payload}
        },
        setSocket:(state,action)=>{
            state.user={...state.user,socket:action.payload}
        },
        
        setMessages:(state,action)=>{
            state.user={...state.user,messages:[...action.payload]}
        },
        addNewMessage:(state,action)=>{
            state.user={...state.user,messages:[...state.user.messages,action.payload]}
        },
        setImageShow:(state,action)=>{
            state.user={...state.user,showImage:action.payload}
        },
        setOnlineUsers: (state, action) => {
            const updatedMessages = state.user.messages.map((m) => {
                if (action.payload.includes(m.receiverId)) {
                    m.messageStatus = "read";
                }
                return m;
            });
            state.user = { ...state.user, onlineUsers: action.payload, messages: updatedMessages };
            // state.user = { ...state.user, onlineUsers: action.payload};
        },
        setChattedUsers:(state,action)=>{
            state.user={...state.user,chattedUsers:action.payload}  
        },
        setSearchContact:(state,action)=>{
            state.user={...state.user,searchContact:action.payload}
        },
        setVideoCall:(state,action)=>{
            state.user={...state.user,videoCall:action.payload}
        },
        setVoiceCall:(state,action)=>{
            state.user={...state.user,voiceCall:action.payload}
        },
        setEndCall:(state,action)=>{
            state.user={...state.user,videoCall:undefined,voiceCall:undefined,incomingVideoCall:undefined,incomingVoiceCall:undefined}
        },
        setIncomingVoiceCall:(state,action)=>{
            state.user={...state.user,incomingVoiceCall:action.payload}
        },
        setIncomingVideoCall:(state,action)=>{
            state.user={...state.user,incomingVideoCall:action.payload}
        }
        // ,
        // setMessagesComplete:(state,action)=>{
        //     state.user={...state.user,messages:[...action.payload]}
        // }


    }
})
export const authActions=authSlice.actions;
export const authReducer=authSlice.reducer;
export const authSelector=(state)=>state.authReducer.user;