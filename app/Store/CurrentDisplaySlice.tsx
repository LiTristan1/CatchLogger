import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Log } from './LogSlice';

//store for current log selected to display in logsDisplay

//define interface
interface currentLogState {
    log: Log | null
}


const initialState: currentLogState = {
    //set initial state to null
    log: null
}

const CurrentDisplaySlice = createSlice({
    //define reducers tto change state 
    name: "currDisplay",
    initialState,
    reducers: {
        setCurrLog(state, action: PayloadAction<Log | null>){
            state.log = action.payload;
        }
    }
})

export const{setCurrLog} = CurrentDisplaySlice.actions;
export default CurrentDisplaySlice.reducer;
