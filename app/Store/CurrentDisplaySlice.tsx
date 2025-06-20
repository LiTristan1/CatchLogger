import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Log } from './LogSlice';

interface currentLogState {
    log: Log | null
}

const initialState: currentLogState = {
    log: null
}

const CurrentDisplaySlice = createSlice({
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
