import { PayloadAction,createSlice } from "@reduxjs/toolkit";

interface login  {
    loggedIn: boolean;
    username: string
}

const initialState: login = {
    loggedIn: false,
    username: "" 
}

//store to set user log state and identity
const loginSlice = createSlice({
    name: "loginState",
    initialState,
    
    reducers: {
        setLoggedIn(state,action :PayloadAction<boolean>){
            state.loggedIn = action.payload;
        },
        setUser(state,action: PayloadAction<string>){
            state.username = action.payload;
        }
    }
})

export const {setLoggedIn,setUser} = loginSlice.actions;
export default loginSlice.reducer;


