const { configureStore } = require("@reduxjs/toolkit");
const { authReducer } = require("./slices/authSlice");

const store=configureStore(
    {
        reducer:{authReducer}
    }
)
export default store