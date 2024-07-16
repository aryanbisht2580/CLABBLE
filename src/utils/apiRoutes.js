export const BACKEND_URL="https://clabble-backend.onrender.com"
// export const BACKEND_URL="http://localhost:1212"

const auth=`${BACKEND_URL}/api/auth`
export const CHECK_USER_ROUTE=`${auth}/checkUser`
export const REGISTER_ROUTE=`${auth}/register`
export const GENERATE_TOKEN_ROUTE=`${auth}/generateToken
`
export const GET_ONLINE_USERS=`${auth}/getOnlineUsers`

const user=`${BACKEND_URL}/api/user`
export const GET_ALL_USERS_ROUTE=`${user}/getAllUsers`

const messages=`${BACKEND_URL}/api/messages`
export const ADD_MESSAGE_ROUTE=`${messages}/addMessage`
export const GET_MESSAGES_ROUTE=`${messages}/getMessages`
export const POST_IMAGE_ROUTE=`${messages}/postImage`
export const GET_CHATTED_CONTACTS_ROUTE=`${messages}/getChattedContacts`

export const MARK_READ_ROUTE=`${messages}/markRead`
