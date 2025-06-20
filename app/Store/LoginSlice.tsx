import { PayloadAction,createSlice } from "@reduxjs/toolkit";

interface login  {
    loggedIn: boolean;
}

const initialState: login = {
    loggedIn: false
}


const loginSlice = createSlice({
    name: "loginState",
    initialState,
    reducers: {
        setLoggedIn(state,action :PayloadAction<boolean>){
            state.loggedIn = action.payload;
        }
    }
})

export const {setLoggedIn} = loginSlice.actions;
export default loginSlice.reducer;


